import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Dashboard from "./components/Dashboard/Dashboard";
import AiNews from "./components/AINews/AINews";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    //Pinging backend at start to wake up
    fetch(import.meta.env.VITE_BACKEND_URL);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
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
