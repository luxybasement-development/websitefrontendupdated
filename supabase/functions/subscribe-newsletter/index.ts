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
    const { email, name } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "A valid email address is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("newsletter_subscribers").insert({
      email: email.toLowerCase().trim(),
      name: name?.trim() ?? "",
    });

    if (dbError) {
      // Unique constraint = already subscribed
      if (dbError.code === "23505") {
        return new Response(JSON.stringify({ success: true, alreadySubscribed: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Notify via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="border-bottom: 1px solid #e5e5e5; padding-bottom: 12px; margin-bottom: 20px;">
            New Newsletter Subscriber
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 80px;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td>
            </tr>
            ${name ? `<tr><td style="padding: 8px 0; font-weight: 600;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>` : ""}
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #888; border-top: 1px solid #e5e5e5; padding-top: 12px;">
            This subscriber was added via the LuxyBasement website.
          </p>
        </div>
      `;

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "LuxyBasement <onboarding@resend.dev>",
          to: ["luxybasement@gmail.com"],
          subject: `New subscriber: ${email}`,
          html,
        }),
      });

      if (!resendRes.ok) {
        console.error("Resend error:", await resendRes.text());
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
