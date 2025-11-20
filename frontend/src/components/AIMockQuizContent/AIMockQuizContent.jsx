import { useState } from 'react'
import axios from 'axios';

const AIMockQuizContent = ({apiKey}) => {
  const [jobDesc, setJobDesc] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("intro");
  const [error, setError] = useState("");

  const generateQuestions = async () => {
    if (!apiKey) {
      setError('Please enter your Gemini API Key');
      return;
    }

    if (!jobDesc.trim()) {
      setError("Please paste a job description first!");
      return;
    }

    setLoading(true);
    setFeedback("");
    setQuestions([]);
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/generate`, { apiKey, jobDesc });
      
      if (!res.data) {
        throw new Error("No response from server");
      }

      const data = res.data;

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions were generated. Please try with a different job description.");
      }

      setQuestions(data.questions);
      setStage("questions");
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error generating questions:", err);
      
      let errorMessage = "Failed to generate questions. ";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid API Key. Please check your Gemini API Key.";
        } else if (err.response.status === 429) {
          errorMessage = "API rate limit exceeded. Please try again later.";
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage += `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getFeedback = async () => {
    const question = questions[currentIndex];
    
    if (!apiKey) {
      setError('Please enter your Gemini API Key');
      return;
    }
    
    if (!currentAnswer.trim()) {
      setError("Please type your answer first!");
      return;
    }

    setLoading(true);
    setFeedback("");
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        apiKey,
        question,
        answer: currentAnswer,
      });
      
      if (!res.data || !res.data.feedback) {
        throw new Error("No feedback received from server");
      }
      
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      
      let errorMessage = "Failed to get feedback. ";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid API Key. Please check your Gemini API Key.";
        } else if (err.response.status === 429) {
          errorMessage = "API rate limit exceeded. Please try again later.";
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage += `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setCurrentAnswer("");
    setError("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 sm:p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center">
          AI Mock Quiz
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button onClick={() => setError("")} className="text-red-700 hover:text-red-900">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {stage === "intro" && (
          <>
            <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
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
                className={`bg-pink-500 hover:bg-pink-600 text-white px-10 sm:px-16 py-4 sm:py-5 rounded-lg text-lg sm:text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? "Generating..." : "Generate Questions"}
              </button>
            </div>
          </>
        )}

        {stage === "questions" && questions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm sm:text-base text-gray-700 mb-4">
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
                className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Checking..." : "Get Feedback"}
              </button>
            ) : (
              <>
                <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-gray-800">AI Feedback:</h3>
                  <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">{feedback}</p>
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="w-full mt-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Next Question →
                  </button>
                ) : (
                  <p className="text-center mt-4 font-semibold text-green-700 text-base sm:text-lg">
                    🎉 You've completed all questions!
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
