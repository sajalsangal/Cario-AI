import React from 'react'
import { motion, useInView } from 'framer-motion'

const AIFlowStepsAnimated = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      id: 1,
      gradient: 'from-green-400 to-green-500',
      icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
      text: 'Upload your resume once — let AI analyze your skills and experience.',
      align: 'left',
      delay: 0.2,
    },
    {
      id: 2,
      gradient: 'from-blue-500 to-purple-600',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      text: 'Get AI-filtered job recommendations from LinkedIn, Naukri & more.',
      align: 'right',
      delay: 0.4,
    },
    {
      id: 3,
      gradient: 'from-purple-500 to-pink-600',
      icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
      text: 'Improve your resume with ATS score insights and tailored suggestions.',
      align: 'left',
      delay: 0.6,
    },
    {
      id: 4,
      gradient: 'from-red-500 to-orange-500',
      icon: 'M12 2A3 3 0 0 1 15 5v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5 5 5 0 0 0 5-5h2z',
      text: 'Prepare with AI — practice interviews and enhance communication.',
      align: 'right',
      delay: 0.8,
    },
  ]

  return (
    <div className="relative bg-white py-12" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden">

          {/* Connecting Line (hidden on mobile) */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-20 w-0.5 bg-gradient-to-b from-green-400 via-blue-500 via-purple-500 to-red-500 transform -translate-x-1/2"
            style={{ height: 'calc(100% - 320px)' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* Steps Section */}
          <div className="relative flex flex-col gap-10 md:gap-16">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative ${
                  step.align === 'right' ? 'md:flex md:justify-end' : 'md:flex md:justify-start'
                } flex justify-center`}
              >
                {/* Horizontal Connector (desktop only) */}
                <motion.div
                  className={`hidden md:block absolute top-1/2 ${
                    step.align === 'right' ? 'right-1/2 left-0' : 'left-1/2 right-0'
                  } h-0.5 bg-gray-600 transform -translate-y-1/2 z-0`}
                  initial={{
                    scaleX: 0,
                    transformOrigin: step.align === 'right' ? 'right' : 'left',
                  }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: step.delay + 0.3,
                    ease: 'easeOut',
                  }}
                />

                {/* Card */}
                <motion.div
                  className={`relative z-10 bg-gradient-to-r ${step.gradient} text-white 
                    px-6 py-4 md:px-8 md:py-6 rounded-2xl shadow-lg 
                    w-[90%] sm:w-[80%] md:w-1/2`}
                  initial={{
                    opacity: 0,
                    x: step.align === 'right' ? 100 : -100,
                    y: 20,
                  }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0, y: 0 }
                      : { opacity: 0, x: step.align === 'right' ? 100 : -100, y: 20 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: step.delay,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={step.icon} />
                    </svg>
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* AI Orb (center bottom) */}
          <motion.div
            className="flex justify-center mt-10 mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 1.2, ease: 'backOut' }}
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(74, 222, 128, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(74, 222, 128, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            className="text-center border-t border-gray-700 pt-6 sm:pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Fully AI-powered job-matching and preparation platform — from resume upload to personalized job search and interview readiness.  
              Focus on growing your career while CarioAI finds the right job for you.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AIFlowStepsAnimated
