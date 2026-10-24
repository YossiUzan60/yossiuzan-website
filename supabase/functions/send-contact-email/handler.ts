export const MAX_REQUEST_BYTES = 16_384;
export const CONTACT_LIMITS = { name: 100, phone: 32, email: 254, message: 4000 } as const;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-retry-count, traceparent, tracestate, baggage",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Contact = Record<keyof typeof CONTACT_LIMITS, string>;

class ContactError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

function json(status: number, body: object, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extraHeaders },
  });
}

async function readContact(req: Request): Promise<Contact> {
  if (Number(req.headers.get("content-length")) > MAX_REQUEST_BYTES) {
    throw new ContactError(413, "Request too large");
  }
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new ContactError(415, "Expected application/json");
  }
  if (!req.body) throw new ContactError(400, "Missing request body");

  // Bound actual streamed bytes, including requests without Content-Length.
  const reader = req.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let length = 0;
  let text = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new ContactError(413, "Request too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (error) {
    if (error instanceof ContactError) throw error;
    throw new ContactError(400, "Invalid request body");
  } finally {
    reader.releaseLock();
  }

  let value: unknown;
  try { value = JSON.parse(text); }
  catch { throw new ContactError(400, "Invalid JSON"); }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ContactError(400, "Invalid contact details");
  }
  if ((value as Record<string, unknown>).acceptedTerms !== true) {
    throw new ContactError(400, "Terms and privacy policy acceptance required");
  }

  const contact = {} as Contact;
  for (const key of Object.keys(CONTACT_LIMITS) as (keyof Contact)[]) {
    const field = (value as Record<string, unknown>)[key];
    if (typeof field !== "string" || !field.trim() || field.length > CONTACT_LIMITS[key]) {
      throw new ContactError(400, "Invalid contact details");
    }
    contact[key] = field.trim();
  }
  const hasControlCharacters = (field: string) => Array.from(field).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
  if ([contact.name, contact.phone, contact.email].some(hasControlCharacters)) {
    throw new ContactError(400, "Invalid contact details");
  }
  if (!/^[^\s<>"'@]+@[^\s<>"'@]+\.[^\s<>"'@]+$/.test(contact.email) ||
      !/^\+?[\d ()\-.]+$/.test(contact.phone) ||
      !/^\d{7,15}$/.test(contact.phone.replace(/\D/g, ""))) {
    throw new ContactError(400, "Invalid contact details");
  }
  return contact;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function createContactHandler(
  apiKey: string | undefined,
  fetchEmail: typeof fetch = fetch,
  fromAddress = "אתר יוסי אוזן <onboarding@resend.dev>",
) {
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (req.method !== "POST") return json(405, { error: "Method not allowed" }, { Allow: "POST, OPTIONS" });
    try {
      const contact = await readContact(req);
      if (!apiKey) return json(503, { error: "Email service unavailable" });
      const name = escapeHtml(contact.name);
      const phone = escapeHtml(contact.phone);
      const email = escapeHtml(contact.email);
      const message = escapeHtml(contact.message);
      const response = await fetchEmail("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: fromAddress,
          to: ["uzan86@gmail.com"],
          reply_to: contact.email,
          subject: `פנייה חדשה מהאתר - ${contact.name}`,
          html: `<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e3a5f; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">פנייה חדשה מהאתר</h1>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a5f; margin-top: 0;">פרטי הפונה:</h3>
              <p><strong>שם:</strong> ${name}</p>
              <p><strong>טלפון:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>דוא"ל:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>אישור תקנון ומדיניות פרטיות:</strong> אושר בטופס</p>
            </div>
            <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="color: #1e3a5f; margin-top: 0;">תוכן ההודעה:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #6c757d; font-size: 12px; margin-top: 30px;">הודעה זו נשלחה אוטומטית מטופס יצירת הקשר באתר יוסי אוזן - שמאי מקרקעין</p>
          </div>`,
        }),
      });
      // Do not return provider details or log visitors' personal information.
      await response.body?.cancel();
      if (!response.ok) return json(502, { error: "Email delivery failed" });
      return json(200, { success: true });
    } catch (error) {
      if (error instanceof ContactError) return json(error.status, { error: error.message });
      return json(502, { error: "Email delivery failed" });
    }
  };
}
