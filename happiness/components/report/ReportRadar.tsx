import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

interface Props {
  categories: string[];
  scores: number[];
}

const ReportRadar: React.FC<Props> = ({ categories, scores }) => {

  if (!categories || !scores) return null;

  const data = categories.map((c, i) => ({
    category: c,
    score: scores[i]
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl mx-auto">

      <h2 className="text-xl font-semibold text-center mb-6">
        Happiness Breakdown
      </h2>

      {/* IMPORTANT: Fixed height container */}
      <div style={{ width: "100%", height: 400 }}>

        <ResponsiveContainer>
          <RadarChart data={data}>

            <PolarGrid />

            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
            />

            <PolarRadiusAxis
              domain={[0, 20]}
              tick={false}
            />

            <Radar
              name="Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.6}
            />

          </RadarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ReportRadar;