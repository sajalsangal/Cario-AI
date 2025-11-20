import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Logo from '../../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation(); // detects current route automatically
  const currentPath = location.pathname;

  // Detect scroll for background blur
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home", to: "/" },
    { id: "uploadResume", label: "About Us", to: "/about-us" },
    { id: "dashboard", label: "Dashboard", to: "/dashboard" },
    { id: "aiNews", label: "Daily News", to: "/ai-news" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-[7vw] transition-all duration-300 
      ${
        isScrolled
          ? "bg-[#050414]/50 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="py-2 flex justify-between items-center">

        {/* LOGO */}
        <div className="font-semibold">
          <img src={Logo} alt="" className="w-20"/>
        </div>

        {/* DESKTOP MENU */}
        <ul
          className={`hidden md:flex space-x-20 ${
            isScrolled ? "text-white" : "text-black"
          }`}
        >
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className={`cursor-pointer hover:text-[#AA7FF0] hover:font-semibold transition 
                  ${
                    currentPath === item.to
                      ? "text-[#AA7FF0] font-semibold"
                      : ""
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* WHATSAPP + MENU ICON */}
          <div className="flex space-x-4">
            <a
              href="https://chat.whatsapp.com/KCqyKotKy7oC6KN0omFPXo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#AA7FF0]"
            >
              <FaWhatsapp size={28} />
            </a>

            {isOpen ? (
              <FiX
                className="text-black md:hidden text-3xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <FiMenu
                className="text-black md:hidden text-3xl cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </ul>

        {/* MOBILE MENU ICON (outside desktop menu) */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="text-black text-3xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-black text-3xl cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* MOBILE MENU LIST */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4/5 
          bg-[#050414]/50 backdrop-blur-lg rounded-lg shadow-lg z-50 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`cursor-pointer hover:text-white hover:font-semibold
                    ${
                      currentPath === item.to
                        ? "text-[#8254ec] font-semibold"
                        : ""
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
