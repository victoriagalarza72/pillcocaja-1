// src/components/MicrolotsCarouselMobile.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { Download } from 'lucide-react';

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
  color: string;
};

type Props = {
  microlots: Microlot[];
};

const MicrolotsCarouselMobile: React.FC<Props> = ({ microlots }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(microlots.length / 2));
  const [dragStartX, setDragStartX] = useState(0);
  const [dragX, setDragX] = useState(0);

  const totalItems = microlots.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + totalItems) % totalItems);
  }, [totalItems]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartX === 0) return;
    const currentX = e.touches[0].clientX;
    setDragX(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    const threshold = 50; // Swipe threshold
    if (dragX < -threshold) {
      goTo(activeIndex + 1);
    } else if (dragX > threshold) {
      goTo(activeIndex - 1);
    }
    setDragStartX(0);
    setDragX(0);
  };

  const cardContainerStyle = useMemo(() => ({
    transform: `translateX(calc(-${activeIndex * 70}vw - ${activeIndex * 1}rem + 10vw))`,
    transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  }), [activeIndex]);

  return (
    <div className="md:hidden w-full flex flex-col items-center px-4">
      <div
        className="relative w-[90vw] aspect-[4/5]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute top-0 left-0 h-full flex items-center gap-4"
          style={cardContainerStyle}
        >
          {microlots.map((lot, index) => {
            const isActive = index === activeIndex;
            const isSideCard = Math.abs(activeIndex - index) === 1 || (activeIndex === 0 && index === totalItems - 1) || (activeIndex === totalItems - 1 && index === 0);

            return (
              <div
                key={lot.id}
                className={`relative shrink-0 w-[70vw] aspect-[3/4] overflow-hidden transition-all duration-500 ease-out will-change-transform
                  ${isActive ? 'scale-105 shadow-2xl z-10' : 'scale-92 brightness-75 blur-[1px]'}
                `}
                onClick={() => !isActive && goTo(index)}
                aria-hidden={!isActive && !isSideCard}
              >
                <img
                  src={lot.image}
                  alt={lot.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={isActive ? 'eager' : 'lazy'}
                />

                {/* Overlay for active card */}
                {isActive && (
                  <>
                    {/* Gradiente combinado para legibilidad arriba y abajo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                    <div className="absolute inset-0 p-5 flex flex-col justify-between text-white text-center">
                      {/* Top: Flavor/Roasting notes removed */}
                      <div />

                      {/* Bottom: Info & CTA */}
                      <div>
                        <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow">
                          {lot.name}
                        </h3>
                        <p className="text-white/80 text-xs mt-1">
                          {lot.meta ? lot.meta : `${lot.variety} · ${lot.process} · ${lot.altitude}`}
                        </p> 
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {microlots.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300
              ${activeIndex === index ? 'w-6 bg-forest-800' : 'w-2 bg-forest-800/40'}
            `}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-6 w-full max-w-xs">
        <a
          href={microlots[activeIndex].specUrl}
          className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-50/50"
          style={{ 
            backgroundColor: `var(--color-${microlots[activeIndex].color})`,
            borderColor: `var(--color-${microlots[activeIndex].color})`
          }}
          aria-label={`Download spec sheet for ${microlots[activeIndex].name}`}
        >
          <Download className="h-4 w-4 mr-2" />
          View Details
        </a>
      </div>
    </div>
  );
};

export default MicrolotsCarouselMobile;
