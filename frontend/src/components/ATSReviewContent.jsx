import React, { useState, useEffect, useRef } from 'react'
import ATSFeedback from './ATSFeedback'
import axios from 'axios';

// ATS Review Content Component
const ATSReviewContent = ({ apiKey, selectedFile }) => {

  const [resumeContent, setResumeContent] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [jobDesc, setJobDesc] = useState("");

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAnalyze = async (e) => {
    if (!apiKey) {
      alert('Please enter your Gemini API Key.')
      return
    }

    if (!selectedFile){
      return alert('Select a pdf resume first.')
    }
    setIsAnalyzing(true)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/analyze-resume`,
        { apiKey, jobDesc }
      );
      setResumeContent(res.data.feedback);
    } catch (err) {
      console.error(err);
      setResumeContent({ error: "Failed to analyze resume" });
    }finally{
      setIsAnalyzing(false)
    }

  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Resume Content Box with Enhanced Animation */}
      <div className={`bg-white border-2 border-[#4db8e8] rounded-2xl p-4 sm:p-8 mb-8 min-h-[400px] shadow-lg hover:shadow-xl transition-all duration-300`}>
        <h4 className='text-center font-semibold text-2xl sm:text-3xl text-gray-600 mb-4'>Get Free Resume Analysis With Feedback</h4>
        <div className="flex items-start gap-3 mb-6">
          <svg className={`w-6 h-6 flex-shrink-0 mt-1 transition-all duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div className="flex-1">

            <>
              <textarea
                placeholder="(Optional) Paste Job Description for better matching..."
                className="w-full h-32 border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </>

          </div>
        </div>


        {/* Analyze Button with Enhanced Effects */}
        <div className={`flex justify-end`}>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 active:scale-95 ${isAnalyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#e85d75] hover:bg-[#d94967]'
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
        <ATSFeedback feedback = {resumeContent}/>
      </div>
    </div>
  )
}


export default ATSReviewContent
