import React from "react";

interface WelcomePageProps {
  onStart: () => void; // callback to go to survey
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">Welcome to Your Happiness Journey</h1>
      <p className="text-gray-700 max-w-xl mb-8">
        Discover your strengths, understand areas to improve, and receive a personalized 7-day happiness plan!
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Take the Survey
      </button>
    </div>
  );
};

export default WelcomePage;
