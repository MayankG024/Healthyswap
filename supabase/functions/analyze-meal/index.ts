import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js';
import { GoogleGenerativeAI } from 'npm:@google/genai'; // Using standard google genai
// Alternatively you can use fetch directly to Google API for Edge functions

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

    // Call Gemini API (using fetch as Deno runtime might have issues with some Node packages)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;
    
    // In a real app, we'd fetch the image from imageUrl and convert to base64, 
    // or just pass the text if no image. For simplicity here we ask Gemini based on text + rules.
    // If imageUrl is provided, we would ideally fetch the image and send as base64.
    
    const promptText = `
      Analyze this meal: "${mealName}".
      If there is an image, consider it too.
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

    const geminiBody = {
      contents: [{
        parts: [{ text: promptText }]
      }]
    };

    // If we want to support actual image base64, we can add it to the parts array here.

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const geminiData = await geminiResponse.json();
    
    let resultText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("Invalid response from Gemini API");
    }

    // Clean up potential markdown formatting from Gemini
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const analysisResult = JSON.parse(resultText);

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
