import React from "react";

interface Props {
  categories: string[];
  scores: number[];
}

const ReportInsights: React.FC<Props> = ({ categories, scores }) => {

  const strongestIndex = scores.indexOf(Math.max(...scores));
  const weakestIndex = scores.indexOf(Math.min(...scores));

  const strongest = categories[strongestIndex];
  const weakest = categories[weakestIndex];

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg w-full max-w-4xl">

      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        AI Insights
      </h3>

      <p className="text-gray-700">
        Your strongest area is <b>{strongest}</b>. This suggests you are doing well
        in habits and attitudes that support this part of your wellbeing.
      </p>

      <p className="text-gray-700 mt-2">
        Your lowest scoring area is <b>{weakest}</b>. Improving this area
        could significantly increase your overall happiness.
      </p>

    </div>
  );
};

export default ReportInsights;