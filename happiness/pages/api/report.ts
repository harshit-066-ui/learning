import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: "No report found" });

  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const usersData = JSON.parse(raw);

  // For MVP: return the latest submission
  const latest = usersData[usersData.length - 1];
  if (!latest) return res.status(404).json({ error: "No report found" });

  // Determine weakest category
  const scores: number[] = latest.scores.scores;
  const categories: string[] = latest.scores.categories;
  const weakestIndex = scores.indexOf(Math.min(...scores));

  res.status(200).json({
    scores,
    categories,
    overall: latest.scores.overall,
    weakestCategory: categories[weakestIndex],
  });
}