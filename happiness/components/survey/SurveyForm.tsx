import React, { useState } from "react";

interface SurveyFormProps {
  onFinish: (answers: number[]) => void; // callback to parent
}

const questions = [
  "I feel happy most of the time.",
  "I feel that I am growing as a person.",
  "I feel connected to people around me.",
  "I maintain a healthy lifestyle.",
  "I have a sense of purpose in life.",
  "I handle stress well.",
  "I feel supported by friends/family.",
  "I engage in activities that I enjoy.",
  "I feel optimistic about my future.",
  "I have a balance between work and personal life.",
  "I manage my emotions effectively.",
  "I maintain strong social relationships.",
  "I practice self-care regularly.",
  "I feel motivated to achieve my goals.",
  "I spend quality time with loved ones.",
  "I feel confident about myself.",
  "I take care of my physical health.",
  "I practice mindfulness or reflection.",
  "I feel satisfied with my achievements.",
  "I engage in hobbies or creative activities."
];

const SurveyForm: React.FC<SurveyFormProps> = ({ onFinish }) => {
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(0));

  const handleChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.some((ans) => ans === 0)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    onFinish(answers);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium mb-1">{i + 1}. {q}</p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <label key={val} className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={val}
                  checked={answers[i] === val}
                  onChange={() => handleChange(i, val)}
                  className="form-radio text-blue-600 accent-blue-600"
                />
                <span className="text-gray-800 font-medium">{val}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Finish Survey
      </button>
    </div>
  );
};

export default SurveyForm;
