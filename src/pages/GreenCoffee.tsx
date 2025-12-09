import { microlots as microlotsData } from '../data/microlots';
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import SectionRail from "../components/SectionRail";
import TopNav from "../components/TopNav";
import { useSectionObserver } from "../components/useSectionObserver";
import MicrolotsCarouselMobile from '../components/MicrolotsCarouselMobile';
import NanolotsShowcase from "../components/NanolotsShowcase";
import NanolotsCarouselMobile from "../components/NanolotsCarouselMobile";
import { nanolots } from "../data/nanolots";
import MicrolotsCarousel from "../components/MicrolotsCarousel";

const GreenCoffee: React.FC = () => {
  const heroBg = new URL('../assets/images/yunguilla3.png', import.meta.url).href;
  const hoja1Bg = new URL('../assets/illustrations/hoja1.svg', import.meta.url).href;
  const hoja2Bg = new URL('../assets/illustrations/hoja2.svg', import.meta.url).href;
  const harvestBg = new URL('../assets/images/cafe14.png', import.meta.url).href;

  const microlots = microlotsData;


  const harvestCalendar = [
    { month: 'May', activity: 'Harvest Begins', status: 'active' },
    { month: 'Jun', activity: 'Peak Harvest', status: 'active' },
    { month: 'Jul', activity: 'Processing', status: 'active' },
    { month: 'Aug', activity: 'Drying & Milling', status: 'complete' },
    { month: 'Sep', activity: 'Quality Control', status: 'complete' },
    { month: 'Oct', activity: 'Export Ready', status: 'complete' },
  ];

  const [viewportWidth, setViewportWidth] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SECTIONS = [
    { id: 'g-hero', title: 'Green Coffee' },
    { id: 'g-nanolots', title: 'Nanolots' },
    { id: 'g-microlots', title: 'Microlots' },
    { id: 'g-harvest', title: 'Harvest' },
  ];
  const RAIL_W = 260;
  const ids = React.useMemo(() => SECTIONS.map(s => s.id), []);
  const activeId = useSectionObserver(ids, "0px 0px -65% 0px");
  const isLargeUp = viewportWidth >= 1024;
  const showRail = isLargeUp && activeId && activeId !== 'g-hero';
  const isNavOnLight = activeId === 'g-microlots';
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Roasting Notes section removed per request

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

      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        {/* Hero */}
        <section id="g-hero" className="relative h-screen text-white flex items-center overflow-hidden snap-start">
          <img src={heroBg} alt="Green coffee hero" aria-hidden className="absolute inset-0 w-full h-full object-cover animate-hero-pan will-change-transform" />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ marginLeft: showRail ? RAIL_W : 0 }}>
            <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '66%' }} />
            <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '82%' }} />
            <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '38%' }} />
            <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '64%' }} />
          </div>
          <div className="relative w-full z-20">
            <div className="container-width text-center px-8 md:px-0">
              <h1 className="font-serif font-black leading-[0.9] tracking-tight capitalize text-white/70 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Green Coffee Microlots</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 desc-text mt-4">Discover our meticulously crafted single-origin lots from the pristine Yunguilla Valley, each with its own unique character and story.</p>
            </div>
          </div>
          <a href="#g-harvest" className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 bg-black/60 text-white px-6 py-4 text-sm md:px-10 md:py-6 md:text-base rounded-none shadow-lg backdrop-blur-sm border border-white/10 inline-flex items-center gap-3 hover:bg-black/70 transition z-40 w-max">
            <span className="tracking-wide text-center">Discover our Harvest Calendar<br className="sm:hidden" /> & Availability</span>
            <ArrowRight className="w-5 h-5 hidden sm:block" aria-hidden="true" />
          </a>
        </section>

        {/* Nanolots */}
        <section id="g-nanolots" className="relative snap-start">
          <div className="block md:hidden">
            <NanolotsCarouselMobile nanolots={nanolots} />
          </div>
          <div className="hidden md:block">
            <NanolotsShowcase fullHeight={true} leftOffset={isLargeUp ? RAIL_W : 0} />
          </div>
        </section>

        {/* Roasting Notes section removed per request */}

        {/* Current Microlots */}
        <section id="g-microlots" className="relative min-h-screen snap-start pt-24 md:pt-28 pb-16 bg-cream-50/50 overflow-hidden">
          <img src={hoja1Bg} alt="" className="absolute top-0 left-0 w-1/2 opacity-20 -translate-x-1/4 translate-y-1/4 pointer-events-none select-none" />
          <img src={hoja2Bg} alt="" className="absolute bottom-0 right-0 w-1/2 opacity-20 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none" />

          <div className="container-width" style={{ paddingLeft: showRail ? RAIL_W + 24 : 0 }}>
            <div className="md:block flex flex-col justify-center h-full pt-12 md:pt-0">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-center text-forest-900 mb-12 md:mb-16">Current Microlots</h2>
              <div className="md:hidden">
              <MicrolotsCarouselMobile microlots={microlots} />
              </div>
            </div>

            {/* Desktop Horizontal Carousel (3 tarjetas visibles completas al inicio) */}
            <MicrolotsCarousel microlots={microlots} />

            {/* Lista inferior compacta, horizontal */}
            <div className="hidden md:block mt-6">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 opacity-70">
                {microlots.map((lot) => (
                  <li key={lot.id}>
                    <a
                      href={lot.specUrl}
                      className="text-[11px] uppercase tracking-widest text-forest-900/60 hover:text-forest-900/90 transition-colors"
                    >
                      {lot.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Harvest Calendar */}
        <section
          id="g-harvest"
          className="relative section-padding bg-cover bg-center snap-start min-h-screen"
          style={{ backgroundImage: `url(${harvestBg})` }}
        >
          <div className="absolute inset-0 opacity-90 bg-forest-900" aria-hidden="true" />
          <div className="relative container-width z-10" style={{ paddingLeft: showRail ? RAIL_W + 24 : 0 }}>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Harvest Calendar & Availability</h2>
              <p className="text-base md:text-lg text-white max-w-2xl mx-auto desc-text ">Follow our harvest and processing timeline to understand when our exceptional lots become available for export.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {harvestCalendar.map((item, idx) => (
                <div key={item.month} className={`relative overflow-hidden bg-white rounded-none shadow-lg p-4 md:p-6 text-center transition-all duration-300 ${item.status === 'active' ? 'ring-2 ring-cacao-500' : ''} ${activeId === 'g-harvest' ? 'animate-fade-in' : ''}`} style={activeId === 'g-harvest' ? ({ animationDelay: `${idx * 140 + 60}ms` } as React.CSSProperties) : undefined}>
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${['May', 'Jun', 'Jul'].includes(item.month) ? hoja1Bg : hoja2Bg})` }} />
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

