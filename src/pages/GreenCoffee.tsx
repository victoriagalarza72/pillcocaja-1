import React from 'react';
import {Calendar, ArrowRight } from 'lucide-react';
import SectionRail from "../components/SectionRail";
import TopNav from "../components/TopNav";
import { useSectionObserver } from "../components/useSectionObserver";
import MicrolotsCarouselMobile from '../components/MicrolotsCarouselMobile';

const GreenCoffee: React.FC = () => {
  const heroBg = new URL('../assets/images/yunguilla3.png', import.meta.url).href;
  const hoja1Bg = new URL('../assets/illustrations/hoja1.svg', import.meta.url).href;
  const hoja2Bg = new URL('../assets/illustrations/hoja2.svg', import.meta.url).href;
  const yunguillaBg = new URL('../assets/images/yunguilla2.png', import.meta.url).href;

  const microlots = [
    { id: 1, name: 'Honey Typica Premium', variety: 'Typica', process: 'Honey', altitude: '1,800 masl', notes: ['Citrus','Caramel','Floral'], score: 86, availability: 'Available', image: new URL('../assets/images/cafe3.jpg', import.meta.url).href, specUrl: '#', color: 'cacao-800' },
    { id: 2, name: 'Natural Bourbon Select', variety: 'Red Bourbon', process: 'Natural', altitude: '1,950 masl', notes: ['Berry','Chocolate','Wine'], score: 88, availability: 'Limited', image: new URL('../assets/images/cafe4.jpg', import.meta.url).href, specUrl: '#', color: 'forest-800' },
    { id: 3, name: 'Washed Geisha Exclusive', variety: 'Geisha', process: 'Washed', altitude: '2,000 masl', notes: ['Jasmine','Bergamot','Tea-like'], score: 92, availability: 'Sold Out', image: new URL('../assets/images/cafe5.jpg', import.meta.url).href, specUrl: '#', color: 'brand-accent3' },
  ];

  const harvestCalendar = [
    { month: 'May', activity: 'Harvest Begins', status: 'active' },
    { month: 'Jun', activity: 'Peak Harvest', status: 'active' },
    { month: 'Jul', activity: 'Processing', status: 'active' },
    { month: 'Aug', activity: 'Drying & Milling', status: 'complete' },
    { month: 'Sep', activity: 'Quality Control', status: 'complete' },
    { month: 'Oct', activity: 'Export Ready', status: 'complete' },
  ];

  const slideshowImages = [
    new URL('../assets/images/cafe10.jpg', import.meta.url).href,
    new URL('../assets/images/cafe11.jpg', import.meta.url).href,
    new URL('../assets/images/cafe12.jpg', import.meta.url).href,
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);  
  const [viewportWidth, setViewportWidth] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // moved below after activeId is defined

  // ===== Secciones estilo Home =====
  const SECTIONS = [
    { id: 'g-hero', title: 'Green Coffee' },
    { id: 'g-microlots', title: 'Microlots' },
    { id: 'g-terroir', title: 'Yunguilla Terroir' },
    { id: 'g-harvest', title: 'Harvest' },
  ];
  const RAIL_W = 260;
  const ids = React.useMemo(() => SECTIONS.map(s => s.id), []);
  const activeId = useSectionObserver(ids, "0px 0px -65% 0px");  
  const isLargeUp = viewportWidth >= 1024;
  const showRail = isLargeUp && activeId && activeId !== 'g-hero';
  const isNavOnLight = activeId === 'g-microlots' || activeId === 'g-terroir';
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Spotlight animation for center microlot when section becomes active
  const [spotlightMicrolot, setSpotlightMicrolot] = React.useState(false);
  const [isHoveringMicrolots, setIsHoveringMicrolots] = React.useState(false);
  React.useEffect(() => {
    if (activeId === 'g-microlots') {
      setSpotlightMicrolot(true);
      const t = setTimeout(() => setSpotlightMicrolot(false), 1800);
      return () => clearTimeout(t);
    } else {
      setSpotlightMicrolot(false);
    }
  }, [activeId]);

  // Auto-rotate slideshow except when user is on the Terroir section
  React.useEffect(() => {
    if (activeId === 'g-terroir') return; // pause while interacting there
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeId, slideshowImages.length]);

  return (
    <main className="relative">
      <TopNav leftOffset={showRail ? RAIL_W : 0} onLight={isNavOnLight} />
      <SectionRail
        items={SECTIONS}
        activeId={activeId}
        onClick={scrollTo}
        railWidth={RAIL_W}
        showLabels={true}
        visible={!!showRail}
      />

      <div
        className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
      {/* Hero */}
      <section
        id="g-hero"
        className="relative h-screen text-white flex items-center overflow-hidden snap-start"
      >
        {/* Animated hero image: slight zoom and pan right → left */}
        <img
          src={heroBg}
          alt="Green coffee hero"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover animate-hero-pan will-change-transform"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        {/* Overlay: grid lines like Terroir */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ marginLeft: showRail ? RAIL_W : 0 }}>
          {/* Vertical lines */}
          <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '66%' }} />
          <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '82%' }} />
          {/* Horizontal lines */}
          <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '38%' }} />
          <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '64%' }} />
        </div>
        <div className="relative w-full z-20">
          <div className="container-width text-center">
            <h1 className="font-serif font-black leading-[0.9] tracking-tight capitalize text-white/70 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Green Coffee Microlots
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 desc-text mt-4">
              Discover our meticulously crafted single-origin lots from the pristine Yunguilla Valley, each with its own unique character and story.
            </p>
          </div>
        </div>
        <a
          href="#g-harvest"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 bg-black/60 text-white px-6 py-4 text-sm md:px-10 md:py-6 md:text-base rounded-none shadow-lg backdrop-blur-sm border border-white/10 inline-flex items-center gap-3 hover:bg-black/70 transition z-40 w-max"
        >
          <span className="tracking-wide text-center">
            Discover our Harvest Calendar
            <br className="sm:hidden" /> & Availability
          </span>
          <ArrowRight className="w-5 h-5 hidden sm:block" aria-hidden="true" />
        </a>
      </section>

      {/* Current Microlots */}
      <section id="g-microlots" className="relative min-h-screen snap-start pt-24 md:pt-28 pb-16 bg-cream-50/50 overflow-hidden">
        {/* Ilustraciones de fondo */}
        <img
          src={hoja1Bg}
          alt=""
          className="absolute top-0 left-0 w-1/2 opacity-20 -translate-x-1/4 translate-y-1/4 pointer-events-none select-none"
        />
        <img
          src={hoja2Bg}
          alt=""
          className="absolute bottom-0 right-0 w-1/2 opacity-20 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none"
        />

        <div className="container-width" style={{ paddingLeft: showRail ? RAIL_W + 24 : 0 }}>
          <div className="md:block flex flex-col justify-center h-full pt-12 md:pt-0">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-center text-forest-900 mb-12 md:mb-16">Current Microlots</h2>
  
            {/* Mobile Carousel */}
            <MicrolotsCarouselMobile microlots={microlots} />
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:block">
            <div
              className="microlots-container flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-start gap-4 md:gap-0"
              onMouseEnter={() => setIsHoveringMicrolots(true)}
              onMouseLeave={() => setIsHoveringMicrolots(false)}
            >
              {microlots.map((lot, idx) => (
                <a
                  key={lot.id}
                  href={lot.specUrl}
                  className={`poster poster-tight w-[280px] md:w-[320px] ${lot.id === 1 ? 'tint-cacao' : lot.id === 2 ? 'tint-forest' : 'tint-violet'} ${activeId === 'g-microlots' && idx === 1 && !isHoveringMicrolots ? 'poster-highlighted md:scale-[1.02]' : ''} ${spotlightMicrolot && idx === 1 ? 'poster-spotlight' : ''}`}
                  aria-label={`${lot.name} spec sheet`}
                >
                  <div className="poster-aspect-3x4">
                    <img src={lot.image} alt={lot.name} className="poster-media" loading="lazy" />
                    <div className="poster-dim" />
                    <div className="poster-top">{lot.notes.join(' · ')}</div>
                    <div className="poster-bottom">
                      <h3 className="poster-title">{lot.name}</h3>
                      <p className="poster-meta">{lot.variety} · {lot.process} · {lot.altitude}</p>
                    </div>
                    <div className="poster-hover flex items-end justify-center">
                      <div className="only-cta flex items-center justify-center">
                        <span className="poster-cta poster-cta--white">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Download Spec Sheet
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Yunguilla Terroir (refined split layout) */}
      <section id="g-terroir" className="relative section-padding overflow-hidden min-h-screen !rounded-none snap-start pt-24 md:pt-28 pb-16">
        <img
          src={yunguillaBg}
          alt="Yunguilla background"
          className="absolute inset-0 w-full h-full object-cover opacity-100 animate-image-pan"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="container-width relative z-10" style={{ paddingLeft: showRail ? RAIL_W + 24 : 0 }}>
          <div className="relative">
            {/* Scrollable text column */}
            <div className="relative pt-24 pb-12 px-6 md:px-12 overflow-hidden lg:h-screen lg:overflow-y-auto no-scrollbar lg:min-w-[600px]">
              <div className="uppercase tracking-[0.18em] text-xs text-cream-200/90 mb-3">Yunguilla Valley · Azuay, Ecuador</div>
               <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow leading-tight mb-5">
                The Yunguilla Terroir
              </h2>
              <p className="text-cream-200/95 text-base md:text-lg leading-relaxed max-w-xl desc-text">
                Nestled in the Andean foothills between 1,500-2,000 meters above sea level, the Yunguilla Valley offers a singular microclimate where cool mountain air, rich volcanic soils and filtered sunlight bring clarity and elegance to the cup.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl">
                <div className="text-center text-cream-100/90">
                  <div className="text-2xl font-medium">1,800m</div>
                  <div className="text-xs text-cream-100/80">Avg. Altitude</div>
                </div>
                <div className="text-center text-cream-100/90">
                  <div className="text-2xl font-medium">22°C</div>
                  <div className="text-xs text-cream-100/80">Avg. Temp</div>
                </div>
                <div className="text-center text-cream-100/90">
                  <div className="text-2xl font-medium">1,200mm</div>
                  <div className="text-xs text-cream-100/80">Annual Rainfall</div>
                </div>
              </div>

              {/* Extra visuals under text (hidden in new layout) */}
              <div className="hidden mt-10 space-y-6 max-w-2xl">
                <div className="relative w-full pt-100p shadow-md">
                  <img src={(new URL('../assets/images/cafe9.jpg', import.meta.url).href)} alt="Raised drying beds" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full pt-100p shadow">
                    <img src={(new URL('../assets/images/cafe8.png', import.meta.url).href)} alt="Coffee detail" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative w-full pt-100p shadow">
                    <img src={(new URL('../assets/images/cafehoney.png', import.meta.url).href)} alt="Honey process" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay: grid lines and interactive corner boxes */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ marginLeft: showRail ? RAIL_W : 0 }}>
          {/* Vertical lines */}
          <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '66%' }} />
          <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '82%' }} />
          {/* Horizontal lines */}
          <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '38%' }} />
          <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '64%' }} />

          {/* Hotspot squares with hover images */}
          <div className="absolute inset-0 pointer-events-auto select-none">
            {/* Top-left */}
            <div className="group absolute top-16 left-6 md:left-10 w-40 h-28 md:w-52 md:h-36 border border-white/60 overflow-hidden">
              <img src={slideshowImages[0]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            {/* Top-right */}
            <div className="group absolute top-16 right-6 md:right-10 w-40 h-28 md:w-52 md:h-36 border border-white/60 overflow-hidden">
              <img src={slideshowImages[1 % slideshowImages.length]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            {/* Bottom-right */}
            <div className="group absolute bottom-24 right-6 md:right-10 w-40 h-28 md:w-52 md:h-36 border border-white/60 overflow-hidden">
              <img src={slideshowImages[2 % slideshowImages.length]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            {/* Bottom-left */}
            <div className="group absolute bottom-24 left-6 md:left-10 w-40 h-28 md:w-52 md:h-36 border border-white/60 overflow-hidden">
              <img src={slideshowImages[0]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Harvest Calendar */}
      <section
        id="g-harvest"
        className="relative section-padding bg-cover bg-center snap-start min-h-screen"
        style={{ backgroundImage: "url('/src/assets/images/cafe14.png')" }}
      >
        <div className="absolute inset-0 opacity-90 bg-forest-900" aria-hidden="true" />
        <div className="relative container-width z-10" style={{ paddingLeft: showRail ? RAIL_W + 24 : 0 }}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Harvest Calendar & Availability</h2>
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto desc-text ">
              Follow our harvest and processing timeline to understand when our exceptional lots become available for export.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {harvestCalendar.map((item, idx) => (
              <div
                key={item.month}
                className={`relative overflow-hidden bg-white rounded-none shadow-lg p-4 md:p-6 text-center transition-all duration-300 ${item.status === 'active' ? 'ring-2 ring-cacao-500' : ''} ${activeId === 'g-harvest' ? 'animate-fade-in' : ''}`}
                style={activeId === 'g-harvest' ? ({ animationDelay: `${idx * 140 + 60}ms` } as React.CSSProperties) : undefined}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage: `url(${
              ['May', 'Jun', 'Jul'].includes(item.month)
                        ? hoja1Bg
                        : hoja2Bg
                    })`,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <Calendar className={`h-6 w-6 md:h-8 md:w-8 ${item.status === 'active' ? 'text-cacao-600' : item.status === 'complete' ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-forest-900 mb-2">{item.month}</h3>
                <p className="text-sm text-gray-600 mb-3 font-medium font-mono">{item.activity}</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'active' ? 'bg-cacao-100 text-cacao-800' : item.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {item.status === 'active' ? 'In Progress' : item.status === 'complete' ? 'Complete' : 'Upcoming'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default GreenCoffee;
