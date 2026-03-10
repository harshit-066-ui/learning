/**
 * Generate a prompt for the AI to create a 7-day plan
 * @param weakestCategory The category the user scored lowest in
 */
export function generate7DayPlanPrompt(weakestCategory: string): string {
  return `
You are a personal happiness coach.
The user's weakest category is: ${weakestCategory}.
Create a 7-day plan with one small actionable task per day to improve this category.
Tasks should be simple, realistic, and measurable.
Do not include tasks unrelated to the category.
Format the output as:
Day 1: Task
Day 2: Task
...
Day 7: Task
`;
}