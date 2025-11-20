import React, { useState, useEffect, useRef } from 'react'
import Footer from '../Footer/Footer'
import { motion, useInView } from 'framer-motion'
import purpleBlob from '../../assets/blob-purple.svg'
import redBlob from '../../assets/blob-red.svg'
import polygon from '../../assets/polygon.png'
import { TypeAnimation } from 'react-type-animation';
import AIFlowStepsAnimated from '../AIFlowStepsAnimated/AIFlowStepsAnimated'
import { Link } from "react-router-dom";
import { SiElasticsearch } from "react-icons/si";

const HomePage = () => {

  // Set page title
  useEffect(() => {
    document.title = 'CarioAI'
  }, [])

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Hero Section - Pixel Perfect Match */}
      <div className="relative w-full mx-auto px-7 md:px-16 py-10">
        <div className="gap-24">
          {/* Left Side - Text Content with Blobs */}
          <div className="relative">
            <img src={purpleBlob}
              alt="purpleBlob"
              className='z-10 absolute top-14 md:top-0 md:left-10 md:w-[55vw] w-[200vw] max-w-[1180px] sm:rotate-6 md:rotate-0'
            />
            <img src={redBlob}
              alt="redBlob"
              className='z-7 absolute top-60 md:top-48 left-4 md:left-10 md:w-[20vw] w-[80vw]'
            />
            <img src={polygon}
              alt="redBlob"
              className='hidden md:flex z-10 absolute md:-top-20 md:right-0 md:w-[55vw]'
            />
            {/* Content - Exact Typography */}
            <div className="relative z-10 space-y-3 md:space-y-2 top-14 md:top-28 md:left-28">
              <h1 className="text-[3.5rem] md:text-[3.75rem] font-bold text-black leading-[1.05] tracking-normal text-center md:text-left">
                Find Your
                <br className='md:hidden' />
                <span className="text-red-600 text-[2.7rem] md:text-[3.75rem]">
                  <TypeAnimation
                    sequence={[
                      ' Perfect Job', 2000,
                      ' ATS Score', 2000,
                      ' Daily AI News', 2000,
                      ' Interview Prep', 2000,
                      ' Mock Quiz', 2000,
                    ]}
                    wrapper="span"
                    speed={30}
                    repeat={Infinity}
                    cursor={true}
                  />
                </span>

              </h1>
              <h2 className="text-[2.2rem] pt-2 md:text-[3.25rem] font-semibold font-sans text-[#e85d75] leading-[1.05] tracking-tight relative text-center md:text-left">
                Instantly with AI
              </h2>
              <p className="text-2xl md:text-2xl text-black pt-2 leading-tight tracking-tight text-center md:text-left">
                One Stop Solution To All Your Job Related Needs !
              </p>

              {/* Buttons - Exact Styling */}
              <div className="flex flex-col md:flex-row gap-5 pt-20 justify-center md:justify-start text-center">
                <Link to="/dashboard">
                  <button className="bg-black text-white px-12 py-4 text-[1.5rem] font-bold hover:bg-gray-800 transition-all h-16">
                    Dashboard
                  </button>
                </Link>
                <a href="#video">
                  <button className="border-2 border-[#c9a8f5] bg-[#e8d9f9] text-black px-12 py-4 text-[1.3rem] font-semibold hover:bg-[#d4b5f7] transition-all rounded-xl h-18">
                    Watch Video
                  </button>
                </a>
              </div>

            </div>
          </div>

          {/* Right Side - 3D Hexagon - Pixel Perfect from Screenshot */}
          <div className="relative h-[200px] flex items-center justify-center">

          </div>
        </div>
      </div>

      {/* Video Demo Section with Purple Background and Wave */}
      <div className="relative bg-[#c9a8f5] py-20">
        {/* Wave Divider at Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,0 L0,0 Z" fill="#ffffff"></path>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-12 pt-16">
          <div className="text-center mb-12">
            <p className="text-[3rem] md:text-[4rem] font-bold text-white mb-4 leading-tight" >
              See CarioAI in action
            </p>
            <p className="text-xl md:text-[2rem] text-white/90 text-justify md:text-center">
              Watch how our AI-powered platform transforms your job search experience in seconds
            </p>
          </div>

          {/* Browser Mockup */}
          <div className="relative max-w-5xl mx-auto" id="video">
            {/* Browser Window */}
            <div className="bg-white rounded-t-2xl shadow-2xl overflow-hidden">
              {/* Browser Controls */}
              <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">
                    https://carioai.com
                  </div>
                </div>
              </div>

              {/* Browser Content - Video Player */}
              <div className="bg-black aspect-video relative">
                <iframe
                  className="w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/xoykumxJT2Y"
                  title="AI NERDS Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider at Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,0 L0,0 Z" fill="#c9a8f5"></path>
          </svg>
        </div>
      </div>

      {/* New Section - Job Seekers Quote with Interactive Effects */}
      <div className="relative bg-[#c9a8f5] py-8 md:py-14">
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-12 text-center">
          {/* Quote Text with Hover Effect */}
          <div className="space-y-1">
            <h2 className="text-[2.2rem] md:text-5xl font-bold text-white leading-tight group">
              <span className="inline-block">
                Job seekers spend countless hours
              </span>
              <br />
              <span className="inline-block ">
                searching for roles that <br className='md:hidden'/> "
                <span className=" text-red-500 transition-all duration-300 hover:scale-110 hover:text-red-400 font-extrabold">
                   {' '}Don't Fit
                </span>
                {" "}"

              </span>
            </h2>

            {/* Down Arrow Icon with Animation */}
            <div className="flex justify-center py-10">
              <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Main Heading with Reveal Effect */}
            <div className="pt-2">
              <h3 className="text-[2.5rem] md:text-5xl font-bold text-black leading-tight">
                <span className="inline-block transition-all duration-300">
                  Here's how
                  <span className="transition-all duration-300 hover:scale-105 hover:text-gray-100 hover:cursor-pointer">
                    {" "} 'CarioAI'
                  </span>
                  {" "}changes that with AI

                </span>

              </h3>
            </div>
          </div>
        </div>

        {/* Wave Divider at Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,0 L0,0 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* AI Flow Steps Section - Animated */}
      <AIFlowStepsAnimated />

      {/* Feature Cards Section - Horizontal Scrolling */}
      <div className="relative bg-white py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-12">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-xl text-gray-700">
              Powered by AI to make your job search smarter and faster
            </p>
          </div>
        </div>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll-left hover:cursor-pointer">
            {/* Card 1 - AI Resume Job Match */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-orange-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                AI Resume Job Match
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Upload your resume and find featured job roles that cater to your skill set.
              </p>
            </div>

            {/* Card 2 - ATS Resume Score */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                ATS Resume Score
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Get score and improvement suggestions to make your resume ATS friendly.
              </p>
            </div>

            {/* Card 3 - Mock Interview Practice */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2A3 3 0 0 1 15 5v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5 5 5 0 0 0 5-5h2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Mock Interview Practice
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Practice 1:1 to improve your communication skills with our all new AI HR feature.
              </p>
            </div>
            {/* Card 4 - Interview Prep Practice */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM4 19V5h7v14H4zm16 0h-7v-7h7v7zm0-9h-7V5h7v5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Interview Prep Quiz
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Paste your job description and practice answering questions with our AI bot.
              </p>
            </div>
            {/* Card 5 - Daily AI News */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M 40 8 L 160 8 C 180 8 192 20 192 40 C 192 60 180 72 160 72 L 40 72 C 20 72 8 60 8 40 C 8 20 20 8 40 8 Z M 45 30 A 10 10 0 1 1 45 50 A 10 10 0 1 1 45 30 Z M 75 25 L 75 55 L 95 55 L 95 50 L 82 50 L 82 25 Z M 100 25 L 100 55 L 107 55 L 107 25 Z M 112 25 L 123 55 L 130 55 L 141 25 L 134 25 L 126.5 48 L 119 25 Z M 146 25 L 146 55 L 170 55 L 170 50 L 153 50 L 153 42 L 168 42 L 168 38 L 153 38 L 153 30 L 170 30 L 170 25 Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Daily AI News
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Stay updated with latest AI News and job market trends.
              </p>
            </div>

            {/* Duplicate Cards for Seamless Loop */}
            {/* Card 1 - AI Resume Job Match */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-orange-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                AI Resume Job Match
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Upload your resume and find featured job roles that cater to your skill set.
              </p>
            </div>

            {/* Card 2 - ATS Resume Score */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                ATS Resume Score
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Get score and improvement suggestions to make your resume ATS friendly.
              </p>
            </div>

            {/* Card 3 - Mock Interview Practice */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2A3 3 0 0 1 15 5v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5 5 5 0 0 0 5-5h2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Mock Interview Practice
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Practice 1:1 to improve your communication skills with our all new AI HR feature.
              </p>
            </div>
            {/* Card 4 - Interview Prep Practice */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM4 19V5h7v14H4zm16 0h-7v-7h7v7zm0-9h-7V5h7v5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Interview Prep Quiz
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Paste your job description and practice answering questions with our AI bot.
              </p>
            </div>
            {/* Card 5 - Daily AI News */}
            <div className="flex-shrink-0 w-96 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M 40 8 L 160 8 C 180 8 192 20 192 40 C 192 60 180 72 160 72 L 40 72 C 20 72 8 60 8 40 C 8 20 20 8 40 8 Z M 45 30 A 10 10 0 1 1 45 50 A 10 10 0 1 1 45 30 Z M 75 25 L 75 55 L 95 55 L 95 50 L 82 50 L 82 25 Z M 100 25 L 100 55 L 107 55 L 107 25 Z M 112 25 L 123 55 L 130 55 L 141 25 L 134 25 L 126.5 48 L 119 25 Z M 146 25 L 146 55 L 170 55 L 170 50 L 153 50 L 153 42 L 168 42 L 168 38 L 153 38 L 153 30 L 170 30 L 170 25 Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Daily AI News
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Stay updated with latest AI News and job market trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section - Animated */}
      <BottomCTASection />

      {/* Peer Reviews Section with Purple Wave Background */}
      <div className="relative bg-[#c9a8f5] py-24">
        {/* Wave Divider at Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,0 L0,0 Z" fill="#ffffff"></path>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-12 pt-16">
          {/* Upload Resume Button */}
          <Link to="/dashboard">
            <div className="relative flex justify-center -top-32">
              <button className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-12 py-5 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-4">
                Explore Dashboard
              </button>
            </div>
          </Link>

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Our Peer Reviews
            </h2>
          </div>

          <TestimonialCardsScroller />
        </div>

        {/* Wave Divider at Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,0 L0,0 Z" fill="#c9a8f5"></path>
          </svg>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

const TestimonialCardsScroller = () => {
  const scrollRef = React.useRef(null)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId
    const scrollSpeed = 0.5 // pixels per frame - adjust for speed

    const autoScroll = () => {
      if (!isPaused && window.innerWidth < 768) {
        scrollContainer.scrollLeft += scrollSpeed

        // Reset to beginning when reaching halfway (creates infinite loop)
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0
        }
      }
      animationId = requestAnimationFrame(autoScroll)
    }

    animationId = requestAnimationFrame(autoScroll)

    // Pause auto-scroll when user interacts
    const handleTouchStart = () => setIsPaused(true)
    const handleTouchEnd = () => {
      setTimeout(() => setIsPaused(false), 2000) // Resume after 2 seconds
    }

    scrollContainer.addEventListener('touchstart', handleTouchStart)
    scrollContainer.addEventListener('touchend', handleTouchEnd)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPaused])

  return (
    <div ref={scrollRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto overflow-x-auto md:overflow-x-visible scrollbar-hide px-4 md:px-0">
      {/* Review Card 1 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-pink-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 opacity-0 animate-fadeInUp min-w-[85vw] md:min-w-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            MG
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Martin Goutry</h3>
            <p className="text-sm text-white/80">Back-end developer at MyDonow</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "Dico is finally addressing a long time problem we had when building UIs. It's ease of use and workflow seems really intuitive. Promising! &gt;&gt;"
        </p>
      </div>

      {/* Review Card 2 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-cyan-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 opacity-0 animate-fadeInUp min-w-[85vw] md:min-w-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            SK
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Sarah Kim</h3>
            <p className="text-sm text-white/80">Product Manager at TechCorp</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "AI NERDS transformed my job search completely. I found my dream role in just 2 weeks! The AI matching is incredibly accurate."
        </p>
      </div>

      {/* Review Card 3 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-emerald-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 opacity-0 animate-fadeInUp min-w-[85vw] md:min-w-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            RP
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Raj Patel</h3>
            <p className="text-sm text-white/80">Software Engineer at StartupXYZ</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "The ATS score feature helped me optimize my resume. I started getting 3x more interview calls. Highly recommend!"
        </p>
      </div>

      {/* Review Card 4 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-red-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 opacity-0 animate-fadeInUp min-w-[85vw] md:min-w-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            EJ
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Emily Johnson</h3>
            <p className="text-sm text-white/80">UX Designer at CreativeHub</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "Mock interview practice was a game changer. I felt so prepared and confident during my actual interviews!"
        </p>
      </div>

      {/* Review Card 5 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-orange-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 opacity-0 animate-fadeInUp min-w-[85vw] md:min-w-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            DL
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">David Lee</h3>
            <p className="text-sm text-white/80">Data Analyst at DataCo</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "The job alerts kept me updated on perfect matches. I never missed an opportunity. Best job search tool ever!"
        </p>
      </div>

      {/* Review Card 6 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-purple-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 opacity-0 animate-fadeInUp min-w-[85vw] md:min-w-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            AL
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Anna Lopez</h3>
            <p className="text-sm text-white/80">Marketing Lead at BrandWorks</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "Company insights helped me make informed decisions. I knew exactly what to expect before applying. Amazing!"
        </p>
      </div>

      {/* Duplicate cards for infinite scroll - Hidden on desktop */}
      <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-pink-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 min-w-[85vw]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            MG
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Martin Goutry</h3>
            <p className="text-sm text-white/80">Back-end developer at MyDonow</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "Dico is finally addressing a long time problem we had when building UIs. It's ease of use and workflow seems really intuitive. Promising! &gt;&gt;"
        </p>
      </div>

      <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-cyan-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 min-w-[85vw]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            SK
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Sarah Kim</h3>
            <p className="text-sm text-white/80">Product Manager at TechCorp</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "AI NERDS transformed my job search completely. I found my dream role in just 2 weeks! The AI matching is incredibly accurate."
        </p>
      </div>

      <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-emerald-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 min-w-[85vw]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            RP
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Raj Patel</h3>
            <p className="text-sm text-white/80">Software Engineer at StartupXYZ</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "The ATS score feature helped me optimize my resume. I started getting 3x more interview calls. Highly recommend!"
        </p>
      </div>

      <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-red-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 min-w-[85vw]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            EJ
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Emily Johnson</h3>
            <p className="text-sm text-white/80">UX Designer at CreativeHub</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "Mock interview practice was a game changer. I felt so prepared and confident during my actual interviews!"
        </p>
      </div>

      <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-orange-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 min-w-[85vw]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            DL
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">David Lee</h3>
            <p className="text-sm text-white/80">Data Analyst at DataCo</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "The job alerts kept me updated on perfect matches. I never missed an opportunity. Best job search tool ever!"
        </p>
      </div>

      <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-purple-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 min-w-[85vw]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
            AL
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Anna Lopez</h3>
            <p className="text-sm text-white/80">Marketing Lead at BrandWorks</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed italic">
          "Company insights helped me make informed decisions. I knew exactly what to expect before applying. Amazing!"
        </p>
      </div>
    </div>
  )
}


// Bottom CTA Section with Bounce Animation
const BottomCTASection = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.8 })

  const line1Words = ["Take", "your", "next", "career", "step"]
  const line2Words = ["faster,", "smarter,", "and", "easier"]

  return (
    <div className="relative bg-white py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-12 text-center">
        <h2 className="text-[2.1rem] md:text-5xl font-bold text-black leading-tight">
          {/* First Line */}
          <div className="inline-block">
            {line1Words.map((word, index) => (
              <motion.span
                key={`line1-${index}`}
                className="inline-block mr-4"
                initial={{ y: 0 }}
                animate={isInView ? {
                  y: [0, -20, 0],
                } : { y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1], // Spring easing
                  times: [0, 0.5, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <br />
          {/* Second Line */}
          <div className="inline-block">
            {line2Words.map((word, index) => (
              <motion.span
                key={`line2-${index}`}
                className="inline-block mr-4"
                initial={{ y: 0 }}
                animate={isInView ? {
                  y: [0, -20, 0],
                } : { y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: (line1Words.length * 0.1) + (index * 0.1),
                  ease: [0.34, 1.56, 0.64, 1], // Spring easing
                  times: [0, 0.5, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h2>
      </div>
    </div>
  )
}

// FAQ Section Component - Animated
const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState(null)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const faqs = [
    {
      question: "What is CarioAI?",
      answer: "CarioAI is an AI-powered career assistant that helps users find jobs, prepare for interviews, improve communication skills, and optimize their resumes using ATS scoring."
    },
    {
      question: "Is CarioAI Free?",
      answer: "Yes, CarioAI is 100% free. All you have to do is create your own Gemini API Key and upload your resume and let us handle the rest. Visit dashboard to get started."
    },
    {
      question: "How does CarioAI fetch jobs for me?",
      answer: "CarioAI searches across multiple job platforms, filters relevant roles based on your skills and preferences, and shows you the latest job opportunities in one place."
    },
    {
      question: "How can CarioAI help with interview preparation?",
      answer: "CarioAI provides mock interview sessions, practice questions, real-time feedback, and personalized tips to help you improve your confidence and performance."
    },
    {
      question: "What is Communication Practice in CarioAI?",
      answer: "CarioAI offers speaking and conversation practice using AI simulations. It helps you improve fluency, clarity, and professional communication for real-world scenarios."
    },
    {
      question: "How does CarioAI calculate my ATS score?",
      answer: "CarioAI scans your resume using ATS-style algorithms to check formatting, keywords, skill match, and clarity. It then gives you an ATS score along with improvements to help your resume pass real recruiters screening systems."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="relative bg-[#c9a8f5] pt-0 pb-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-12">
        {/* FAQ Icon and Heading - Animated */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, ease: 'backOut', delay: 0.2 }}
            >
              <div className="text-8xl font-black text-gray-800">?</div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"></div>
            </motion.div>
          </div>
          <h2 className="text-5xl font-bold text-white">F.A.Q</h2>
        </motion.div>

        {/* FAQ Accordion - Staggered Animation */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + (index * 0.15),
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
                animate={{
                  scale: openIndex === index ? 1.02 : 1,
                  boxShadow: openIndex === index
                    ? '0 20px 40px rgba(0,0,0,0.15)'
                    : '0 10px 25px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{
                  boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                  y: -2
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/95 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">
                    {index + 1}. {faq.question}
                  </span>
                  <motion.svg
                    className="w-6 h-6 text-gray-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </motion.svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{
                    height: { duration: 0.3, ease: 'easeInOut' },
                    opacity: { duration: 0.2, delay: openIndex === index ? 0.1 : 0 }
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 pt-2">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage