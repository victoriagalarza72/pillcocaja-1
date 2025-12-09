import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Phone } from "lucide-react";
import SectionRail from "../components/SectionRail";
import TopNav from "../components/TopNav";
import { useSectionObserver } from "../components/useSectionObserver";
import OurCoffeeSection from "../components/OurCoffeeSection";
import OurCoffeeStoryMobile from "../components/OurCoffeeStoryMobile";
import MobileOfferingsCarousel from "../components/MobileOfferingsCarousel";
import OfferingsShowcase from "../components/OfferingShowcase";
import SeasonalHighlight from "../components/SeasonalHighlight";
import SeasonalHighlightMobile from "../components/SeasonalHighlightMobile";

const videoSrc = new URL("../assets/videos/videocortado2.mp4", import.meta.url).href;
const heroPoster = "/videos/hero-poster.jpg";

const SECTIONS = [
  { id: "sec-hero", title: "Home" },
  { id: "sec-story", title: "Story" },
  { id: "sec-special", title: "Our Offerings" },
  { id: "sec-quote", title: "Seasonal Highlight" },
];

const RAIL_W = 260;
const DESKTOP_BREAKPOINT = 1024;

const Home: React.FC = () => {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : DESKTOP_BREAKPOINT
  );
  // Newsletter disabled per request

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useSectionObserver(ids, "0px 0px -65% 0px");

  const isLargeUp = viewportWidth >= DESKTOP_BREAKPOINT;
  const effectiveRailWidth = isLargeUp ? RAIL_W : 0;
  const showRail = Boolean(isLargeUp && activeId && activeId !== "sec-hero");

  const isNavOnLight = activeId === "sec-story" || activeId === "sec-quote";

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollContainerClasses = "h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth";

  const heroRailOffset = showRail ? effectiveRailWidth : 0;

  return (
    <main className="relative">
      <TopNav leftOffset={heroRailOffset} onLight={isNavOnLight} />

      <SectionRail
        items={SECTIONS}
        activeId={activeId}
        onClick={scrollTo}
        railWidth={effectiveRailWidth}
        showLabels={true}
        visible={showRail}
      />

      <div className={scrollContainerClasses} style={{ scrollBehavior: "smooth" }}>
        <section id="sec-hero" className="relative min-h-screen md:h-screen snap-start">
          <div
            className="absolute top-0 right-0 bottom-0"
            style={{ left: heroRailOffset }}
          >
            <div className="relative w-full h-full">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={heroPoster}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 z-10 pointer-events-none">
                <span
                  className="absolute top-0 bottom-0 w-px bg-white/25"
                  style={{ left: "60%" }}
                />
                <span
                  className="absolute top-0 bottom-0 w-px bg-white/20"
                  style={{ left: "78%" }}
                />
                <span
                  className="absolute left-0 right-0 h-px bg-white/20"
                  style={{ top: "28%" }}
                />
                <span
                  className="absolute left-0 right-0 h-px bg-white/15"
                  style={{ top: "66%" }}
                />
              </div>
            </div>
          </div>

          <div
            className="absolute left-0 top-0 h-full bg-[#6b7145] transition-all duration-500 ease-out"
            style={{ width: heroRailOffset, opacity: showRail ? 1 : 0 }}
          />

          <div
            className="relative z-30 h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-center md:items-end justify-center md:justify-start pt-20 pb-20 md:pt-0 md:pb-24"
            style={{ paddingLeft: heroRailOffset ? heroRailOffset + 24 : 0 }}
          >
            <div className="w-full max-w-2xl text-white text-center md:text-left space-y-[17.5rem] md:space-y-8">
              <p
                className="uppercase tracking-wider text-white/80"
                style={{ marginLeft: showRail ? -heroRailOffset * 0.8 : 0 }}
              >
                Guardians Of Balance
              </p>
              <h1
                className="font-serif font-black leading-[0.92] inline-block text-4xl sm:text-5xl md:text-7xl"
                style={{
                  marginLeft: showRail ? -heroRailOffset * 1.2 : 0,
                  transform: showRail ? "scaleX(1.14)" : undefined,
                  transformOrigin: showRail ? "left" : "center",
                }}
              >
                <span className="block">Discover Our</span>
                <span className="block">Green Coffee</span>
              </h1>
              <div className="flex justify-center md:justify-start">
                <a
                  href="/contact"
                  className="rounded-none border border-white/90 text-white font-semibold px-4 py-2.5 text-sm inline-flex items-center justify-center w-44 md:w-auto md:px-5 md:py-3 md:text-base hover:bg-white/10 transition"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="sec-story"
          className="relative snap-start"
        >
          <div className="absolute inset-0 bg-cream-50" />
          <div className="hidden md:block">
            <OurCoffeeSection
              fullHeight={isLargeUp}
              leftOffset={isLargeUp ? effectiveRailWidth : 0}
            />
          </div>
          <div className="block md:hidden">
            <OurCoffeeStoryMobile />
          </div>
        </section>

        <section id="sec-special" className="relative snap-start">
        <div className="hidden md:block">
            <OfferingsShowcase
              fullHeight={true}
              leftOffset={isLargeUp ? effectiveRailWidth : 0}
            />
          </div>
          <div className="block md:hidden">
            <MobileOfferingsCarousel />
          </div>
        </section>

        <section id="sec-quote" className="relative snap-start">
          <div className="hidden md:block">
            <SeasonalHighlight
              fullHeight={isLargeUp}
              leftOffset={isLargeUp ? effectiveRailWidth : 0}
            />
          </div>
          <div className="block md:hidden">
            <SeasonalHighlightMobile />
          </div>
        </section>
      </div>
      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/593997069202"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center"
      >
        <Phone className="h-7 w-7 text-white" />
      </a>
    </main>
  );
};

export default Home;
