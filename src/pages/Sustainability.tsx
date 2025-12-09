import React from 'react';
import { Leaf, Users,TreePine, Heart, Ruler } from 'lucide-react';
import TopNav from '../components/TopNav';
import SectionRail from '../components/SectionRail';
import { useSectionObserver } from '../components/useSectionObserver';

type ImpactMetric = { value: string; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> };

// Mobile-only collage with tap-to-zoom
const MobileTeamGrid: React.FC<{ images: string[] }> = ({ images }) => {
  const [zoomSrc, setZoomSrc] = React.useState<string | null>(null);
  const top = images[0];
  const rest = images.slice(1, 5);
  return (
    <>
      <div className="relative block lg:hidden w-full h-full overflow-hidden">
        {/* Top gradient and title overlay on collage */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-6">
          <h3 className="font-serif text-4xl font-black text-white/90 drop-shadow-md">Our Team</h3>
        </div>
        {/* Mosaic without gaps filling full height */}
        <div className="grid grid-rows-2 gap-0 h-full">
          {/* Top hero image */}
          <button
            className="relative overflow-hidden"
            onClick={() => setZoomSrc(top)}
            aria-label="Zoom team photo"
          >
            <img src={top} alt="Team image 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 active:scale-105" />
          </button>

          {/* Bottom 2x2 grid */}
          <div className="grid grid-cols-2 gap-0">
            {rest.map((src, idx) => (
              <button
                key={src}
                className="relative overflow-hidden"
                onClick={() => setZoomSrc(src)}
                aria-label={`Zoom team photo ${idx + 2}`}
              >
                <img src={src} alt={`Team image ${idx + 2}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 active:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {zoomSrc && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={zoomSrc} alt="Zoomed team" className="max-w-[92vw] max-h-[84vh] object-contain" />
        </div>
      )}
    </>
  );
};


const RAIL_WIDTH = 260;
const DESKTOP_BREAKPOINT = 1024;

const SECTIONS = [
  { id: 's-hero', title: 'Sustainability' },
  { id: 's-community', title: 'Community' },
  { id: 's-impact', title: 'Impact' },
  { id: 's-goals', title: 'Our Team' },
] as const;

const IMPACT_METRICS: ImpactMetric[] = [
  { value: 'Nature', label: 'We honor our environment by cultivating with intention: no invasive machinery, no deforestation, and no toxic inputs.', icon: Leaf },
  { value: 'Passion', label: 'Our work is rooted in devotion, not production. Every harvest reflects years of care, curiosity, and craft—so each cup carries the story behind it.', icon: Heart },
  { value: 'Traceability', label: 'We track harvest dates, processing methods, elevation, and varietal to guarantee authenticity, consistency, and accountability in every bag.', icon: Ruler },
  { value: 'Our People', label: 'Our farm sustains more than 20 local workers, 90% of whom are women, ensuring year-round employment and dignified opportunities. ', icon: Users },
];


const Sustainability: React.FC = () => {
  const heroBg = new URL('../assets/images/yunguilla3.png', import.meta.url).href;
  const impactBg = new URL('../assets/images/cafefondo.jpeg', import.meta.url).href;
  const teamImgs = [
    new URL('../assets/images/trabajador4.jpeg', import.meta.url).href,
    new URL('../assets/images/trabajador2.jpeg', import.meta.url).href,
    new URL('../assets/images/trabajador3.jpeg', import.meta.url).href,
    new URL('../assets/images/trabajador1.jpeg', import.meta.url).href,
    new URL('../assets/images/trabajador5.jpeg', import.meta.url).href,
  ];

  const [viewportWidth, setViewportWidth] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth : DESKTOP_BREAKPOINT));
  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ids = React.useMemo(() => SECTIONS.map(s => s.id), []);
  const activeId = useSectionObserver(ids, '0px 0px -65% 0px');
  const isLargeUp = viewportWidth >= DESKTOP_BREAKPOINT;
  const railVisible = !!(isLargeUp && activeId && activeId !== 's-hero');
  const effectiveRailWidth = railVisible ? RAIL_WIDTH : 0;
  const isNavOnLight = ['s-community'].includes(activeId ?? '');
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Mobile pager for Community section
  const [communityPage, setCommunityPage] = React.useState(0);
  const [commTouchStart, setCommTouchStart] = React.useState<number | null>(null);
  const [commDelta, setCommDelta] = React.useState(0);
  const handleCommTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setCommTouchStart(e.touches[0].clientX);
  const handleCommTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (commTouchStart == null) return;
    setCommDelta(e.touches[0].clientX - commTouchStart);
  };
  const handleCommTouchEnd = () => {
    if (commTouchStart != null) {
      if (commDelta < -40) setCommunityPage((p) => Math.min(1, p + 1));
      else if (commDelta > 40) setCommunityPage((p) => Math.max(0, p - 1));
    }
    setCommTouchStart(null);
    setCommDelta(0);
  };

  return (
    <main className="relative">
      <TopNav leftOffset={effectiveRailWidth} onLight={isNavOnLight} />
      <SectionRail items={SECTIONS} activeId={activeId} onClick={scrollTo} railWidth={RAIL_WIDTH} showLabels visible={railVisible} />

      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        {/* HERO */}
        <section id="s-hero" className="relative h-screen text-white flex items-center overflow-hidden snap-start">
          <img src={heroBg} alt="Sustainability hero" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-black/45" aria-hidden />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ marginLeft: effectiveRailWidth }}>
            <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '58%' }} />
            <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '78%' }} />
            <span className="absolute left-0 right-0 h-px bg-white/25" style={{ top: '36%' }} />
            <span className="absolute left-0 right-0 h-px bg-white/15" style={{ top: '68%' }} />
          </div>
          <div className="relative z-20 w-full">
            <div className="container-width px-8 md:px-0" style={{ paddingLeft: railVisible ? RAIL_WIDTH + 24 : 25 }}>
              <div className="max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Sustainability First</h1>
                <p className="text-xl md:text-2xl max-w-2xl text-white/85 desc-text">Regenerative farming, community uplift, and transparent storytelling guide every decision at Pillcocaja.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY */}
        <section id="s-community" className="relative min-h-screen snap-start overflow-hidden p-0">
          <div className="relative z-10 w-full" style={{ paddingLeft: railVisible ? RAIL_WIDTH : 0 }}>
            {/* Mobile: split screen (text pager 50vh + image 50vh) */}
            <div className="lg:hidden min-h-screen overflow-hidden">
              {/* Top half: text with pager */}
              <div
                className="h-[50vh] bg-[rgba(145,93,55)] text-cream-100 relative px-6 py-8 flex flex-col justify-center"
                onTouchStart={handleCommTouchStart}
                onTouchMove={handleCommTouchMove}
                onTouchEnd={handleCommTouchEnd}
              >
                <div className="pointer-events-none absolute inset-0 opacity-20 bg-no-repeat" style={{ backgroundImage: "url('src/assets/illustrations/cafeflor.svg')", backgroundSize: '120%', backgroundPosition: 'center 70%' }} aria-hidden />
                {communityPage === 0 ? (
                  <div className="relative z-10 animate-fade-in">
                    <h2 className="font-serif text-3xl font-bold leading-tight mb-4">Guardians of Balance</h2>
                    <p className="text-cream-200/90 text-base leading-relaxed desc-text">
                      What began as a small planting has grown into 7 hectares of shade-grown arabica, supporting more than 20 local families. Today, Pillcocaja coffee is roasted and enjoyed in over 15 countries, recognized for its floral complexity, terroir expression, and steadfast commitment to responsible cultivation.
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10 animate-fade-in">
                    <p className="text-cream-200/90 text-base leading-relaxed mb-4 desc-text">
                      We are a deforestation-free farm, protecting the land that sustains us and the animals that live alongside us. Our work is rooted in harmony with the cloud-forest ecosystem—preserving habitat, nurturing biodiversity, and ensuring that cultivation never comes at the expense of nature.
                    </p>
    
                  </div>
                )}
                <div className="relative z-10 mt-5 flex items-center justify-center gap-2">
                  {[0,1].map((i) => (
                    <button key={i} onClick={() => setCommunityPage(i)} aria-label={`Go to community slide ${i+1}`} className={`h-1.5 rounded-full transition-all ${communityPage === i ? 'w-8 bg-cream-100' : 'w-3 bg-cream-100/50'}`} />
                  ))}
                </div>
              </div>

              {/* Bottom half: image + quote */}
              <div className="h-[50vh] relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/images/sostenibilidad.jpeg')" }} aria-hidden />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="absolute inset-0 flex items-end justify-center p-6 pb-8">
                  <div className="bg-cream-100/95 text-forest-900 p-5 max-w-xl shadow-xl ring-1 ring-black/10">
                    <p className="italic text-sm leading-relaxed">“Pillcocaja is not just a coffee farm; it is a stewardship project shaped by community, conservation, and continuous improvement—cultivating exceptional coffee while honoring the valley that makes it possible.”</p>
                    <div className="mt-3 text-sm text-forest-900/70">— Pillcocaja Community</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:grid grid-cols-12 min-h-screen overflow-hidden">
              {/* Left text panel */}
              <div className="col-span-12 lg:col-span-6 bg-[rgba(145,93,55)] text-cream-100 px-6 py-10 md:px-10 md:py-14 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-20 bg-no-repeat" style={{ backgroundImage: "url('src/assets/illustrations/cafeflor.svg')", backgroundSize: '120%', backgroundPosition: 'center 70%' }} aria-hidden />

                {/* Desktop: full text */}
                <div className="hidden lg:flex flex-col justify-center h-full">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">Guardians of Balance</h2>
                  <p className="text-cream-200/90 text-base md:text-lg leading-relaxed mb-6 desc-text">
                    What began as a small planting has grown into 7 hectares of shade-grown arabica, supporting more than 20 local families. Today, Pillcocaja coffee is roasted and enjoyed in over 15 countries, recognized for its floral complexity, terroir expression, and steadfast commitment to responsible cultivation.
                  </p>
                  <p className="text-cream-200/90 text-base md:text-lg leading-relaxed mb-6 desc-text">
                    We are a deforestation-free farm, protecting the land that sustains us and the animals that live alongside us. Our work is rooted in harmony with the cloud-forest ecosystem—preserving habitat, nurturing biodiversity, and ensuring that cultivation never comes at the expense of nature.
                  </p>
                </div>

                {/* Mobile: two-slide pager */}
                <div className="lg:hidden min-h-[100vh] flex flex-col justify-center"
                  onTouchStart={handleCommTouchStart}
                  onTouchMove={handleCommTouchMove}
                  onTouchEnd={handleCommTouchEnd}
                >
                  {communityPage === 0 ? (
                    <div className="animate-fade-in">
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-6">Guardians of Balance</h2>
                      <p className="text-cream-200/90 text-base leading-relaxed desc-text">
                        What began as a small planting has grown into 7 hectares of shade-grown arabica, supporting more than 20 local families. Today, Pillcocaja coffee is roasted and enjoyed in over 15 countries, recognized for its floral complexity, terroir expression, and steadfast commitment to responsible cultivation.
                      </p>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <p className="text-cream-200/90 text-base leading-relaxed mb-5 desc-text">
                        We are a deforestation-free farm, protecting the land that sustains us and the animals that live alongside us. Our work is rooted in harmony with the cloud-forest ecosystem—preserving habitat, nurturing biodiversity, and ensuring that cultivation never comes at the expense of nature.
                      </p>
                    </div>
                  )}
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {[0,1].map((i) => (
                      <button key={i} onClick={() => setCommunityPage(i)} aria-label={`Go to community slide ${i+1}`}
                        className={`h-1.5 rounded-full transition-all ${communityPage === i ? 'w-8 bg-cream-100' : 'w-3 bg-cream-100/50'}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right image + quote panel */}
              <div className="col-span-12 lg:col-span-6 relative h-full min-h-[420px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/images/sostenibilidad.jpeg')" }} aria-hidden />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="absolute inset-0 flex items-end justify-center p-6 md:p-10 pb-10 md:pb-16">
                  <div className="bg-cream-100/95 text-forest-900 p-6 md:p-8 max-w-xl shadow-xl ring-1 ring-black/10">
                    <p className="italic text-sm md:text-base leading-relaxed">“Pillcocaja is not just a coffee farm; it is a stewardship project shaped by community, conservation, and continuous improvement—cultivating exceptional coffee while honoring the valley that makes it possible.”</p>
                    <div className="mt-4 text-sm text-forest-900/70">— Pillcocaja Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section id="s-impact" className="relative min-h-screen snap-start overflow-hidden text-white">
          <img src={impactBg} alt="Yunguilla Valley" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/20 to-black/40" aria-hidden />
          <div className="relative z-10" style={{ paddingLeft: railVisible ? RAIL_WIDTH + 24 : 0 }}>
            <div className="container-width px-6 md:px-0 pt-24 md:pt-0">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 drop-shadow-sm mb-3">Measuring Our Impact</h2>
                <p className="text-base md:text-lg text-forest-900/90 max-w-2xl mx-auto">We track environmental and social indicators to ensure our work produces lasting positive results.</p>
              </div>
              {/* Mobile: horizontal carousel */}
              <div className="md:hidden -mx-6 px-6">
                <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory">
                  <div className="flex gap-4">
                    {IMPACT_METRICS.map((m) => (
                      <div key={m.label} className="shrink-0 snap-center w-[85vw] rounded-none bg-white/30 backdrop-blur-xl ring-1 ring-black/10 p-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/40">
                          <m.icon className="h-8 w-8 text-forest-900" />
                        </div>
                        <div className="text-2xl font-bold text-forest-900 mb-1 drop-shadow-sm font-serif">{m.value}</div>
                        <div className="text-xs text-forest-900/80">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop/tablet grid */}
              <div className="hidden md:grid mx-auto max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch justify-items-center">
                {IMPACT_METRICS.map((m) => (
                  <div key={m.label} className="w-full max-w-[260px] rounded-none bg-white/30 backdrop-blur-xl ring-1 ring-black/10 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/40">
                      <m.icon className="h-8 w-8 text-forest-900" />
                    </div>
                    <div className="text-2xl font-bold text-forest-900 mb-1 drop-shadow-sm font-serif">{m.value}</div>
                    <div className="text-xs text-forest-900/80">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OUR TEAM – collage */}
        <section id="s-goals" className="relative h-screen snap-start overflow-hidden bg-cream-100">
          <div className="relative z-10 w-full h-full" style={{ paddingLeft: railVisible ? RAIL_WIDTH : 0 }}>
            {/* Mobile: better distributed grid + tap to zoom */}
            <MobileTeamGrid images={teamImgs} />

            {/* Desktop: original collage */}
            <div className="hidden lg:grid w-full h-full grid-cols-5 grid-rows-2 gap-0">
              <div className="col-span-2 row-span-2 relative overflow-hidden">
                <img src={teamImgs[0]} alt="Team collage image 1" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1 relative overflow-hidden">
                <img src={teamImgs[1]} alt="Team collage image 2" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-1 relative overflow-hidden">
                <img src={teamImgs[2]} alt="Team collage image 3" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1 relative overflow-hidden">
                <img src={teamImgs[3]} alt="Team collage image 4" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-1 relative overflow-hidden">
                <img src={teamImgs[4]} alt="Team collage image 5" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Sustainability;
