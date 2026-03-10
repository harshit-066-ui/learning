import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import { generateAIResponse } from "../../lib/utils/aiClient";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ReportSectionProps {
  report: {
    categories: string[];
    scores: number[];
    overall: number;
  };
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  const [aiText, setAiText] = useState(
    "Generating your personalized happiness report..."
  );

  const weakestIndex = report.scores.indexOf(Math.min(...report.scores));

  const strongestCategories = report.categories.filter(
    (_, i) => i !== weakestIndex
  );

  useEffect(() => {
    const prompt = `
Write a simple, friendly, easy-to-understand happiness report for a user.

Category scores:
${report.categories
  .map((cat, i) => `- ${cat}: ${report.scores[i]}`)
  .join("\n")}

Overall happiness score: ${report.overall}

Weakest category: ${report.categories[weakestIndex]}

Strong categories: ${strongestCategories.join(", ")}

Instructions:
1. Compliment the user on their strong areas.
2. Encourage them to maintain those strengths.
3. Gently explain the weakest area without comparing them to others.
4. Suggest simple actionable steps a normal person can follow.
`;

    const generateReport = async () => {
      const response = await generateAIResponse(prompt, "Happiness Report");
      setAiText(response);
    };

    generateReport();
  }, []);

  const data = {
    labels: report.categories,
    datasets: [
      {
        label: "Category Scores",
        data: report.scores,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "rgba(59,130,246,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59,130,246,1)"
      }
    ]
  };

  const getStatus = (score: number) => {
    if (score <= 8) {
      return { label: "Needs Improvement", color: "bg-red-500" };
    }

    if (score <= 12) {
      return { label: "Maintain", color: "bg-yellow-400" };
    }

    return { label: "Strong", color: "bg-green-500" };
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Your Personalized Happiness Report
      </h1>

      {/* Chart + AI Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Radar Chart */}
        <div className="flex flex-col items-center">

          <div className="w-80">
            <Radar data={data} />
          </div>

          {/* Category Status */}
          <div className="mt-8 w-full grid grid-cols-1 gap-3">

            {report.categories.map((cat, i) => {
              const status = getStatus(report.scores[i]);

              return (
                <div
                  key={cat}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <span className="text-sm font-medium">{cat}</span>

                  <span
                    className={`text-white text-xs px-3 py-1 rounded ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}

          </div>

        </div>

        {/* AI Insight */}
        <div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">

            <h2 className="text-xl font-semibold mb-4">
              AI Insight
            </h2>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {aiText}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReportSection;
