import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js';
import { parseGeminiJson, validateAnalysisPayload } from './analysisValidation.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { imageUrl, mealName } = await req.json();

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

    const promptText = `
      Analyze this meal: "${mealName}".
      If an image is attached, use it as the primary signal for identifying the food.
      Provide a JSON response with the following structure (strictly JSON, no markdown blocks):
      {
        "original": {
          "name": "string",
          "calories": number,
          "protein": number,
          "carbs": number,
          "fat": number,
          "fiber": number,
          "sugar": number,
          "factors": ["string"]
        },
        "improved": {
          "name": "string",
          "calories": number,
          "protein": number,
          "carbs": number,
          "fat": number,
          "fiber": number,
          "sugar": number
        },
        "changes": [
          { "label": "string", "change": "up" | "down", "percentage": number }
        ],
        "swaps": [
          { "original": "string", "replacement": "string", "benefit": "string" }
        ],
        "cookingMethod": {
          "original": "string",
          "improved": "string",
          "benefit": "string"
        },
        "portionTip": "string"
      }
      
      Make sure the improved version represents a much healthier alternative of the same cuisine/type, applying rules like reducing saturated fats, refined carbs, and boosting protein/fiber.
    `;

    const parts: Array<Record<string, unknown>> = [{ text: promptText }];
    const imagePart = imageUrl ? await fetchImagePart(imageUrl) : null;
    if (imagePart) {
      parts.push(imagePart);
    }

    const geminiBody = {
      contents: [{
        parts
      }]
    };

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return new Response(JSON.stringify({
        error: 'Gemini request failed',
        code: 'gemini_request_failed',
        details: geminiData.error?.message || 'Unknown Gemini API error'
      }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    let resultText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("Invalid response from Gemini API");
    }

    const analysisResult = validateAnalysisPayload(parseGeminiJson(resultText));

    // Save to database
    const { data: insertData, error: dbError } = await supabaseClient
      .from('meal_analyses')
      .insert({
        user_id: user.id,
        image_url: imageUrl,
        original_name: mealName,
        original_nutrition: analysisResult.original,
        improved_nutrition: analysisResult.improved,
        changes: analysisResult.changes,
        swaps: analysisResult.swaps,
        cooking_method: analysisResult.cookingMethod,
        portion_tip: analysisResult.portionTip
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return new Response(JSON.stringify(insertData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({
      error: error.message,
      code: 'analysis_failed'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function fetchImagePart(imageUrl: string): Promise<Record<string, unknown> | null> {
  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(`Failed to fetch uploaded image: ${imageResponse.status}`);
  }

  const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';
  if (!mimeType.startsWith('image/')) {
    throw new Error(`Uploaded file must be an image. Received ${mimeType}.`);
  }

  const imageBuffer = await imageResponse.arrayBuffer();

  return {
    inline_data: {
      mime_type: mimeType,
      data: arrayBufferToBase64(imageBuffer),
    },
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}
