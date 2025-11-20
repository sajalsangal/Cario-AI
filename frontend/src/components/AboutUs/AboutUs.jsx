import { useEffect, useRef, useState } from "react";
import './AboutUs.css'
import Footer from '../Footer/Footer'

const AboutUs = () => {
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const [visibleTeamMembers, setVisibleTeamMembers] = useState([]);
  const boxRefs = useRef([]);
  const teamRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    boxRefs.current.forEach((box, index) => {
      if (box) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleBoxes((prev) => [...new Set([...prev, index])]);
              }
            });
          },
          { threshold: 0.2 }
        );

        observer.observe(box);
        observers.push(observer);
      }
    });

    teamRefs.current.forEach((member, index) => {
      if (member) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleTeamMembers((prev) => [...new Set([...prev, index])]);
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(member);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const teamMember = [
    { id: 0, name: "Sajal Sangal", title: "Data Scientist", Skills: ["UI/UX", "Frontend", "Backend"], emote: '👨' },
    { id: 1, name: "Deepika Tyagi", title: "Data Scientist", Skills: ["Frontend", "Backend"] , emote: '👩'},
    { id: 2, name: "Madan Dahiphale", title: "Data Scientist", Skills: ["UI/UX", "Backend"] , emote: '👨'},
    { id: 3, name: "Rathin Kar", title: "Data Scientist", Skills: ["UI/UX"], emote: '👨' },
    { id: 4, name: "Ankita Babhulkar", title: "Software Engineer", Skills: ["Frontend", "UI/UX"] , emote: '👩'},
    { id: 5, name: "Onkar Singh", title: "Data Scientist", Skills: ["UI/UX"], emote: '👨' },
  ]

  const skillColors = {
  "UI/UX": "bg-red-400",
  "Frontend": "bg-blue-400",
  "Backend": "bg-yellow-400"
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-x-hidden">
      {/* Top Left Pink Blob - Animated */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-pink-300 to-pink-400 opacity-80 -ml-[300px] -mt-[150px] animate-pulse"
        style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", animation: "blob 7s infinite" }}></div>

      {/* Top Right Purple Blob - Animated */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-300 to-purple-400 opacity-80 -mr-[200px] -mt-[100px]"
        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", animation: "blob 9s infinite" }}></div>

      {/* Hero and Mission Section */}
      <div className="relative pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto relative">
          {/* Hero White Bubble - Top Left */}
          <div className="bg-white rounded-[50px] md:rounded-[80px] lg:rounded-[100px] p-6 md:p-12 lg:p-16 shadow-2xl hover:shadow-3xl relative z-10 max-w-2xl transition-all duration-500 hover:scale-105"
            style={{ animation: "slideFromCenter 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-left mb-3 md:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Career + AI = CarioAI
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-left mb-4 md:mb-6 text-black">
              AI That Makes Your Job Search Effortless
            </h2>
            <p className="text-left text-gray-700 text-xs md:text-base leading-relaxed">
              CarioAI blends the essence of your career journey with intelligent technology.<br className="hidden md:block" />
              Our name reflects what we stand for — helping you grow, explore, and make smarter steps toward the opportunities that match your ambitions.
            </p>
          </div>

          {/* Large Pink/Red Blob Background for Mission */}
          <div className="absolute right-0 top-[40%] w-[800px] h-[800px] bg-gradient-to-br from-pink-400 via-pink-500 to-red-500 opacity-90 -mr-[200px] z-0"
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}></div>

          {/* Bottom Purple Blob */}
          <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-300 to-purple-400 opacity-70 -ml-[200px] -mb-[200px] z-0"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}></div>

          {/* Mission Box - Below and Right of Hero */}
          <div className="relative z-10 mt-6 md:mt-[-40px] ml-0 md:ml-auto max-w-2xl lg:ml-[40%]"
            style={{ animation: "slideFromCenterRight 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards" }}>
            <div className="p-6 md:p-12 lg:p-16 text-white border-3 md:border-4 border-blue-400 rounded-[50px] md:rounded-[80px] lg:rounded-[100px] bg-gradient-to-br from-pink-400/60 to-red-400/60 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-blue-500">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="w-12 md:w-14 h-12 md:h-14 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm hover:rotate-180 transition-transform duration-700">
                  <svg className="w-7 md:w-9 h-7 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <circle cx="12" cy="12" r="6" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <line x1="12" y1="2" x2="12" y2="6" strokeWidth="2" />
                    <line x1="12" y1="18" x2="12" y2="22" strokeWidth="2" />
                    <line x1="2" y1="12" x2="6" y2="12" strokeWidth="2" />
                    <line x1="18" y1="12" x2="22" y2="12" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-center">Our Mission</h2>
              <p className="text-xs md:text-base leading-relaxed text-center">
                Job searching shouldn't feel overwhelming. Our mission is to simplify the entire process by offering AI-powered tools that bring clarity, accuracy, and confidence to every candidate — no matter where they are in their career.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="relative py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        {/* Purple wave decoration at bottom right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-300 opacity-60 -mr-32 -mb-32"
          style={{ clipPath: "ellipse(60% 70% at 80% 80%)" }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
            style={{ animation: "fadeInUp 1s ease-out" }}>
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Job Matching */}
            <div
              ref={(el) => (boxRefs.current[0] = el)}
              className="bg-orange-50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-orange-100"
              style={{
                animation: visibleBoxes.includes(0)
                  ? "slideInFromLeft 0.8s ease-out forwards"
                  : "none"
              }}>
              <h3 className="text-base md:text-lg font-bold mb-3 text-center text-black">
                Job Matching
              </h3>
              <p className="text-xs md:text-sm text-gray-800 text-center leading-relaxed">
                Upload your resume once — our AI analyzes your experience, skills, and goals to instantly recommend relevant job roles. No more endless searching.
              </p>
            </div>

            {/* ATS Resume Review */}
            <div
              ref={(el) => (boxRefs.current[1] = el)}
              className="bg-blue-50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-blue-100"
              style={{
                animation: visibleBoxes.includes(1)
                  ? "slideInFromRight 0.8s ease-out forwards"
                  : "none"
              }}>
              <h3 className="text-base md:text-lg font-bold mb-3 text-center text-black">
                ATS Resume Review
              </h3>
              <p className="text-xs md:text-sm text-gray-800 text-center leading-relaxed">
                Get a detailed ATS compatibility check for your resume. Our AI highlights missing keywords, formatting issues, and areas to improve so your resume can pass applicant tracking systems and reach real recruiters.
              </p>
            </div>

            {/* AI Mock Quiz */}
            <div
              ref={(el) => (boxRefs.current[2] = el)}
              className="bg-purple-50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-purple-100"
              style={{
                animation: visibleBoxes.includes(2)
                  ? "slideInFromLeft 0.8s ease-out forwards"
                  : "none"
              }}>
              <h3 className="text-base md:text-lg font-bold mb-3 text-center text-black">
                AI Mock Quiz & Skill Assessment
              </h3>
              <p className="text-xs md:text-sm text-gray-800 text-center leading-relaxed">
                Sharpen your knowledge with quizzes auto-generated for your target job role or skill set. Track your improvement and build confidence with every attempt.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* AI Interview Practice */}
            <div
              ref={(el) => (boxRefs.current[3] = el)}
              className="bg-pink-50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-pink-100"
              style={{
                animation: visibleBoxes.includes(3)
                  ? "slideInFromRight 0.8s ease-out forwards"
                  : "none"
              }}>
              <h3 className="text-base md:text-lg font-bold mb-3 text-center text-black">
                AI Interview Practice
              </h3>
              <p className="text-xs md:text-sm text-gray-800 text-center leading-relaxed">
                Practice confidently with AI-driven interview simulations tailored to your role. Receive real-time insights, answer suggestions, and personalized improvement tips.
              </p>
            </div>

            {/* AI News */}
            <div
              ref={(el) => (boxRefs.current[4] = el)}
              className="bg-orange-50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-orange-100"
              style={{
                animation: visibleBoxes.includes(4)
                  ? "slideInFromLeft 0.8s ease-out forwards"
                  : "none"
              }}>
              <h3 className="text-base md:text-lg font-bold mb-3 text-center text-black">
                AI News & Career Insights
              </h3>
              <p className="text-xs md:text-sm text-gray-800 text-center leading-relaxed">
                Stay updated with AI-powered job market insights, industry trends, and career news tailored to your interests — helping you stay ahead and informed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="relative py-16 px-4 md:px-8 lg:px-16 pb-0">
        {/* Bottom Purple Background with Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-purple-300 -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-purple-300 -z-10"></div>

        {/* Top Wave Shape */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-white -z-5"
          style={{ clipPath: "ellipse(100% 100% at 50% 0%)" }}></div>

        <div className="max-w-5xl mx-auto relative z-10 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
            style={{ animation: "fadeInUp 1s ease-out" }}>
            Meet Our Team
          </h2>
          <div className="bg-white rounded-[80px] md:rounded-[100px] p-10 md:p-16 lg:p-20 shadow-2xl hover:shadow-3xl transition-all duration-500"
            style={{ animation: "fadeInUp 1s ease-out 0.2s backwards" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
              {/* Sajal Sangal - Row 1, Left */}
              {teamMember.map((member) => (
                <div
                  ref={(el) => (teamRefs.current[member.id] = el)}
                  className="flex items-start gap-4 hover:scale-105 transition-transform duration-300"
                  style={{
                    animation: visibleTeamMembers.includes(member.id) ? "teamMemberFromCenterLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none"
                  }}>
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg hover:shadow-xl hover:rotate-12 transition-all duration-300">
                    {member.emote}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-black">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.Skills.map((skill) => (
                        <span className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${skillColors[skill]}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
