import { useState, useEffect } from 'react'

const AINews = () => {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "fae339e545184d04940612ef5c47c993"; // 
  const URL = `https://newsapi.org/v2/everything?q=artificial+intelligence&language=en&sortBy=publishedAt&pageSize=8&apiKey=${API_KEY}`;


  useEffect(() => {
    setIsVisible(true)
    //page title
    document.title = "Daily News - CarioAI"
    const fetchNews = async () => {
      try {
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
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl font-black text-black mb-6 tracking-tight hover:scale-105 transition-transform duration-300 cursor-default">
            Latest News
          </h1>
          <p className="text-2xl text-[#e85d75] font-bold hover:text-[#d94967] transition-colors duration-300">
            "Stay ahead with updates on latest AI trends and more, live updated for you daily !"
          </p>
        </div>

        {/* News Cards Grid with Staggered Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {news.map((article, index) => (
          <div 
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer border border-transparent hover:border-[#e85d75]/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between h-60">
              <h3 className="text-xl font-bold text-black mb-4 leading-tight group-hover:text-[#e85d75] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {article.description || "No description available."}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>

        {/* Newsletter Section with Animation */}
        <div className={`pt-10 text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '800ms'}}>
          <h2 className="text-4xl font-black text-black mb-4 hover:scale-105 transition-transform duration-300">
            Never Miss an Update
          </h2>
          <p className="text-lg text-gray-700 mb-8 hover:text-gray-800 transition-colors duration-300">
            Get the latest AI news, job market insights, and developer tools delivered to your inbox weekly.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2 md:flex items-center justify-center gap-4 max-w-2xl mx-auto group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="flex-1 px-8 py-4 rounded-full border-2 border-gray-300 text-lg focus:outline-none focus:border-[#e85d75] focus:shadow-lg focus:scale-[1.02] transition-all duration-300 hover:border-[#e85d75]/50"
              required
            />
            <button
              type="submit"
              className="bg-[#e85d75] hover:bg-[#d94967] text-white px-12 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Trending Topics with Animation */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '1000ms'}}>
          <h2 className="text-4xl font-black text-black mb-8 hover:scale-105 transition-transform duration-300">
            Trending Topics
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                  index % 3 === 0
                    ? 'bg-[#e8d9f9] text-black hover:bg-[#d4b5f7] hover:shadow-purple-200'
                    : index % 3 === 1
                    ? 'bg-[#ffd4e0] text-black hover:bg-[#ffb8cc] hover:shadow-pink-200'
                    : 'bg-[#e0e0e0] text-black hover:bg-[#d0d0d0] hover:shadow-gray-300'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{
                  transitionDelay: `${1200 + index * 100}ms`
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AINews