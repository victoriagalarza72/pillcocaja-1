import React from 'react';
import {
  Users,
  Target,
  Download,
  MessageSquare,
  Award,
  Mail,
  Video,
  ChevronUp,
  ChevronDown,
  MapPin,
  Layers,
  Mountain,
  Thermometer,
  CloudRain,
} from 'lucide-react';
import SectionRail from '../components/SectionRail';
import TopNav from '../components/TopNav';
import { useSectionObserver } from '../components/useSectionObserver';
import { useNavigate } from 'react-router-dom';
// Logistics visuals removed

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const RAIL_WIDTH = 260;
const DESKTOP_BREAKPOINT = 1024;

const SECTIONS = [
  { id: 'r-hero', title: 'Farm' },
  { id: 'r-terroir', title: 'Yunguilla Terroir' },
  { id: 'r-benefits', title: 'Why Pillcocaja' },
  { id: 'r-where', title: 'Where Our Coffee Grows' },
  { id: 'r-contact', title: 'Connect' },
] as const;

const BENEFITS: Array<{ icon: IconType; title: string; description: string }> = [
  {
    icon: Users,
    title: 'Direct Trade Partnership',
    description:
      'Work directly with our family farm to ensure fair pricing and build relationships that elevate every harvest.',
  },
  {
    icon: Target,
    title: 'Complete Traceability',
    description:
      'Every bag includes plot data, harvest timing, and process notes so you can tell the full Pillcocaja story.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description:
      'Rigorous cupping and QC protocols secure consistent, specialty-level performance with each shipment.',
  },
];

// Roasting profiles moved to Green Coffee

// Logistics data removed

// Marketing Kit section removed per request

const CONTACT_OPTIONS: Array<{ icon: IconType; title: string; buttonLabel: string; href: string }> = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    buttonLabel: 'Message Us',
    href: 'https://wa.me/593997069202?text=Hello!%20I%20want%20to%20partner%20with%20Pillcocaja!',
  },
  {
    icon: Mail,
    title: 'Email',
    buttonLabel: 'Send Email',
    href: 'mailto:ana.crespo@pillcocaja.com?subject=Pillcocaja%20Partnership&body=Hello!%20I%20want%20to%20partner%20with%20Pillcocaja!',
  },
  {
    icon: Video,
    title: 'Video Call',
    buttonLabel: 'Request Videocall',
    href: 'https://wa.me/593997069202?text=Hello!%20I%20want%20to%20schedule%20a%20videocall!',
  },
];

