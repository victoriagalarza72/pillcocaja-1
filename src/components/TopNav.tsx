import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

type Props = { leftOffset?: number; onLight?: boolean };
const TopNav: React.FC<Props> = ({ leftOffset = 136, onLight = false }) => {
  const [open, setOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const location = useLocation();
  const logoUrl = new URL('../assets/images/logo.png', import.meta.url).href;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Hide nav when leaving the hero on Green Coffee and Home pages
  useEffect(() => {
    let target: HTMLElement | null = null;
    if (location.pathname === "/green-coffee") {
      target = document.getElementById("g-hero") || document.getElementById("hero-green");
    } else if (location.pathname === "/") {
      target = document.getElementById("sec-hero");
    } else if (location.pathname === "/for-roasters") {
      target = document.getElementById("r-hero");
    } else {
      setHideOnScroll(false);
      return;
    }
    if (!target) {
      setHideOnScroll(false);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setHideOnScroll(!entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [location.pathname]);

  const links = [
    { label: "Home", to: "/" },
    { label: "Green Coffee", to: "/green-coffee" },
    { label: "For Roasters", to: "/for-roasters" },
    { label: "Roasted Coffee", to: "/roasted-coffee" },
    { label: "Sustainability", to: "/sustainability" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const linkBase = `font-mono font-black ${onLight ? 'text-forest-900/90 hover:text-forest-900' : 'text-white/90 hover:text-white'}`;
  const toggleBtn = onLight ? 'bg-black/10 text-forest-900 ring-forest-900/20' : 'bg-white/10 text-white ring-white/20';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${hideOnScroll ? "-translate-y-full" : "translate-y-0"}`}>
      <div
        className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between md:pl-[var(--left-offset)]"
        style={{ ["--left-offset" as any]: `${leftOffset + 16}px` }}
      >
        <Link to="/" aria-label="Pillcocaja - Home" className="inline-flex items-center">
          <img src={logoUrl} alt="Pillcocaja" className="h-8 md:h-9 w-auto object-contain" />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.slice(0, 5).map((l) => (
            <li key={l.to}><Link to={l.to} className={linkBase}>{l.label}</Link></li>
          ))}
          <li>
            {onLight ? (
              <Link to="/contact" className="rounded-none px-4 py-2 border border-forest-800 text-forest-800 font-semibold hover:bg-forest-800 hover:text-white">
                Contact
              </Link>
            ) : (
              <Link to="/contact" className="rounded-none px-4 py-2 bg-white text-forest-800 font-semibold">
                Contact
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full ${toggleBtn}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Off-canvas overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        {/* Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-full bg-forest-900 text-white shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
            <Link to="/" aria-label="Pillcocaja - Home" className="inline-flex items-center lg:hidden">
              <img src={logoUrl} alt="Pillcocaja" className="h-8 w-auto object-contain" />
            </Link>
            <button
              className="p-2 rounded-full bg-white/10 text-white ring-1 ring-white/20"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="px-5 py-4 space-y-2 bg-forest-900">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block w-full px-3 py-3 rounded-lg text-[17px] font-mono font-black hover:bg-white/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
