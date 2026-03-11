import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

interface ReportProps {
  report: {
    categories: string[];
    scores: number[];
    overall: number;
  };
}

const ReportSection: React.FC<ReportProps> = ({ report }) => {

  if (!report) return null;

  const radarData = report.categories.map((cat, i) => ({
    category: cat,
    score: report.scores[i]
  }));

  const gaugeScore = Math.round(report.overall);

  const gaugeData = [
    {
      name: "Happiness",
      value: gaugeScore
    }
  ];

  const strongestIndex = report.scores.indexOf(Math.max(...report.scores));
  const weakestIndex = report.scores.indexOf(Math.min(...report.scores));

  const strongestCategory = report.categories[strongestIndex];
  const weakestCategory = report.categories[weakestIndex];

  const getScoreLabel = (score: number) => {
    if (score > 80) return "Excellent Wellbeing";
    if (score > 60) return "Good Wellbeing";
    if (score > 40) return "Moderate Wellbeing";
    return "Needs Improvement";
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl flex flex-col items-center gap-10">

      <h2 className="text-3xl font-bold text-blue-700">
        Your Happiness Report
      </h2>

      {/* Happiness Gauge */}
      <div className="flex flex-col items-center">

        <p className="text-gray-600 mb-2">
          Overall Happiness Score
        </p>

        <div style={{ width: 260, height: 260 }}>

          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={gaugeData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                dataKey="value"
                fill="#3b82f6"
                cornerRadius={10}
                animationDuration={1200}
              />
            </RadialBarChart>
          </ResponsiveContainer>

        </div>

        <p className="text-3xl font-bold text-blue-700 mt-3">
          {gaugeScore}/100
        </p>

        <p className="text-gray-600 mt-2">
          {getScoreLabel(gaugeScore)}
        </p>

      </div>

      {/* AI Insight Section */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg w-full">

        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          AI Insight
        </h3>

        <p className="text-gray-700">
          Your strongest area is <b>{strongestCategory}</b>. This suggests that
          you are maintaining habits and attitudes that support this part of your wellbeing.
        </p>

        <p className="text-gray-700 mt-2">
          Your lowest scoring area is <b>{weakestCategory}</b>. Focusing on small
          improvements here could significantly increase your overall happiness
          and life satisfaction.
        </p>

        <p className="text-gray-700 mt-2">
          Consider building simple daily habits to strengthen this area. You can
          generate a personalized 7-day improvement plan using the AI coach below.
        </p>

      </div>

      {/* Radar Chart */}
      <div style={{ width: "100%", height: 400 }}>

        <ResponsiveContainer width="100%" height="100%">

          <RadarChart data={radarData}>

            <PolarGrid />

            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
            />

            <Radar
              name="Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.6}
              animationDuration={1200}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ReportSection;