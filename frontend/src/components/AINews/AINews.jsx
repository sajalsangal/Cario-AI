import { useState, useEffect } from "react";

const AINews = () => {
  const [email, setEmail] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 
  const NEWS_URL = `${BACKEND_URL}/api/news`;

  const staticNews = [
    {
      title: "OpenAI Launches GPT-5: Revolutionary AI Model with Enhanced Reasoning Capabilities",
      description: "OpenAI unveils GPT-5, featuring breakthrough improvements in logical reasoning, multimodal understanding, and real-time learning.",
      url: "https://example.com/gpt5-launch",
      urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
    },
    {
      title: "Google DeepMind Achieves Breakthrough in Protein Folding with AlphaFold 3",
      description: "DeepMind's latest AI system predicts protein structures with 99% accuracy, revolutionizing drug discovery.",
      url: "https://example.com/alphafold3",
      urlToImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop"
    },
    {
      title: "Microsoft Copilot AI Now Integrated Across All Enterprise Applications",
      description: "AI Copilot is now fully integrated across Office 365, Azure, and Windows to boost productivity.",
      url: "https://example.com/microsoft-copilot",
      urlToImage: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&h=600&fit=crop"
    },
    {
      title: "Tesla's FSD AI Achieves Level 4 Autonomy",
      description: "Tesla’s new FSD update reaches Level 4 fully autonomous driving in major cities.",
      url: "https://example.com/tesla-fsd",
      urlToImage: "https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    document.title = "Daily News - CarioAI";

    const fetchNews = async () => {
      try {
        const res = await fetch(NEWS_URL);
        const data = await res.json();

        if (data.articles?.length > 0) {
          setNews(data.articles);
        } else {
          setNews(staticNews);
        }
      } catch (err) {
        console.error("News fetch error:", err);
        setNews(staticNews);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  const trendingTopics = [
    "#Remote Work",
    "#Machine Learning",
    "#React 18",
    "#Cybersecurity",
    "#Typescript",
    "#Data Analyst",
    "#AI Engineer"
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-[800px] h-[600px] bg-[#c9a8f5] opacity-40 animate-float" style={{ borderRadius: '48% 52% 45% 55%' }}></div>
        <div className="absolute -left-20 bottom-[100px] w-[400px] h-[400px] bg-[#e85d75] opacity-50 animate-float-reverse" style={{ borderRadius: '58% 42% 60% 40%' }}></div>
        <div className="absolute -right-20 bottom-[50px] w-[450px] h-[450px] bg-[#c9a8f5] opacity-35 animate-float-slow" style={{ borderRadius: '45% 55% 50% 50%' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-black text-black mb-4 tracking-tight animate-fade-in-down">Latest News</h1>
          <p className="text-lg sm:text-xl text-[#e85d75] font-semibold animate-fade-in">"Stay ahead with daily AI updates curated just for you."</p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Loading Skeleton UI */}
          {loading &&
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-2xl"></div>
                <div className="mt-4 h-4 bg-gray-200 rounded"></div>
                <div className="mt-3 h-3 w-3/4 bg-gray-200 rounded"></div>
                <div className="mt-5 h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ))
          }

          {/* Actual News Cards */}
          {!loading &&
            news.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <h3 className="mt-4 text-lg sm:text-xl font-bold text-black group-hover:text-[#e85d75] transition-colors">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{article.description || "No description available."}</p>

                <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                  Read more →
                </a>
              </div>
            ))
          }

        </div>

        {/* Subscribe */}
        <div className="pt-12 text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Never Miss an Update</h2>
          <p className="text-gray-700 mb-6">Get the latest AI news delivered weekly.</p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 focus:border-[#e85d75] transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <button className="px-10 py-3 rounded-full bg-[#e85d75] text-white font-bold hover:bg-[#d94967] transition-all">
              Subscribe
            </button>
          </form>
        </div>

        {/* Trending */}
        <div className="pt-16 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Trending Topics</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {trendingTopics.map((topic, index) => (
              <span
                key={index}
                className="px-5 py-2 text-sm font-semibold rounded-full bg-[#ffd4e0] hover:bg-[#ffb8cc] transition-all cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AINews;
