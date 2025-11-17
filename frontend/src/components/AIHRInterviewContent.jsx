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
    <div className={`bg-white border-2 border-black rounded-2xl p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300 opacity-100 translate-y-0`} style={{ transitionDelay: '700ms' }}>
      <h1 className="text-3xl font-bold mb-4 text-gray-700 text-center">
        🎙️ Practice Communication With AI
      </h1>
      <h3 className='text-center text-gray-500'>Let our AI help you to overcome your fear of interview and prepare you to speak more clearly and confidently.</h3>
      <p className=" text-sm mb-4 text-indigo-600 text-center font-bold">
        Use Chrome Browser on desktop / android and have a proper microphone setup.<br />
        Speak Slowly and Clearly, without taking pause.
      </p>

      <div className='text-center w-full space-x-10 mb-4'>
        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          className="px-6 py-3 text-black rounded-sm text-base focus:outline-none ring-1 ring-black cursor-pointer"
        >
          <option value="HR">HR Interview</option>
          <option value="Technical">Technical Interview</option>
          <option value="Behavioral">Behavioral Interview</option>
        </select>

        <button
          onClick={fetchQuestion}
          className="bg-[#e85d75] hover:bg-[#d94967] text-white px-8 py-3 rounded-lg text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          {loading ? "Generating..." : "Generate Question"}
        </button>
      </div>
      {question && (
        <div className="bg-white shadow p-4 rounded w-full mb-4 border-black">
          <p className="font-semibold">Question:</p>
          <p>{question}</p>
        </div>
      )}

      <div className="flex gap-7 mb-4 w-full justify-center">
        <button
          onClick={startListening}
          disabled={isListening}
          className="px-4 py-2 bg-green-600 text-white rounded text-xl"
        >
          🎙️ Speak
        </button>
        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-500 text-white rounded text-xl"
        >
          ⏹️ Stop
        </button>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows={3}
        placeholder="Your transcript will appear here. Type the answer if microphone is not working..."
      />

      <button
        onClick={getFeedback}
        className="justify-center w-full bg-[#e85d75] hover:bg-[#d94967] text-white px-8 py-3 rounded-lg text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        {generateFeedback ? "Generating..." : "🧠 Get Feedback"}
      </button>

      {feedback && (
        <div className="bg-white shadow-md shadow-gray-500 p-4 rounded w-full mt-4">
          <p className="font-semibold text-green-700">Feedback:</p>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  )
}

export default AIHRInterviewContent
