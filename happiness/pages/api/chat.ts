import type { NextApiRequest, NextApiResponse } from "next";
import { generateAIResponse } from "../../lib/utils/aiClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, weakestCategory } = req.body;
  if (!message || !weakestCategory) return res.status(400).json({ error: "Missing data" });

  try {
    const aiResponse = await generateAIResponse(message, weakestCategory);
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service failed" });
  }
}