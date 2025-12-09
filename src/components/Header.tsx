// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // detect scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Green Coffee", path: "/green-coffee" },
    { name: "Farm", path: "/farm" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Contact", path: "/contact" },
  ];

  const textClass = (path: string) =>
    location.pathname === path
      ? "text-cacao-600"
      : isScrolled || !isHome
      ? "text-gray-900 hover:text-cacao-600"
      : "text-white hover:text-cream-200";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled || !isHome
        ? "bg-white/90 backdrop-blur-md shadow-sm"
        : "bg-transparent"}
      `}
    >
      <nav className="container-width">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* ✅ LOGO SOLO IMAGEN */}
          <Link to="/" aria-label="Pillcocaja - Home">
            <img
              src="src\assets\images\logo.png"        // pon logo.png en la carpeta /public
              alt="Pillcocaja Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                className={`text-sm font-medium transition-colors duration-200 ${textClass(
                  l.path
                )}`}
              >
                {l.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className={`lg:hidden p-2 transition-colors
              ${isScrolled || !isHome ? "text-forest-800" : "text-white"}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg">
            <div className="py-3">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  to={l.path}
                  className={`block px-6 py-3 text-base transition-colors
                    ${
                      location.pathname === l.path
                        ? "text-cacao-600 bg-gray-50"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
