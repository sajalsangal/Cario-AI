import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

import HomePage from "./components/Home";
import AboutUs from "./components/AboutUs";
import Dashboard from "./components/Dashboard";
import AiNews from "./components/AINews";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

useEffect(() => {
    fetch("https://your-backend.onrender.com/");
}, []);


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      {/* Gap so content doesn't hide under fixed navbar */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-news" element={<AiNews />} />
        </Routes>
      </div>
    </Router>
  );
}
