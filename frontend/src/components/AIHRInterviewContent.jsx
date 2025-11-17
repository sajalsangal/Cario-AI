import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const AIHRInterviewContent = ({ apiKey }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [interviewType, setInterviewType] = useState("HR");
  const [loading, setLoading] = useState(false);
  const [generateFeedback, setGenerateFeedback] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");

  // ✅ Initialize speech recognition only once
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

      // ✅ Live update textarea
      setAnswer(finalTranscriptRef.current + interim);
    };

    // ✅ Restart automatically if Chrome stops it
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

  // ✅ Get interview question
  const fetchQuestion = async () => {
    if (!apiKey) {
      alert('Please enter your Gemini API Key')
      return
    }
    const prompt = `Give one ${interviewType} interview question in English.
    Ask unique questions every time, fresher friendly. Only output the question.`;

    setLoading(true);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    setQuestion(data.candidates?.[0]?.content?.parts?.[0]?.text || "No question generated.");
    setFeedback("");
    setLoading(false);
  };

  // ✅ Get feedback
  const getFeedback = async () => {
    if (!answer) return alert("Speak or type your answer first");
    if (!apiKey) {
      alert('Please enter your Gemini API Key')
      return
    }
    if(!question || question == ""){
      return alert("Generate a question first.")
    }
    setGenerateFeedback(true);
    const prompt = `
      Evaluate this job interview answer for clarity, fluency, grammar.
      Give feedback within 100 words, add a new blank line and give score out of 10.
      Also don't keep the text plain with no bold or italics
      Question: ${question}
      Answer: ${answer}
    `;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    setFeedback(data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback received.");
    setGenerateFeedback(false);
  };

  return (
    <div className={`bg-white border-2 border-black rounded-2xl p-4 sm:p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700 text-center">
        🎙️ Practice Communication With AI
      </h1>
      <h3 className='text-center text-sm sm:text-base text-gray-500 mb-2'>Let our AI help you to overcome your fear of interview and prepare you to speak more clearly and confidently.</h3>
      <p className="text-xs sm:text-sm mb-4 text-indigo-600 text-center font-bold">
        Use Chrome Browser on desktop / android and have a proper microphone setup.<br />
        Speak Slowly and Clearly, without taking pause.
      </p>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4'>
        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-black rounded-lg text-sm sm:text-base focus:outline-none ring-1 ring-black cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <option value="HR">HR Interview</option>
          <option value="Technical">Technical Interview</option>
          <option value="Behavioral">Behavioral Interview</option>
        </select>

        <button
          onClick={fetchQuestion}
          className="w-full sm:w-auto bg-[#e85d75] hover:bg-[#d94967] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
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

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 mb-4 w-full justify-center">
        <button
          onClick={startListening}
          disabled={isListening}
          className="w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-2 bg-green-600 text-white rounded-lg text-base sm:text-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎙️ Speak
        </button>
        <button
          onClick={stopListening}
          className="w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-2 bg-red-500 text-white rounded-lg text-base sm:text-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
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
        className="justify-center w-full bg-[#e85d75] hover:bg-[#d94967] text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
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