const ForRoasters: React.FC = () => {
  const navigate = useNavigate();
  const heroBg = new URL('../assets/images/caferojo2.png', import.meta.url).href;
  const yunguillaBg = new URL('../assets/images/yunguilla2.png', import.meta.url).href;
  const montanaHd = new URL('../assets/images/montanapillcocajahd.png', import.meta.url).href;
  const slideshowImages = [
    new URL('../assets/images/cafe10.jpg', import.meta.url).href,
    new URL('../assets/images/cafe11.jpg', import.meta.url).href,
    new URL('../assets/images/cafe12.jpg', import.meta.url).href,
  ];

  const ids = React.useMemo(() => SECTIONS.map((section) => section.id), []);
  const activeId = useSectionObserver(ids, '0px 0px -65% 0px');
  // Make rail only appear on desktop/tablet-large to avoid unwanted left padding on small screens
  const [viewportWidth, setViewportWidth] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth : DESKTOP_BREAKPOINT));
  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isLargeUp = viewportWidth >= DESKTOP_BREAKPOINT;
  const showRail = Boolean(isLargeUp && activeId && activeId !== 'r-hero');
  const [openBenefit, setOpenBenefit] = React.useState<number | null>(0);
  const isNavOnLight = ['r-benefits', 'r-where', 'r-contact'].includes(activeId ?? '');
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Roasting carousel removed

  // Where Our Coffee Grows data
  const GROWING_INFO: Array<{ title: string; body: string; icon: IconType }> = [
    {
      title: 'Location',
      body:
        'Inter-Andean valley in southern Ecuador, near Santa Isabel (approx. 3.30° S, 79.30° W).',
      icon: MapPin,
    },
    {
      title: 'Soil',
      body:
        'Deep, fertile volcanic and alluvial soils with good drainage – ideal for high-quality crops.',
      icon: Layers,
    },
    {
      title: 'Altitude',
      body: 'Around 1,100–1,300 m a.s.l. within the main valley area.',
      icon: Mountain,
    },
    {
      title: 'Climate & Temperature',
      body:
        'Warm subtropical climate, with average temperatures of 18–22 °C (mild days, cooler nights).',
      icon: Thermometer,
    },
    {
      title: 'Annual Rainfall',
      body:
        'Approx. 500–700 mm per year, with a marked rainy season and a shorter dry period.',
      icon: CloudRain,
    },
  ];
  const [activeWhere, setActiveWhere] = React.useState(0);
  const ActiveGrowingIcon = React.useMemo(() => GROWING_INFO[activeWhere].icon, [activeWhere]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  React.useEffect(() => {
    if (activeId === 'r-terroir') return; // pause while interacting there
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeId, slideshowImages.length]);

  return (
    <main className="relative">
      <TopNav leftOffset={showRail ? RAIL_WIDTH : 0} onLight={isNavOnLight} />
      <SectionRail
        items={SECTIONS}
        activeId={activeId}
        onClick={scrollTo}
        railWidth={RAIL_WIDTH}
        showLabels
        visible={showRail}
      />

      <div
        className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <section
          id="r-hero"
          className="relative h-screen text-white flex items-center overflow-hidden snap-start"
        >
          <img
            src={heroBg}
            alt="Roasters hero"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover animate-hero-pan will-change-transform"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ marginLeft: showRail ? RAIL_WIDTH : 0 }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0">
              <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '60%' }} />
              <span className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '78%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/20" style={{ top: '28%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/15" style={{ top: '66%' }} />
            </div>
            <div className="absolute top-20 left-[15%] h-40 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent" />
            <div className="absolute bottom-24 right-[18%] h-28 w-px bg-gradient-to-t from-white/50 via-white/25 to-transparent rotate-[10deg]" />
            <div className="absolute top-24 right-[22%] h-32 w-32 rounded-full border border-white/20" />
            <div className="absolute bottom-20 left-[20%] h-28 w-28 rounded-full border border-white/10" />
          </div>

          <div className="relative z-20 w-full">
            <div
              className="container-width px-6 lg:px-10"
              
            >
              <div className="max-w-3xl text-center mx-auto">
                <h1 className="font-serif font-black leading-[0.9] tracking-tight text-white/70 text-4xl sm:text-5xl md:text-6xl mb-6">
                  Partner With Pillcocaja
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 desc-text mt-4">
                  Join our network of specialty roasters committed to transparent sourcing, long term collaboration,
                  and coffees that speak of Yunguilla Valley.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/contact')}
                    className="btn-primary bg-white text-cacao-800 hover:bg-gray-100 w-auto"
                  >
                    Request Partnership Info
                  </button>
                  <button
                    onClick={() => navigate('/sustainability')}
                    className="btn-secondary border-white text-white hover:bg-white hover:text-cacao-800 w-auto"
                  >
                    More about us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Yunguilla Terroir (moved from Green Coffee) */}
        <section id="r-terroir" className="relative section-padding overflow-hidden min-h-screen !rounded-none snap-start pt-24 md:pt-28 pb-16">
          <img
            src={yunguillaBg}
            alt="Yunguilla background"
            className="absolute inset-0 w-full h-full object-cover opacity-100 animate-image-pan"
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden />
          <div className="container-width relative z-10" style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}>
            <div className="relative">
              {/* Scrollable text column */}
              <div className="relative pt-24 pb-12 px-6 md:px-12 overflow-hidden lg:h-screen lg:overflow-y-auto no-scrollbar lg:min-w-[600px]">
                <div className="uppercase tracking-[0.18em] text-xs text-cream-200/90 mb-3">Yunguilla Valley · Azuay, Ecuador</div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow leading-tight mb-5">
                  The Yunguilla Terroir
                </h2>
                <p className="text-cream-200/95 text-base  leading-relaxed max-w-xl desc-text">
                  We have a 7-hectare coffee plantation. Our plantations are ranging from 1600 to 1800 meters above sea level, in an environment enriched by forests of native trees known as "faiques." Biodiversity conservation is central to our agricultural operations. This unique ecosystem creates a distinctive microclimate that directly influences the characteristics of our lots, giving them unique and desirable qualities in their sensory profile.
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
              </div>
            </div>
          </div>

          {/* Overlay: grid lines and interactive corner boxes */}
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ marginLeft: showRail ? RAIL_WIDTH : 0 }}>
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
              {/* Bottom-right (hidden on mobile to avoid overlap) */}
              <div className="group absolute bottom-24 right-6 md:right-10 w-40 h-28 md:w-52 md:h-36 border border-white/60 overflow-hidden hidden md:block">
                <img src={slideshowImages[2 % slideshowImages.length]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              {/* Bottom-left */}
              <div className="group absolute bottom-24 left-6 md:left-10 w-40 h-28 md:w-52 md:h-36 border border-white/60 overflow-hidden hidden md:block">
                <img src={slideshowImages[0]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </section>

        <section
  id="r-benefits"
  className="relative min-h-screen lg:h-screen snap-start grid grid-cols-1 lg:grid-cols-2"
>
  {/* Left Side: Text Content */}
  <div className="bg-[rgb(16,36,26)] flex flex-col justify-center p-6 md:p-6">
    <div
      className="relative z-20 w-full max-w-2xl mx-auto"
      style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
    >
      <div className="text-center mb-10 text-white">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-[#d2cdbe]">
          Why Choose Pillcocaja
        </h2>
        <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto desc-text">
          Nurtured by ancient Faique trees and pure mountain springs, this
          coffee is a true reflection of Ecuador’s heart and soul. In balance
          with nature and the people who harvest it, it is truly an honor to
          share with the world.
        </p>
      </div>

      <div className="space-y-2 text-white">
        {BENEFITS.map((benefit, index) => (
          <div key={benefit.title} className="border-b border-white/10">
            <button
              onClick={() => setOpenBenefit(openBenefit === index ? null : index)}
              className="w-full flex items-center justify-between text-left p-4 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <benefit.icon className="h-6 w-6 text-white/80" />
                <h3 className="font-serif text-lg font-bold text-[#d2cdbe]">
                  {benefit.title}
                </h3>
              </div>
              <span
                className={`transform transition-transform duration-300 ${
                  openBenefit === index ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openBenefit === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pt-1 text-sm text-white/70 leading-relaxed desc-text">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">18</div>
          <div className="text-sm text-white/60">Micro-lots</div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">4600</div>
          <div className="text-sm text-white/60">Tons/year</div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">12</div>
          <div className="text-sm text-white/60">Months Availability</div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">10</div>
          <div className="text-sm text-white/60">Countries</div>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side: Image con degradé */}
  <div className="relative h-full w-full hidden lg:block">
    {/* Imagen base */}
    <img
      src={new URL("../assets/images/yunguillafinal.png", import.meta.url).href}
      alt="Yunguilla Valley"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Oscurecido sutil */}
    <div className="absolute inset-0 bg-black/10" />

    {/* 🔰 Degradé verde → transparente desde la izquierda */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-20
                 w-64 xl:w-80 bg-gradient-to-r
                 from-[rgb(16,36,26)]
                 via-[rgba(16,36,26,0.55)]
                 to-transparent"
    />

    {/* Overlay con líneas y texto */}
    <div className="pointer-events-none absolute inset-y-0 right-0 z-30" style={{ left: '20%' }}>
      <span
        className="absolute top-0 bottom-0 w-px bg-white/15"
        style={{ left: "75%" }}
      />
      <span
        className="absolute left-0 right-0 h-px bg-white/15"
        style={{ top: "25%" }}
      />
      <span
        className="absolute left-0 right-0 h-px bg-white/20"
        style={{ top: "75%" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-serif text-[4rem] font-bold text-white/[.35] text-glow animate-fade-in">
          Pillcocaja Valley
        </h3>
      </div>
    </div>
  </div>
</section>

        {/* Where Our Coffee Grows */}
        <section
          id="r-where"
          className="relative min-h-screen snap-start overflow-hidden py-0"
        >
          {/* Subtle background image + gradient */}
          <img
            src={yunguillaBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            aria-hidden
          />
          {/* Rich green gradient to match reference */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(161,129,62,0.31)] via-[rgba(31,58,50,0.8)] to-[rgba(31,58,50,0.8)]" aria-hidden />

          <div
            className="container-width relative z-10 min-h-screen flex items-center justify-center"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            {/* Mobile layout: horizontal carousel of titles and content above */}
            <div className="w-full md:hidden px-6 py-10">
              <div className="relative rounded-none ring-1 ring-black/30 bg-[#2b3a33]/70 backdrop-blur-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="flex items-center px-5 py-3 bg-[#5a6b62]/25 text-white/85 text-sm border-b border-white/10">
                  <span className="font-semibold tracking-wide">Overview</span>
                </div>
                <div key={activeWhere} className="p-5 animate-fade-in">
                  <div className="uppercase tracking-[0.18em] text-xs text-white/70 mb-2">Yunguilla Valley, Azuay – Growing Conditions</div>
                  <div className="flex items-center gap-3 mb-3">
                    {ActiveGrowingIcon ? <ActiveGrowingIcon className="h-5 w-5 text-white/85" /> : null}
                    <h3 className="font-serif text-2xl font-bold text-white normal-case">{GROWING_INFO[activeWhere].title}</h3>
                  </div>
                  <p className="text-white/85 leading-relaxed desc-text">
                    {GROWING_INFO[activeWhere].body}
                  </p>
                </div>
              </div>
              {/* Horizontal carousel of titles */}
              <div className="mt-5 -mx-6 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                <div className="flex gap-3">
                  {GROWING_INFO.map((it, idx) => {
                    const isActive = idx === activeWhere;
                    const num = (idx + 1).toString().padStart(2, '0');
                    return (
                      <button
                        key={it.title}
                        onClick={() => setActiveWhere(idx)}
                        className={`shrink-0 w-56 snap-center text-left p-4 ring-1 transition-colors duration-300 ${isActive ? 'bg-white/20 ring-white/20 text-white' : 'bg-white/10 ring-white/10 text-white/80'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs tracking-[0.22em] opacity-80">{num}</span>
                          <span className="font-serif text-lg font-bold">{it.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop/tablet layout */}
            <div className="hidden md:grid grid-cols-12 gap-6 md:gap-10 w-full">
              {/* Left vertical menu (like reference) */}
              <div className="col-span-12 md:col-span-4">
                <div className="pt-2 space-y-4">
                  {GROWING_INFO.map((it, idx) => {
                    const isActive = idx === activeWhere;
                    const num = (idx + 1).toString().padStart(2, '0');
                    return (
                      <button
                        key={it.title}
                        onClick={() => setActiveWhere(idx)}
                        className="group w-full text-left"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <span className={`font-mono text-sm tracking-[0.22em] ${isActive ? 'text-white/80' : 'text-white/40'}`}>0{num}.</span>
                          <span className={`font-serif text-xl md:text-2xl font-black ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>{it.title}</span>
                        </div>
                        <div className="ml-8 mt-3 h-px w-2/3 bg-white/15" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right content card (panel) */}
              <div className="col-span-12 md:col-span-8 md:-ml-8 lg:-ml-10">
                <div className="relative rounded-none ring-1 ring-black/30 bg-[#2b3a33]/70 backdrop-blur-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                  {/* Header bar */}
                  <div className="flex items-center px-6 py-3 bg-[#5a6b62]/25 text-white/85 text-sm border-b border-white/10">
                    <span className="font-semibold text-white tracking-wide">Overview</span>
                  </div>
                  {/* Content with fade-in */}
                  <div key={activeWhere} className="p-6 md:p-8 animate-fade-in">
                    <div className="uppercase tracking-[0.18em] text-xs text-white/70 mb-2">Yunguilla Valley, Azuay – Growing Conditions</div>
                    <div className="flex items-center gap-3 mb-3">
                      {ActiveGrowingIcon ? <ActiveGrowingIcon className="h-5 w-5 text-white/85" /> : null}
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white normal-case">{GROWING_INFO[activeWhere].title}</h3>
                    </div>
                    <p className="text-white/85 leading-relaxed max-w-2xl desc-text">
                      {GROWING_INFO[activeWhere].body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {false && (
        <section
          id="r-profiles"
          className="relative h-screen snap-start flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Fondos dinámicos */}
          <div className="absolute inset-0 z-0">
            {ROASTING_PROFILES.map((profile, index) => (
              <div
                key={profile.name}
                className="absolute inset-0 w-full h-full bg-cover transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${profile.image})`,
                  backgroundPosition: profile.bgPosition,
                  opacity: activeProfile === index ? 1 : 0,
                  zIndex: activeProfile === index ? 2 : 1,
                }}
              />
            ))}
          </div>
          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 z-10 bg-black/60" />

          <div
            className="container-width relative z-20"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-glow">
                Roasting Notes and Cupping Profiles
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto desc-text">
                Expert recommendations and detailed cupping notes help you unlock the best version of each lot.
              </p>
            </div>

            {/* Vertical Carousel */}
            <div className="relative h-[500px] w-full max-w-3xl mx-auto">
              <div className="relative h-full [perspective:1000px]">
                {ROASTING_PROFILES.map((profile, index) => {
                  const offset = index - activeProfile;
                  const translateY = offset * 40; // Vertical separation
                  const scale = 1 - Math.abs(offset) * 0.15;
                  const rotateX = offset * -10; // Tilt effect
                  const opacity = 1 - Math.abs(offset) * 0.3;
                  const zIndex = ROASTING_PROFILES.length - Math.abs(offset);

                  return (
                    <div
                      key={profile.name}
                      className="absolute left-1/2 top-1/2 w-[90%] max-w-2xl cursor-pointer p-8 transition-transform duration-500 ease-out  backdrop-blur-[60px] rounded-xl ring-1 ring-white/15 shadow-2xl"
                      style={{
                        zIndex,
                        transform: `translateX(-50%) translateY(-50%) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
                        opacity: offset === 0 ? 1 : opacity,
                        pointerEvents: offset === 0 ? 'auto' : 'none',
                      }}
                      onClick={() => setActiveProfile(index)}
                      aria-hidden={offset !== 0}
                    >
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-white mb-4 text-glow">
                            {profile.name}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">Recommended Roast Level</h4>
                              <p className="text-white/70 desc-text">{profile.roastLevel}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">Development Time</h4>
                              <p className="text-white/70 desc-text">{profile.development}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">First Crack Temperature</h4>
                              <p className="text-white/70 desc-text">{profile.temperature}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">Roasting Notes</h4>
                              <p className="text-white/70 desc-text">{profile.notes}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white/90 mb-4">Cupping Scores</h4>
                          <div className="space-y-3">
                            {Object.entries(profile.cupping).map(([attribute, score]) => (
                              <div key={attribute} className="flex items-center justify-between">
                                <span className="capitalize text-white/70 desc-text">{attribute}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="h-2 w-20 rounded-full bg-white/20">
                                    <div
                                      className="h-full rounded-full bg-cacao-500"
                                      style={{ width: `${(score / 10) * 100}%` }}
                                    />
                                  </div>
                                  <span className="w-8 text-sm font-medium text-white/90">{score}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Navigation Arrows */}
              <div className="absolute inset-x-0 top-0 flex justify-center">
                <button onClick={() => setActiveProfile(p => clamp(p - 1))} className="p-2 rounded-full bg-white/50 hover:bg-white shadow-md">
                  <ChevronUp className="h-6 w-6 text-forest-800" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <button onClick={() => setActiveProfile(p => clamp(p + 1))} className="p-2 rounded-full bg-white/50 hover:bg-white shadow-md">
                  <ChevronDown className="h-6 w-6 text-forest-800" />
                </button>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Logistics section removed */}

        {/* Marketing Kit section removed */}

        <section
          id="r-contact"
          className="relative min-h-screen snap-start overflow-hidden text-white"
        >
          {/* Full-bleed background image */}
          <img
            src={montanaHd}
            alt="Mountain valley"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
          {/* Subtle dark gradient for readability, but keep image visible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" aria-hidden />

          <div className="relative z-10 container-width text-center px-6 lg:px-10">
            <div className="pt-20 md:pt-28 lg:pt-32" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 text-white">Ready to Connect?</h2>
            <p className="desc-text mx-auto mb-8 max-w-2xl text-lg text-white/85">
              Let us know how you would like to collaborate and we will respond with tailored availability, pricing, and logistics.
            </p>

            <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {CONTACT_OPTIONS.map((option) => (
                <div key={option.title} className="text-center rounded-none ring-1 ring-white/20 bg-white/15 backdrop-blur-md py-6">
                  <option.icon className="h-10 w-10 mx-auto mb-3 text-white" />
                  <h3 className="font-semibold mb-3 text-white">{option.title}</h3>
                  <a
                    href={option.href}
                    target={option.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-black/55 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 text-xs shadow-sm hover:bg-black/60"
                  >
                    {option.buttonLabel}
                  </a>
                </div>
              ))}
            </div>
            <div className="pb-16" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForRoasters;

