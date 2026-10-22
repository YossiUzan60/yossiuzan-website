import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const missingKey = !RESEND_API_KEY;

interface ContactEmailRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (missingKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { name, phone, email, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, phone, email });

    // Send notification email to the business owner using Resend API directly
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "אתר יוסי אוזן <onboarding@resend.dev>",
        to: ["uzan86@gmail.com"],
        subject: `פנייה חדשה מהאתר - ${name}`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e3a5f; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">פנייה חדשה מהאתר</h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a5f; margin-top: 0;">פרטי הפונה:</h3>
              <p><strong>שם:</strong> ${name}</p>
              <p><strong>טלפון:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>דוא"ל:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="color: #1e3a5f; margin-top: 0;">תוכן ההודעה:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #6c757d; font-size: 12px; margin-top: 30px;">
              הודעה זו נשלחה אוטומטית מטופס יצירת הקשר באתר יוסי אוזן - שמאי מקרקעין
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
