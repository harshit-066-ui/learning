import React, { useState, useEffect, useRef } from "react";
import { generateAIResponse } from "../../lib/utils/aiClient";

interface ChatbotProps {
  weakestCategory: string;
}

interface Message {
  text: string;
  user: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ weakestCategory }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate 7-day plan initially
  useEffect(() => {
    const initPlan = async () => {
      setLoading(true);
      const aiMessage = await generateAIResponse(
        "Please create a 7-day happiness plan for me.",
        weakestCategory
      );
      setMessages([{ text: aiMessage, user: false }]);
      setLoading(false);
    };
    initPlan();
  }, [weakestCategory]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { text: input, user: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const aiResponse = await generateAIResponse(input, weakestCategory);
    setMessages((prev) => [...prev, { text: aiResponse, user: false }]);
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Your Happiness Chatbot</h2>
      <div className="flex-1 overflow-y-auto h-72 p-2 space-y-2 border rounded-lg mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.user ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`inline-block px-3 py-1 rounded-lg max-w-xs break-words ${
                msg.user ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask me anything..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
