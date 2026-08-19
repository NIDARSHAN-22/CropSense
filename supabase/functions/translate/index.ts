import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text, targetLanguage, diseaseKey } = await req.json();

    if (!text || !targetLanguage) {
      return new Response(JSON.stringify({ error: "Missing text or targetLanguage" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check translation cache first
    if (diseaseKey) {
      const { data: cached } = await supabaseClient
        .from("translation_cache")
        .select("translated_text")
        .eq("disease_key", diseaseKey)
        .eq("target_language", targetLanguage)
        .single();

      if (cached?.translated_text) {
        return new Response(JSON.stringify({ translatedText: cached.translated_text, cached: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Call LibreTranslate
    const ltUrl = Deno.env.get("LIBRETRANSLATE_URL") || "https://translate.argosopentech.com";
    const ltApiKey = Deno.env.get("LIBRETRANSLATE_API_KEY");

    const ltRes = await fetch(`${ltUrl}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLanguage,
        format: "text",
        api_key: ltApiKey || undefined,
      }),
    });

    let translatedText = text;
    if (ltRes.ok) {
      const ltData = await ltRes.json();
      translatedText = ltData.translatedText || text;

      // Save to cache
      if (diseaseKey && translatedText !== text) {
        await supabaseClient.from("translation_cache").insert({
          disease_key: diseaseKey,
          target_language: targetLanguage,
          translated_text: translatedText,
        });
      }
    }

    return new Response(JSON.stringify({ translatedText, cached: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
