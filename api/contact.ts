import { createContactHandler } from '../supabase/functions/send-contact-email/handler.js';

// Read credentials only in the server runtime; never prefix them with VITE_.
export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Origin not allowed' }, { status: 403 });
  }
  if (!process.env.CONTACT_FROM_EMAIL) {
    return Response.json({ error: 'Email service unavailable' }, { status: 503 });
  }
  const response = await createContactHandler(
    process.env.RESEND_API_KEY, fetch, process.env.CONTACT_FROM_EMAIL,
  )(request);
  // This endpoint is same-origin. The legacy handler also serves Supabase.
  for (const header of [...response.headers.keys()]) {
    if (header.startsWith('access-control-')) response.headers.delete(header);
  }
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export function GET(): Response {
  return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
