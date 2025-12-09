// src/components/MicrolotsCarousel.tsx
import React, { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

type Microlot = {
  id: number;
  name: string;
  meta?: string;
  variety: string;
  process: string;
  altitude: string;
  notes: string[];
  image: string;
  specUrl: string;
  color: string; // used by mobile CTA, kept for parity
};

type Props = {
  microlots: Microlot[];
};

const MicrolotsCarousel: React.FC<Props> = ({ microlots }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const hasOverflow = useMemo(() => microlots.length > 0, [microlots.length]);

  const scrollByAmount = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.max(280, Math.round(el.clientWidth * 0.8));
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <div className="relative hidden md:block">
      {/* Gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream-50/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream-50/80 to-transparent" />

      {/* Controls */}
      {hasOverflow && (
        <>
          <button
            type="button"
            aria-label="Scroll microlots left"
            onClick={() => scrollByAmount(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
          >
            <ChevronLeft className="h-5 w-5 text-forest-800" />
          </button>
          <button
            type="button"
            aria-label="Scroll microlots right"
            onClick={() => scrollByAmount(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
          >
            <ChevronRight className="h-5 w-5 text-forest-800" />
          </button>
        </>
      )}

      <div ref={scrollerRef} className="overflow-x-auto no-scrollbar px-6">
        <div className="flex gap-4 md:gap-6 py-2 pr-6 pl-0 md:pl-0 snap-x snap-mandatory">
          {microlots.map((lot) => (
            <a
              key={lot.id}
              href={lot.specUrl}
              className={`poster poster-tight tint-forest snap-start shrink-0 w-[240px] md:w-[280px] group`}
              aria-label={`${lot.name} spec sheet`}
            >
              <div className="poster-aspect-3x4">
                <img src={lot.image} alt={lot.name} className="poster-media" loading="lazy" />
                <div className="poster-dim" />
                <div className="poster-top">{lot.notes.join(' · ')}</div>
                <div className="poster-bottom">
                  <h3 className="poster-title">{lot.name}</h3>
                  <p className="poster-meta">{lot.meta ? lot.meta : `${lot.variety} · ${lot.process} · ${lot.altitude}`}</p>
                </div>
                <div className="poster-hover group-hover:opacity-100">
                  <div className="only-cta">
                    <span className="poster-cta poster-cta--white">
                      <Download className="h-4 w-4 mr-2" />
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MicrolotsCarousel;
