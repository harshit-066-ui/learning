import React, { useState } from "react";
import WelcomePage from "../components/welcome/WelcomePage";
import SurveyForm from "../components/survey/SurveyForm";
import ReportSection from "../components/report/ReportSection";
import Chatbot from "../components/chatbot/Chatbot";
import { calculateScores } from "../lib/utils/scoring";

const IndexPage: React.FC = () => {
  const [step, setStep] = useState<number>(1); // 1: Welcome, 2: Survey, 3: Report, 4: Chatbot
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>([]);
  const [reportData, setReportData] = useState<any>(null);

  const handleStartSurvey = () => setStep(2);

  const handleSurveyFinish = (answers: number[]) => {
    setSurveyAnswers(answers);
    const scores = calculateScores(answers);
    setReportData(scores);
    setStep(3);
  };

  const handleUseChatbot = () => setStep(4);

  return (
    <>
      {step === 1 && <WelcomePage onStart={handleStartSurvey} />}

      {step === 2 && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">Survey</h2>
          <SurveyForm onFinish={handleSurveyFinish} />
        </div>
      )}

      {step === 3 && reportData && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <ReportSection report={reportData} />
          <button
            onClick={handleUseChatbot}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Use Chatbot
          </button>
        </div>
      )}

      {step === 4 && reportData && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Chatbot weakestCategory={reportData.categories[reportData.scores.indexOf(Math.min(...reportData.scores))]} />
        </div>
      )}
    </>
  );
};

export default IndexPage;