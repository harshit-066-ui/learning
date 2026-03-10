export interface Scores {
  categories: string[];
  scores: number[];
  overall: number;
}

const categoryLabels = [
  "Emotional Well-Being",
  "Psychological Well-Being",
  "Social Well-Being",
  "Physical/Lifestyle",
  "Purpose & Outlook",
];

/**
 * Calculate scores per category and overall score
 * @param answers 20 numbers (1-5 Likert scale)
 */
export function calculateScores(answers: number[]): Scores {
  if (answers.length !== 20) throw new Error("Expected 20 answers");

  const scores: number[] = [];
  for (let i = 0; i < 5; i++) {
    // 4 questions per category
    const categoryScore = answers.slice(i * 4, i * 4 + 4).reduce((a, b) => a + b, 0);
    scores.push(categoryScore);
  }

  const overall = scores.reduce((a, b) => a + b, 0);

  return { categories: categoryLabels, scores, overall };
}