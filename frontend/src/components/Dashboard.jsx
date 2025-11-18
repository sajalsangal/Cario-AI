import axios from 'axios';

import React, { useState, useEffect, useRef } from 'react'
import ATSReviewContent from './ATSReviewContent'
import AIMockQuizContent from './AIMockQuizContent'
import AIHRInterviewContent from './AIHRInterviewContent'

const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('job-fetch')
  const [apiKey, setApiKey] = useState('')
  const [fulltime, setFulltime] = useState('Fulltime')
  const [experience, setExperience] = useState('Entry Level')
  const [timeframe, setTimeframe] = useState('All time')
  const [remotework, setRemotework] = useState('Remote')
  const [resumeData, setResumeData] = useState(null)
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawModelText, setRawModelText] = useState('');
  const [jobs, setJobs] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [showApiKey, setShowApiKey] = useState(false)
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return setError("Please select a PDF first.");

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".pdf")) {
      alert("Please upload a PDF file only.");
      e.target.value = "";   // reset file input
      return;                // ⛔ stop execution
    }
    try {
      setError("");
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(`${backend}/upload-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedFile(res.data.fileName);
      console.log("File parsed successfully")
    } catch (err) {
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }

  }

  const fetchJobs = async () => {
    if (!apiKey || apiKey == '') {
      alert("Enter a valid gemini api key.");
      return;
    }
    if (!selectedFile) {
      alert("Upload a resume in pdf file format.")
      return;
    }
    try {
      setError("");
      setLoading(true);

      // Extract skills from resume
      const skillRes = await axios.post(`${backend}/extract-skills`, {
        apiKey
      });
      setSkills(skillRes.data.skills);
      setRawModelText(skillRes.data.raw);

      // Fetch jobs based on skills
      const jobRes = await axios.post(`${backend}/fetch-jobs`, {
        apiKey,
        skills: skillRes.data.skills,
        fulltime,
        timeframe,
        experience,
        remotework
      });

      setJobTitles(jobRes.data.jobTitles);
      setJobs(jobRes.data.jobs);
    } catch (err) {
      console.error(err);
      setError("Processing failed.");
    } finally {
      setLoading(false);
    }
  };

  // Set page title
  useEffect(() => {
    document.title = 'Dashboard - CarioAI'
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50 relative pt-[7.5rem] lg:pt-0">
      {/* Mobile Horizontal Menu - Always visible on mobile, below the main navbar */}
      <div className="lg:hidden fixed top-[4.5rem] left-0 right-0 bg-white shadow-md z-40 overflow-x-auto">
        <div className="flex gap-1.5 p-2 px-3">
          <button
            onClick={() => setActiveTab('job-fetch')}
            className={`px-3 py-2 rounded-lg font-semibold text-xs whitespace-nowrap transition-all duration-300 flex-1 ${activeTab === 'job-fetch'
                ? 'bg-[#c9a8f5] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Job Fetch
          </button>
          <button
            onClick={() => setActiveTab('ats-review')}
            className={`px-3 py-2 rounded-lg font-semibold text-xs whitespace-nowrap transition-all duration-300 flex-1 ${activeTab === 'ats-review'
                ? 'bg-[#c9a8f5] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            ATS Review
          </button>
          <button
            onClick={() => setActiveTab('mock-quiz')}
            className={`px-3 py-2 rounded-lg font-semibold text-xs whitespace-nowrap transition-all duration-300 flex-1 ${activeTab === 'mock-quiz'
                ? 'bg-[#c9a8f5] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Mock Quiz (J.D)
          </button>
          <button
            onClick={() => setActiveTab('hr-interview')}
            className={`px-3 py-2 rounded-lg font-semibold text-xs whitespace-nowrap transition-all duration-300 flex-1 ${activeTab === 'hr-interview'
                ? 'bg-[#c9a8f5] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            AI HR Interview
          </button>
        </div>
      </div>

      {/* Left Sidebar - Purple Background - Hidden on mobile */}
      <div className={`hidden lg:flex bg-[#c9a8f5] text-white flex-col transition-all duration-500 ease-in-out overflow-hidden h-screen sticky top-0 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        {/* User Profile Section */}
        <div className="p-6 border-b border-purple-400">
          <div className="flex items-center gap-4 group cursor-pointer hover:bg-purple-300 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 animate-pulse">
              G
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h3 className="text-lg font-bold group-hover:text-white transition-colors">Guest</h3>
                <p className="text-sm text-purple-200 group-hover:text-white transition-colors">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          {/* Job Fetch - Active */}
          <button
            onClick={() => setActiveTab('job-fetch')}
            className={`group w-full px-6 py-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} transition-all duration-300 relative ${activeTab === 'job-fetch'
              ? 'bg-pink-400 text-white shadow-lg scale-105'
              : 'text-white hover:bg-purple-300 hover:shadow-md'
              } ${!isSidebarCollapsed && activeTab !== 'job-fetch' ? 'hover:pl-8' : ''}`}
          >
            {activeTab === 'job-fetch' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
            )}
            <svg className={`w-6 h-6 transition-transform duration-300 ${activeTab === 'job-fetch' ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            {!isSidebarCollapsed && <span className="text-lg font-semibold">Job Fetch</span>}
          </button>

          {/* ATS Review */}
          <button
            onClick={() => setActiveTab('ats-review')}
            className={`group w-full px-6 py-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} transition-all duration-300 relative ${activeTab === 'ats-review'
              ? 'bg-pink-400 text-white shadow-lg scale-105'
              : 'text-white hover:bg-purple-300 hover:shadow-md'
              } ${!isSidebarCollapsed && activeTab !== 'ats-review' ? 'hover:pl-8' : ''}`}
          >
            {activeTab === 'ats-review' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
            )}
            <svg className={`w-6 h-6 transition-transform duration-300 ${activeTab === 'ats-review' ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            {!isSidebarCollapsed && <span className="text-lg font-semibold">ATS Review</span>}
          </button>

          {/* AI Mock Quiz */}
          <button
            onClick={() => setActiveTab('mock-quiz')}
            className={`group w-full px-6 py-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} transition-all duration-300 relative ${activeTab === 'mock-quiz'
              ? 'bg-pink-400 text-white shadow-lg scale-105'
              : 'text-white hover:bg-purple-300 hover:shadow-md'
              } ${!isSidebarCollapsed && activeTab !== 'mock-quiz' ? 'hover:pl-8' : ''}`}
          >
            {activeTab === 'mock-quiz' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
            )}
            <svg className={`w-6 h-6 transition-transform duration-300 ${activeTab === 'mock-quiz' ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
            </svg>
            {!isSidebarCollapsed && <span className="text-lg font-semibold">Mock Quiz (J.D)</span>}
          </button>

          {/* AI HR Interview */}
          <button
            onClick={() => setActiveTab('hr-interview')}
            className={`group w-full px-6 py-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} transition-all duration-300 relative ${activeTab === 'hr-interview'
              ? 'bg-pink-400 text-white shadow-lg scale-105'
              : 'text-white hover:bg-purple-300 hover:shadow-md'
              } ${!isSidebarCollapsed && activeTab !== 'hr-interview' ? 'hover:pl-8' : ''}`}
          >
            {activeTab === 'hr-interview' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
            )}
            <svg className={`w-6 h-6 transition-transform duration-300 ${activeTab === 'hr-interview' ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2A3 3 0 0 1 15 5v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5 5 5 0 0 0 5-5h2z" />
            </svg>
            {!isSidebarCollapsed && <span className="text-lg font-semibold">AI HR Interview</span>}
          </button>
        </nav>

        {/* Collapse Button at Bottom */}
        <div className="p-4 border-t border-purple-400">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`w-full p-3 bg-pink-400 rounded-lg hover:bg-pink-500 transition-all duration-300 hover:scale-105 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
          >
            {!isSidebarCollapsed && <span className="text-sm font-semibold">Collapse</span>}
            <svg className={`w-5 h-5 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className='flex flex-col flex-1 p-4 sm:p-6 md:p-8 lg:p-10 gap-6 sm:gap-8 lg:gap-10 pt-4 lg:pt-4'>
        {/* API Key Input and Upload Button with Animation */}
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-0 animate-fade-in-down`}>
          <input
            type= {showApiKey ? 'text' : 'password'}
            placeholder="Enter your Gemini API Key, ex: AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:border-[#e85d75] focus:shadow-lg focus:scale-[1.02] transition-all duration-300 hover:border-[#e85d75]/50"
          />

          {/* Show/Hide Button */}
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="relative md:top-1/2 -translate-y-1/2 text-gray-600 
               hover:text-gray-800 transition"
          >
            {showApiKey ? (
              // Eye Off Icon
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 3l18 18m-6-6a6 6 0 01-8.485-8.485M9.88 9.88a3 3 0 004.242 4.242" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.228 6.228A11.948 11.948 0 003 12c2 5 7 8 9 8a11.9 11.9 0 005.772-2.228M9.88 9.88L3 3" />
              </svg>
            ) : (
              // Eye Icon
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className={`text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 active:scale-95 whitespace-nowrap ${selectedFile ? 'bg-green-500 hover:bg-green-600' : 'bg-[#e85d75] hover:bg-[#d94967]'
              } ${activeTab === 'mock-quiz' || activeTab === 'hr-interview' ? 'hidden' : ''}`}
          >
            {selectedFile ? '✓ File Selected' : 'Upload Your Resume'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Info Text with Animation */}
        <p className={`text-xs sm:text-sm text-gray-600 text-center sm:text-left animate-fade-in`}>
          Create your own Gemini API key from <a href="https://aistudio.google.com/api-keys" target="_blank" className="font-semibold underline text-green-500 hover:text-[#e85d75] transition-colors duration-300">Google AI Studio</a>. <a href="#" className=" font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-300">Watch Video</a> to learn more.
          <br />
          <b>We do not store your api key.</b>
        </p>

        {/* Main Content Area */}
        <div className={`flex-1 p-0 transition-all duration-500 ml-0`}>
          {/* Conditional Content Based on Active Tab */}
          {activeTab === 'ats-review' ? (
            <ATSReviewContent apiKey={apiKey} selectedFile={selectedFile} />
          ) : activeTab === 'mock-quiz' ? (
            <AIMockQuizContent apiKey={apiKey} />
          ) : activeTab === 'hr-interview' ? (
            <AIHRInterviewContent apiKey={apiKey} />
          ) : (
            <>


              {/* Search Section */}
              <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up">
                <h1 className='text-white text-center font-semibold text-lg sm:text-xl mb-2 animate-fade-in'>Auto Job Suggestions Based On Resume</h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 mt-1 mb-3 sm:mb-1 text-center sm:text-left animate-fade-in">
                  Select filters for better results.
                </p>

                {/* Filter Dropdowns and Search Button */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center">
                  {/* Fulltime Dropdown */}
                  <select
                    value={fulltime}
                    onChange={(e) => setFulltime(e.target.value)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  >
                    <option value="Fulltime">Fulltime</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contractor</option>
                    <option value="Internship">Intern</option>
                    <option value="all-types">All Types</option>
                  </select>

                  {/* Timeframe Dropdown */}
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  >
                    <option value="Today">Today</option>
                    <option value="Three Days">Last 3 days</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="All time">All Time</option>
                  </select>

                  {/* Experience Dropdown */}
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  >
                    <option value="No_experience">No Experience</option>
                    <option value="Entry Level">Entry Level [ 0 - 3 Years ]</option>
                    <option value="Mid Level">Senior Openings</option>
                    <option value="No Degree">No Degree</option>
                    <option value="all-experience">All Types</option>
                  </select>

                  <select
                    value={remotework}
                    onChange={(e) => setRemotework(e.target.value)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  >
                    <option value="true">Remote</option>
                    <option value="false">Both</option>

                  </select>

                  {/* Search Button */}
                  <button className="px-6 sm:px-10 py-2.5 sm:py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-lg text-base sm:text-lg font-bold hover:from-pink-500 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 lg:ml-auto hover:scale-105 active:scale-95 shadow-md hover:shadow-lg sm:col-span-2 lg:col-span-1"
                    onClick={fetchJobs}
                  >
                    SEARCH
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                <p className='text-xs text-white mt-2 sm:mt-1 text-center sm:text-left'>If no jobs found, try changing filters.</p>
              </div>

              {/* Job Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {loading && <p style={{ color: "#0ea5e9" }} className="animate-pulse">Processing…</p>}
                {error && <p style={{ color: "red" }} className="animate-shake">{error}</p>}
                {/* Fetched job cards */}
                {jobs.length > 0 && (
                  <>
                    {jobs.map((job, i) => {
                      let animationClass = '';
                      if (i === 0) animationClass = 'animate-slide-in-left';
                      else if (i === 1) animationClass = 'animate-slide-in-right';
                      else animationClass = 'animate-slide-in-up';

                      return (
                        <div key={i} className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 cursor-pointer ${animationClass}`} style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'backwards' }}>

                          <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">{job.job_title}</h3>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{job.employer_name}</h4>
                          <p className="text-sm text-gray-600 mb-3 sm:mb-4">{job.job_city || "Remote"}, {job.job_country}</p>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                            <p className="text-xs text-gray-500">{job.job_employment_types[0]} · {job.job_posted_at}</p>

                            <a href={job.job_apply_link} target="_blank" className="w-full sm:w-auto">
                              <button className="group w-full sm:w-auto px-5 sm:px-6 py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-lg text-sm font-bold hover:from-pink-500 hover:to-pink-600 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                                Apply Now
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </button>
                            </a>
                          </div>
                          <p className="text-xs text-gray-700 mt-2 sm:mb-4">Fetched from: {job.job_publisher}</p>

                        </div>
                      );
                    })}

                  </>
                )}
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
