import React, { useEffect, useState } from "react";
import ReportSection from "../components/report/ReportSection";
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
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch("/api/report");
        if (!res.ok) throw new Error("Failed to fetch report");

        const data: ReportData = await res.json();
        setReport(data);
      } catch (err) {
        console.error("[ReportPage] Failed to fetch report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport(); // ✅ THIS WAS MISSING
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your happiness report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        No report available. Please complete the survey first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">

      {/* Report Section */}
      <ReportSection
        report={{
          categories: report.categories,
          scores: report.scores,
          overall: report.overall
        }}
      />

      {/* Chatbot Button */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Your 7-Day Improvement Plan
        </button>
      )}

      {/* Chatbot */}
      {showChatbot && (
        <div className="mt-8 w-full flex justify-center">
          <Chatbot weakestCategory={report.weakestCategory} />
        </div>
      )}

    </div>
  );
};

export default ReportPage;