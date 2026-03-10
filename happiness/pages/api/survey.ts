import type { NextApiRequest, NextApiResponse } from "next";
import { calculateScores } from "../../lib/utils/scoring";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { answers } = req.body; // array of 20 numbers (1-5)
  if (!answers || answers.length !== 20) return res.status(400).json({ error: "Invalid answers" });

  const scores = calculateScores(answers); // returns { categories: [...], scores: [...], overall: number }
  
  // Save to JSON (temporary storage for MVP)
  let usersData: any[] = [];
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    usersData = JSON.parse(raw);
  }
  usersData.push({ answers, scores, date: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(usersData, null, 2));

  res.status(200).json({ message: "Survey saved", scores });
}