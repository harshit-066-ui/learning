import React, { useState, useRef } from "react";

import WelcomePage from "../components/welcome/WelcomePage";
import SurveyForm from "../components/survey/SurveyForm";

import ReportRadar from "../components/report/ReportRadar";
import ReportInsights from "../components/report/ReportInsights";
import PlanPreview from "../components/report/PlanPreview";

import Chatbot from "../components/chatbot/Chatbot";

import { calculateScores } from "../lib/utils/scoring";

const IndexPage: React.FC = () => {

  const [showSurvey, setShowSurvey] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  const [reportData, setReportData] = useState<any>(null);

  const surveyRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartSurvey = () => {
    setShowSurvey(true);
    setTimeout(() => scrollTo(surveyRef), 100);
  };

  const handleSurveyFinish = (answers: number[]) => {

    setGeneratingReport(true);

    setTimeout(() => {

      const scores = calculateScores(answers);
      setReportData(scores);

      setGeneratingReport(false);
      setShowReport(true);

      setTimeout(() => scrollTo(reportRef), 100);

    }, 2000);
  };

  const handleUseChatbot = () => {
    setShowChatbot(true);
    setTimeout(() => scrollTo(chatbotRef), 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-20 p-6">

      {/* Welcome Section */}
      <WelcomePage onStart={handleStartSurvey} />

      {/* Survey */}
      {showSurvey && (
        <div ref={surveyRef}>
          <SurveyForm onFinish={handleSurveyFinish} />
        </div>
      )}

      {/* Loading Animation */}
      {generatingReport && (
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="text-gray-600">
            Generating your happiness insights...
          </p>
        </div>
      )}

      {/* Report */}
      {showReport && reportData && (
        <div
          ref={reportRef}
          className="flex flex-col items-center gap-12 w-full"
        >

          {/* Radar + Insights Side-by-Side */}
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

            <ReportRadar
              categories={reportData.categories}
              scores={reportData.scores}
            />

            <ReportInsights
              categories={reportData.categories}
              scores={reportData.scores}
            />

          </div>

          {/* 7 Day Plan */}
          <PlanPreview
            weakestCategory={
              reportData.categories[
                reportData.scores.indexOf(
                  Math.min(...reportData.scores)
                )
              ]
            }
          />

          {/* Chatbot Button */}
          {!showChatbot && (
            <button
              onClick={handleUseChatbot}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Talk to AI Coach
            </button>
          )}

        </div>
      )}

      {/* Chatbot */}
      {showChatbot && reportData && (
        <div ref={chatbotRef}>
          <Chatbot
            weakestCategory={
              reportData.categories[
                reportData.scores.indexOf(
                  Math.min(...reportData.scores)
                )
              ]
            }
          />
        </div>
      )}

    </div>
  );
};

export default IndexPage;