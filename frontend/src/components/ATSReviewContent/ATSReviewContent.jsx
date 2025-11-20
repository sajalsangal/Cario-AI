import React, { useState } from 'react'
import ATSFeedback from '../ATSFeedback/ATSFeedback'
import axios from 'axios';

const ATSReviewContent = ({ apiKey, selectedFile }) => {
  const [resumeContent, setResumeContent] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!apiKey) {
      alert("Please enter your Gemini API Key.");
      return;
    }
    
    if (!selectedFile) {
      alert("Please upload your resume first.");
      return;
    }

    setIsAnalyzing(true);
    setResumeContent(null);

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("apiKey", apiKey);
      formData.append("jobDesc", jobDesc);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/analyze-resume`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (!res.data || !res.data.feedback) {
        throw new Error("No analysis received from server");
      }

      setResumeContent(res.data.feedback);
    } catch (err) {
      console.error("Error analyzing resume:", err);
      
      let errorMessage = "Failed to analyze resume. ";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid API Key. Please check your Gemini API Key.";
        } else if (err.response.status === 429) {
          errorMessage = "API rate limit exceeded. Please try again later.";
        } else if (err.response.status === 413) {
          errorMessage = "Resume file is too large. Please upload a smaller file.";
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
      
      setResumeContent({ error: errorMessage });
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 sm:p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300">
        <h4 className="text-center font-semibold text-2xl sm:text-3xl text-gray-600 mb-4">Get Free Resume Analysis With Feedback</h4>
        <div className="flex items-start gap-3 mb-6">
          <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div className="flex-1">

            <>
              <textarea
                placeholder={`(Optional) Paste Job Description for better matching.
Receive an ATS score and Formating Suggestions.
                  `}
                className="w-full h-32 border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </>

          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </div>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </div>
        <ATSFeedback feedback={resumeContent} />
      </div>
    </div>
  )
}


export default ATSReviewContent
