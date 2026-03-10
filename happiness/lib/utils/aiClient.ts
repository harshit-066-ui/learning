import { generate7DayPlanPrompt } from "./promptBuilder";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Generates AI response for the chatbot
 * Handles missing API key gracefully
 */
export async function generateAIResponse(userMessage: string, weakestCategory: string) {
  if (!OPENAI_API_KEY) {
    console.warn(
      "[AI Client] OPENAI_API_KEY not found. Returning placeholder response for MVP."
    );
    return `AI not connected yet. Your message was: "${userMessage}". Once an API key is provided, I will generate a personalized 7-day plan for improving ${weakestCategory}.`;
  }

  const prompt = generate7DayPlanPrompt(weakestCategory) + `\nUser: ${userMessage}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    return text;
  } catch (error) {
    console.error("[AI Client] Error calling AI API:", error);
    return "AI service is temporarily unavailable. Please try again later.";
  }
}
