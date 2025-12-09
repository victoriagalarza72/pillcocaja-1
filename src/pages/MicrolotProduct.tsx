import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ZoomIn, X } from 'lucide-react';
import TopNav from '../components/TopNav';
import { microlots } from '../data/microlots';
import { nanolots } from '../data/nanolots';

const MicrolotProduct: React.FC = () => {
  const { slug } = useParams();
  const allLots = React.useMemo(() => [...microlots, ...nanolots], []);
  const lot = allLots.find(m => m.slug === slug) || allLots[0];
  const isNanolot = React.useMemo(() => nanolots.some(n => n.slug === lot.slug), [lot.slug]);
  const hoja1Bg = new URL('../assets/illustrations/hoja1.svg', import.meta.url).href;
  const hoja2Bg = new URL('../assets/illustrations/hoja2.svg', import.meta.url).href;
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <>
    <main className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: 'rgb(29 16 5)' }}>
      <TopNav onLight={false} />

      {/* subtle radial accents + background illustrations */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[60vw] h-[60vw] rounded-full bg-cacao-800/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[55vw] h-[55vw] rounded-full bg-black/30 blur-3xl" />
      <img src={hoja1Bg} alt="" aria-hidden className="pointer-events-none select-none absolute top-10 left-0 w-1/2 opacity-10 -translate-x-1/4" />
      <img src={hoja2Bg} alt="" aria-hidden className="pointer-events-none select-none absolute bottom-0 right-0 w-1/2 opacity-10 translate-x-1/4" />

      {/* Mobile & Tablet layout */}
      <section className="lg:hidden">
        {/* Hero image */}
        <div className="relative h-[46vh] w-full">
          <img src={lot.image} alt={lot.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          {/* chips removed per request (already shown under Taste) */}
          {/* Minimal zoom button */}
          <button
            aria-label="Zoom image"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center justify-center h-9 w-9 bg-black/45 text-white rounded-none border border-white/20 backdrop-blur-sm hover:bg-black/60 transition"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <div className="absolute bottom-5 left-5 right-5">
            <h1 className="font-serif font-black text-3xl drop-shadow">{lot.name}</h1>
            <p className="text-white/85 text-sm mt-1">{lot.meta}</p>
          </div>
        </div>

        {/* Details card */}
        {/* reduce overlap with hero to avoid a cramped look under the nav */}
        <div className="relative -mt-4 px-4 pb-28">
          <div className="bg-cream-100/95 text-forest-900 ring-1 ring-black/10 shadow-xl p-5" style={{ backgroundColor: '#000000cc', color: 'rgba(247, 240, 220, 0.8)' }}>
            <div className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(247, 240, 220, 0.7)' }}>{isNanolot ? 'Nanolot' : 'Microlot'}</div>
            <p className="text-sm mb-5 desc-text" style={{ color: 'rgba(247, 240, 220, 0.8)' }}>
              Carefully prepared and fully traceable lot from Yunguilla Valley. Expect notes of {lot.notes.slice(0,3).join(', ')} and a clean cup.
            </p>

            {/* quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 bg-white/10">
                <div className="text-[10px] uppercase tracking-widest text-cream-200/70">Taste</div>
                <div className="font-semibold text-sm text-cream-100/90">{lot.notes.slice(0,2).join(' & ')}</div>
              </div>
              <div className="p-3 bg-white/10">
                <div className="text-[10px] uppercase tracking-widest text-cream-200/70">Lot</div>
                <div className="font-semibold text-sm text-cream-100/90">{isNanolot ? 'Nanolot' : 'Microlot'} &middot; Single origin</div>
              </div>
              <div className="p-3 bg-white/10 col-span-2">
                <div className="text-[10px] uppercase tracking-widest text-cream-200/70">Pack</div>
                <div className="font-semibold text-sm text-cream-100/90">1 &times; 30kg</div>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              <Link to={isNanolot ? "/green-coffee#g-nanolots" : "/green-coffee#g-microlots"} className="inline-flex items-center gap-2 border border-white/30 text-cream-100 rounded-none px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to {isNanolot ? 'Nanolots' : 'Microlots'}
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
          <Link to="/cart" className="w-full inline-flex items-center justify-center gap-2 border border-white/40 text-cream-100 rounded-none font-semibold px-6 py-3 bg-transparent backdrop-blur-sm hover:bg-white/10 transition-colors">
            <ShoppingCart className="h-5 w-5" /> Check availability
          </Link>
        </div>
      </section>

      {/* Desktop layout (unchanged) */}
      <section className="hidden lg:grid container-width pt-28 pb-20 min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: copy and CTAs */}
        <div>
          <div className="text-cream-300/80 text-sm uppercase tracking-[0.18em] mb-3">{isNanolot ? 'Nanolot' : 'Microlot'}</div>
          <h1 className="font-serif font-black text-4xl md:text-5xl leading-[0.95] mb-3">
            {lot.name}
          </h1>
          <p className="text-cream-200/80 text-lg mb-6">{lot.meta}</p>

          <p className="text-cream-200/80 max-w-xl mb-8 desc-text">
            Carefully prepared and fully traceable lot from Yunguilla Valley. Expect notes of {lot.notes.slice(0,3).join(', ')} and a clean cup.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/cart" className="inline-flex items-center gap-2 border border-white/40 text-white rounded-none font-semibold px-6 py-3 bg-transparent hover:bg-white/10 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              Check availability
            </Link>
            <Link to={isNanolot ? "/green-coffee#g-nanolots" : "/green-coffee#g-microlots"} className="inline-flex items-center gap-2 border border-white/30 text-white rounded-none px-5 py-3 hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Back to {isNanolot ? 'Nanolots' : 'Microlots'}
            </Link>
          </div>

          {/* quick specs */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
            <div className="p-4 bg-white/10">
              <div className="text-xs uppercase tracking-widest text-white/70">Taste</div>
              <div className="font-semibold">{lot.notes.slice(0,2).join(' & ')}</div>
            </div>
            <div className="p-4 bg-white/10">
              <div className="text-xs uppercase tracking-widest text-white/70">Lot</div>
              <div className="font-semibold">{isNanolot ? 'Nanolot' : 'Microlot'} &middot; Single origin</div>
            </div>
            <div className="p-4 bg-white/10 col-span-2 sm:col-span-1">
              <div className="text-xs uppercase tracking-widest text-white/70">Pack</div>
              <div className="font-semibold">1 &times; 30kg</div>
            </div>
          </div>
        </div>

        {/* Right: image on card with decorative rings */}
        <div className="relative w-full max-w-[300px] md:max-w-[340px] lg:max-w-[360px] mx-auto">
          <div className="absolute -inset-4 border border-cream-200/15" />
          <div className="absolute -inset-8 border border-cream-200/10" />

          <div className="relative overflow-hidden shadow-2xl bg-black/30 aspect-[3/4]">
            <img src={lot.image} alt={lot.name} className="absolute inset-0 w-full h-full object-cover" />
            {/* chips removed per request: shown under Taste */}
            {/* Minimal zoom button */}
            <button
              aria-label="Zoom image"
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center justify-center h-9 w-9 bg-black/45 text-white rounded-none border border-white/20 backdrop-blur-sm hover:bg-black/60 transition"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <div className="absolute bottom-5 left-5 right-5">
              <h2 className="font-serif font-extrabold text-2xl drop-shadow">{lot.name}</h2>
              <p className="text-white/85 text-sm mt-1">{lot.meta}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
    {lightboxOpen && (
      <div
        className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setLightboxOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
      >
        <button
          aria-label="Close image preview"
          onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
          className="absolute top-4 right-4 inline-flex items-center justify-center h-10 w-10 bg-black/60 text-white border border-white/20 rounded-none hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={lot.image}
          alt={lot.name}
          className="max-w-[min(1200px,95vw)] max-h-[90vh] object-contain shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
    </>
  );
};

export default MicrolotProduct;
