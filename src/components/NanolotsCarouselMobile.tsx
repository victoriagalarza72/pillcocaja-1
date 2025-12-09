// src/components/NanolotsCarouselMobile.tsx
import React, { useCallback, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import type { Microlot } from '../data/microlots';

type Props = {
  nanolots: Microlot[];
};

const NanolotsCarouselMobile: React.FC<Props> = ({ nanolots }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(nanolots.length / 2));
  const [dragStartX, setDragStartX] = useState(0);
  const [dragX, setDragX] = useState(0);

  const total = nanolots.length;

  const goTo = useCallback((idx: number) => {
    setActiveIndex((idx + total) % total);
  }, [total]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragStartX(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragStartX) return;
    const currentX = e.touches[0].clientX;
    setDragX(currentX - dragStartX);
  };
  const onTouchEnd = () => {
    const threshold = 50;
    if (dragX < -threshold) {
      goTo(activeIndex + 1);
    } else if (dragX > threshold) {
      goTo(activeIndex - 1);
    }
    setDragStartX(0);
    setDragX(0);
  };

  // Layout constants for full-bleed slides
  const CARD_W_VW = 100; // card width in vw (full width)
  const GAP_REM = 0;     // no gap between slides
  const LEFT_OFFSET_VW = 0; // no peek offset
  const trackStyle = useMemo(() => ({
    transform: `translateX(calc(-${activeIndex} * ${CARD_W_VW}vw - ${activeIndex} * ${GAP_REM}rem + ${LEFT_OFFSET_VW}vw))`,
    transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)'
  }), [activeIndex]);

  const active = nanolots[activeIndex];

  return (
    <div className="md:hidden w-full h-screen overflow-hidden flex flex-col bg-black">
      {/* Top info area (light, editorial style) */}
      <div className="h-[34vh] px-6 pt-8 pb-20 flex flex-col justify-end bg-[#0c0c0c] text-[#dad7bd]">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#dad7bd]/80">
          <span>Nanolots</span>
          <span>{`${activeIndex + 1}`.padStart(2,'0')}/{`${total}`.padStart(2,'0')}</span>
        </div>
        <h3 className="font-serif text-[28px] leading-[1.05] sm:text-3xl font-black mt-3 text-[#dad7bd]">
          {active.name}
        </h3>
        <p className="text-[#dad7bd]/85 text-sm mt-2">{active.meta}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {active.notes.slice(0,3).map((n) => (
            <span key={n} className="text-[10px] uppercase tracking-widest font-semibold bg-[#dad7bd1a] text-[#dad7bd] px-2 py-0.5">
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom carousel area (full-bleed media) */}
      <div className="relative h-[66vh] w-full">
        <div
          className="absolute inset-0 flex items-center gap-0"
          style={trackStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {nanolots.map((lot, index) => {
            const isActive = index === activeIndex;
            const near = Math.abs(activeIndex - index) === 1 || (activeIndex === 0 && index === total - 1) || (activeIndex === total - 1 && index === 0);
            return (
              <div
                key={lot.id}
                className={`relative shrink-0 w-screen h-[66vh] overflow-hidden transition-all duration-500 ease-out will-change-transform ${isActive ? 'scale-100 z-10' : 'scale-95 brightness-75 blur-[1px]'}`}
                onClick={() => !isActive && goTo(index)}
                aria-hidden={!isActive && !near}
              >
                <img src={lot.image} alt={lot.name} className="absolute inset-0 w-full h-full object-cover" loading={isActive ? 'eager' : 'lazy'} />
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Dots and CTA overlayed above bottom */}
        <div className="absolute left-0 right-0 bottom-4 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2">
            {nanolots.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${activeIndex === i ? 'w-8 bg-white' : 'w-3 bg-white/50'}`}
              />
            ))}
          </div>
          <a
            href={active.specUrl}
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-black/60 backdrop-blur-sm border border-white/10"
            aria-label={`View details for ${active.name}`}
          >
            <Download className="h-4 w-4 mr-2" /> View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default NanolotsCarouselMobile;
