import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const AIHRInterviewContent = ({ apiKey }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [interviewType, setInterviewType] = useState("HR");
  const [loading, setLoading] = useState(false);
  const [generateFeedback, setGenerateFeedback] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recog = new window.webkitSpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";

      recognitionRef.current = recog;
    }
  }, []);

  const startListening = () => {
    const recog = recognitionRef.current;
    if (!recog) return alert("Speech recognition not supported in your browser");

    finalTranscriptRef.current = "";
    setIsListening(true);
    recog.start();

    setAnswer("") //clear our previous answer if re-speak
    recog.onresult = (event) => {
      let interim = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      setAnswer(finalTranscriptRef.current + interim);
    };

    recog.onend = () => {
      if (isListening) recog.start();
    };

    recog.onerror = () => {
      if (isListening) recog.start();
    };
  };

  const stopListening = () => {
    const recog = recognitionRef.current;
    setIsListening(false);
    recog?.stop();
  };

  const fetchQuestion = async () => {
    if (!apiKey) {
      setError('Please enter your Gemini API Key');
      return;
    }

    setLoading(true);
    setError("");

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/hr-question-generate`,
        { apiKey, interviewType }
      );

      // Check server response
      if (!res.data || !res.data.questionText) {
        throw new Error("No question generated. Please try again.");
      }

      setQuestion(res.data.questionText);
      setAnswer("");
      setFeedback("");


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
    if (!answer.trim()) {
      setError("Please speak or type your answer first");
      return;
    }

    if (!apiKey) {
      setError("Please enter your Gemini API Key");
      return;
    }

    if (!question) {
      setError("Please generate a question first.");
      return;
    }

    setGenerateFeedback(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/hr-feedback`,
        { apiKey, question, answer }
      );

      if (!res.data) {
        throw new Error("No response from server");
      }

      const { feedback } = res.data;

      if (!feedback) {
        throw new Error("No feedback generated. Please try again.");
      }

      setFeedback(feedback);

    } catch (err) {
      console.error("Error generating feedback:", err);

      let errorMessage = "Failed to generate feedback. ";

      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid API Key.";
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage += `Server error: ${err.response.status}`;
        }
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setFeedback("");

    } finally {
      setGenerateFeedback(false);
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-xl p-4 sm:p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700 text-center">
        Practice Communication With AI 🎙️
      </h1>
      <h3 className="text-center text-sm sm:text-base text-gray-500 mb-2">Let our AI help you to overcome your fear of interview and prepare you to speak more clearly and confidently.</h3>

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

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-black rounded-lg text-sm sm:text-base focus:outline-none ring-1 ring-black cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <option value="HR">HR Interview</option>
          <option value="Technical">Technical Interview</option>
          <option value="Behavioral">Behavioral Interview</option>
        </select>

        <button
          onClick={fetchQuestion}
          className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          {loading ? "Generating..." : "Generate Question"}
        </button>
      </div>
      {question && (
        <div className="bg-white shadow-md p-4 rounded-lg w-full mb-4 border border-gray-300">
          <p className="font-semibold text-gray-800 mb-2">Question:</p>
          <p className="text-sm sm:text-base text-gray-700">{question}</p>
        </div>
      )}

      <div className={`bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-xs sm:text-sm shadow-sm mb-4
       ${question === '' ? "hidden" : ""}`}>
        <p className='text-center'>
          Voice mode can make mistakes. Use Chrome browser and ensure you have a proper microphone setup.
          <br className='hidden md:flex text-sm ' />
          Speak slowly and clearly, without taking pauses.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 mb-4 w-full justify-center">
        <button
          onClick={startListening}
          disabled={isListening || !question}
          className="w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-2 bg-green-600 text-white rounded-lg text-base sm:text-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎙️ Speak
        </button>
        <button
          onClick={stopListening}
          disabled={!question}
          className="w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-2 bg-red-500 text-white rounded-lg text-base sm:text-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏹️ Stop
        </button>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 sm:p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        rows={3}
        placeholder="Your transcript will appear here. Type the answer if microphone is not working..."
      />

      <button
        onClick={getFeedback}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {generateFeedback ? "Generating..." : "🧠 Get Feedback"}
      </button>

      {feedback && (
        <div className="bg-white shadow-md shadow-gray-500 p-4 rounded-lg w-full mt-4 border border-gray-200">
          <p className="font-semibold text-green-700 mb-2">Feedback:</p>
          <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">{feedback}</p>
        </div>
      )}
    </div>
  )
}

export default AIHRInterviewContent
