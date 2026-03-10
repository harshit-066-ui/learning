import React, { useEffect, useState } from "react";
import ReportRadar from "../components/report/ReportRadar";
import Chatbot from "../components/chatbot/Chatbot";

interface ReportData {
  scores: number[];
  categories: string[];
  overall: number;
  weakestCategory: string;
}

const ReportPage: React.FC = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch("/api/report");
        const data: ReportData = await res.json();
        setReport(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading report...</div>;
  if (!report) return <div className="p-4 text-center">No report available.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Happiness Report</h1>
      <ReportRadar scores={report.scores} categories={report.categories} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Personalized 7-Day Plan</h2>
        <p>Weakest Category: <span className="font-bold">{report.weakestCategory}</span></p>
      </div>
      <div className="mt-4">
        <Chatbot weakestCategory={report.weakestCategory} />
      </div>
    </div>
  );
};

export default ReportPage;