// AI Mock Quiz Content Component
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const AIMockQuizContent = ({apiKey}) => {
  const [jobDesc, setJobDesc] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("intro");

  const generateQuestions = async () => {
    if (!apiKey) {
      alert('Please enter your Gemini API Key')
      return
    }

    if (!jobDesc.trim()) {
      alert("Please paste a job description first!");
      return;
    }

    setLoading(true);
    setFeedback("");
    setQuestions([]);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/generate`, { apiKey, jobDesc });
      const data = res.data;

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setStage("questions");
        setCurrentIndex(0);
      } else {
        alert("Failed to generate questions.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }

    setLoading(false);
  };

  // ---------- Get Feedback ----------
  const getFeedback = async () => {
    const question = questions[currentIndex];
    if (!apiKey) {
      alert('Please enter your Gemini API Key')
      return
    }
    
    if (!currentAnswer.trim()) {
      alert("Please type your answer first!");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        apiKey,
        question,
        answer: currentAnswer,
      });
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      alert("Error fetching feedback. Try again.");
    }

    setLoading(false);
  };

  const nextQuestion = () => {
    setFeedback("");
    setCurrentAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-white border-2 border-[#4db8e8] rounded-2xl p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300 opacity-100 translate-y-0`} style={{ transitionDelay: '700ms' }}>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          AI Mock Quiz
        </h1>

        {stage === "intro" && (
          <>
            <p className="text-gray-600 mb-6 text-center">
              Paste your Job Description and get personalized AI interview questions.
            </p>

            <textarea
              className="w-full h-40 p-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm mb-4"
              placeholder="Paste Job Description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />

            <div className="flex justify-center">
              <button
                onClick={generateQuestions}
                disabled={loading}
                className={`bg-[#e85d75] hover:bg-[#d94967] text-white px-16 py-5 rounded-lg text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${loading
                  ? "cursor-not-allowed"
                  : ""
                  }`}
              >
                {loading ? "Generating..." : "Generate Questions"}
              </button>
            </div>
          </>
        )}

        {stage === "questions" && questions.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Question {currentIndex + 1}:</span>{" "}
              {questions[currentIndex]}
            </p>

            <textarea
              className="w-full h-32 p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Type your answer here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
            />

            {!feedback ? (
              <button
                onClick={getFeedback}
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white font-medium ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {loading ? "Checking..." : "Get Feedback"}
              </button>
            ) : (
              <>
                <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-gray-800">AI Feedback:</h3>
                  <p className="text-gray-700 whitespace-pre-line">{feedback}</p>
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="w-full mt-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Next Question →
                  </button>
                ) : (
                  <p className="text-center mt-4 font-semibold text-green-700">
                    🎉 You’ve completed all questions!
                  </p>
                )}
              </>
            )}
          </div>
        )}


      </div>
    </div>
  )
}

export default AIMockQuizContent
