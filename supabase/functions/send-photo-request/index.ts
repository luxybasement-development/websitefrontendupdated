import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, notes, productTitle, productUrl } = await req.json();

    if (!name || !email || !productTitle) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Always save to DB first — request is never lost even if email fails
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("photo_requests").insert({
      name,
      email,
      notes: notes || "",
      product_title: productTitle,
      product_url: productUrl || "",
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save request" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Attempt email notification via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="border-bottom: 1px solid #e5e5e5; padding-bottom: 12px; margin-bottom: 20px;">
            Additional Photos Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 140px; vertical-align: top;">Product:</td>
              <td style="padding: 8px 0;">${productTitle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">URL:</td>
              <td style="padding: 8px 0;"><a href="${productUrl}" style="color: #c9a96e;">${productUrl}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Customer:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Reply To:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Notes:</td>
              <td style="padding: 8px 0;">${notes || "None provided"}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #888; border-top: 1px solid #e5e5e5; padding-top: 12px;">
            Reply directly to this email to send photos to ${name} at ${email}.
          </p>
        </div>
      `;

      const resendPayload = {
        // Use resend.dev shared domain — works for any recipient without domain verification
        from: "LuxyBasement Photo Requests <onboarding@resend.dev>",
        to: ["luxybasement@gmail.com"],
        reply_to: email,
        subject: `Photo Request: ${productTitle} — from ${name}`,
        html: htmlBody,
      };

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resendPayload),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error("Resend send failed:", resendRes.status, errText);
        // Still return success — request is safely in the database
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
