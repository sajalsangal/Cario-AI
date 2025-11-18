import { useState, useEffect } from 'react'

const AINews = () => {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
  const URL = `https://newsapi.org/v2/everything?q=artificial+intelligence&language=en&sortBy=publishedAt&pageSize=8&apiKey=${NEWS_API_KEY}`;


  useEffect(() => {
    setIsVisible(true)
    //page title
    document.title = "Daily News - CarioAI"
    const fetchNews = async () => {
      try {
        console.log("NEWS API KEY:", import.meta.env.VITE_NEWS_API_KEY); //temporary
        const res = await fetch(URL);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error fetching AI news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      alert(`Subscribed with email: ${email}`)
      setEmail('')
    }
  }

  const trendingTopics = [
    '#Remote Work',
    '#Machine Learning',
    '#React 18',
    '#Cybersecurity',
    '#Typescript',
    '#Data Analyst',
    '#AI Engineer'
  ]

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Blobs with Floating Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Purple Blob - Center */}
        <div 
          className="absolute left-1/2 top-[200px] -translate-x-1/2 w-[800px] h-[600px] bg-[#c9a8f5] opacity-40 animate-float"
          style={{
            borderRadius: '48% 52% 45% 55% / 52% 48% 52% 48%',
            transform: 'translateX(-50%) rotate(-5deg)',
            animation: 'float 6s ease-in-out infinite',
          }}
        ></div>
        
        {/* Pink/Red Blob - Bottom Left */}
        <div 
          className="absolute -left-20 bottom-[100px] w-[400px] h-[400px] bg-[#e85d75] opacity-50 animate-float-reverse"
          style={{
            borderRadius: '58% 42% 60% 40% / 48% 55% 45% 52%',
            transform: 'rotate(20deg)',
            animation: 'float-reverse 8s ease-in-out infinite',
          }}
        ></div>

        {/* Purple Blob - Bottom Right */}
        <div 
          className="absolute -right-20 bottom-[50px] w-[450px] h-[450px] bg-[#c9a8f5] opacity-35 animate-float-slow"
          style={{
            borderRadius: '45% 55% 50% 50% / 55% 45% 55% 45%',
            transform: 'rotate(35deg)',
            animation: 'float-slow 10s ease-in-out infinite',
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        {/* Header with Animation */}
        <div className={`text-center mb-12 sm:mb-16`}>
          <h1 className="text-4xl sm:text-6xl font-black text-black mb-4 sm:mb-6 tracking-tight hover:scale-105 transition-transform duration-300 cursor-default animate-fade-in-down">
            Latest News
          </h1>
          <p className="text-base sm:text-2xl text-[#e85d75] font-bold hover:text-[#d94967] transition-colors duration-300 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            "Stay ahead with updates on latest AI trends and more, live updated for you daily !"
          </p>
        </div>

        {/* News Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {news.map((article, index) => {
          const isEven = index % 2 === 0;
          const mobileAnimationClass = isEven ? 'md:animate-none animate-slide-in-left' : 'md:animate-none animate-slide-in-right';
          
          return (
          <div 
              key={index}
              className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer border border-transparent hover:border-[#e85d75]/20 ${mobileAnimationClass}`}
              style={{
                animationDelay: `${index * 0.15}s`
              }}
            >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 sm:h-48 object-cover rounded-t-2xl sm:rounded-t-3xl"
              />
            )}
            <div className="p-3 sm:p-4 flex flex-col justify-between h-52 sm:h-60">
              <h3 className="text-base sm:text-xl font-bold text-black mb-2 sm:mb-4 leading-tight group-hover:text-[#e85d75] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3">
                {article.description || "No description available."}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-4 inline-block text-indigo-600 text-sm sm:text-base font-medium hover:text-indigo-800 transition-colors duration-300"
              >
                Read more →
              </a>
            </div>
          </div>
          );
        })}
      </div>

        {/* Newsletter Section with Animation */}
        <div className={`pt-8 sm:pt-10 text-center mb-16 sm:mb-20 px-4`}>
          <h2 className="text-2xl sm:text-4xl font-black text-black mb-3 sm:mb-4 hover:scale-105 transition-transform duration-300 animate-fade-in-up animate-pulse-subtle" style={{ animationDelay: '0.5s' }}>
            Never Miss an Update
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 mb-6 sm:mb-8 hover:text-gray-800 transition-colors duration-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Get the latest AI news, job market insights, and developer tools delivered to your inbox weekly.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="flex-1 px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-300 text-base sm:text-lg focus:outline-none focus:border-[#e85d75] focus:shadow-lg focus:shadow-pink-200 focus:scale-[1.02] transition-all duration-300 hover:border-[#e85d75]/50 hover:shadow-md animate-slide-in-left"
              style={{ animationDelay: '0.7s' }}
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#e85d75] to-[#d94967] hover:from-[#d94967] hover:to-[#c93857] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-lg shadow-pink-300 hover:shadow-2xl hover:shadow-pink-400 transition-all duration-300 hover:scale-105 sm:hover:scale-110 active:scale-95 animate-slide-in-right relative overflow-hidden group"
              style={{ animationDelay: '0.7s' }}
            >
              <span className="relative z-10">Subscribe</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </form>
        </div>

        {/* Trending Topics with Animation */}
        <div className={`text-center px-4`}>
          <h2 className="text-2xl sm:text-4xl font-black text-black mb-6 sm:mb-8 hover:scale-105 transition-transform duration-300 animate-fade-in-up animate-pulse-subtle" style={{ animationDelay: '0.8s' }}>
            Trending Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:rotate-2 active:scale-95 active:rotate-0 animate-fade-in relative overflow-hidden group ${
                  index % 3 === 0
                    ? 'bg-[#e8d9f9] text-black hover:bg-[#d4b5f7] hover:shadow-purple-300'
                    : index % 3 === 1
                    ? 'bg-[#ffd4e0] text-black hover:bg-[#ffb8cc] hover:shadow-pink-300'
                    : 'bg-[#e0e0e0] text-black hover:bg-[#d0d0d0] hover:shadow-gray-400'
                }`}
                style={{
                  animationDelay: `${0.9 + index * 0.1}s`
                }}
              >
                <span className="relative z-10">{topic}</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AINews