// src/components/NanolotsShowcase.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { nanolots } from "../data/nanolots";

type Props = {
  fullHeight?: boolean;
  leftOffset?: number;
};

const cardsData = [
  {
    title: "Typica Anaerobic Washed",
    img: "src/assets/images/cafe3.jpg",
    to: "/green-coffee",
    desc: "374.98 – Export Coffee",
  },
  {
    title: "Typica Washed & Cherry-Fermented",
    img: "src/assets/images/cafe4.jpg",
    to: "/farm",
    desc: "64.68 – Export Coffee",
  },
  {
    title: "Typica Washed (Cherry)",
    img: "src/assets/images/cafe5.jpg",
    to: "/roasted-coffee",
    desc: "86.70 – Export Coffee",
  },
  {
    title: "Ethiopian Anaerobic Washed",
    img: "src/assets/images/cafe5.jpg",
    to: "/green-coffee",
    desc: "99.45 – Export Coffee",
  },
  {
    title: "Pacamara Anaerobic Washed",
    img: "src/assets/images/cafe3.jpg",
    to: "/green-coffee",
    desc: "76.60 – Export Coffee",
  },
];
// keep legacy data referenced to avoid unused variable warnings
void cardsData;

const cards = nanolots.map(n => ({ title: n.name, img: n.image, to: n.specUrl, desc: n.meta }));

export default function NanolotsShowcase({ fullHeight = true, leftOffset = 0 }: Props) {
  const [active, setActive] = useState(0);
  const clamp = useCallback((n: number) => (n + cards.length) % cards.length, []);
  const goPrev = useCallback(() => setActive((i) => clamp(i - 1)), [clamp]);
  const goNext = useCallback(() => setActive((i) => clamp(i + 1)), [clamp]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayIdRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    let scrollRoot: Element | null = root.parentElement;
    while (scrollRoot) {
      const style = getComputedStyle(scrollRoot as HTMLElement);
      if (/(auto|scroll|hidden)/.test(style.overflowY)) break;
      scrollRoot = scrollRoot.parentElement;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const isIn = entries.some((e) => e.isIntersecting);
        const interval = 310;
        const duration = 1500;
        const steps = Math.max(1, Math.floor(duration / interval));
        if (isIn) {
          if (autoplayIdRef.current == null) {
            stepRef.current = 0;
            autoplayIdRef.current = window.setInterval(() => {
              goNext();
              stepRef.current++;
              if (stepRef.current >= steps && autoplayIdRef.current != null) {
                clearInterval(autoplayIdRef.current);
                autoplayIdRef.current = null;
              }
            }, interval);
          }
        } else if (autoplayIdRef.current != null) {
          clearInterval(autoplayIdRef.current);
          autoplayIdRef.current = null;
        }
      },
      { root: scrollRoot, threshold: 0.55 }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      if (autoplayIdRef.current != null) {
        clearInterval(autoplayIdRef.current);
        autoplayIdRef.current = null;
      }
    };
  }, [goNext]);

  const sectionClasses = useMemo(
    () => `relative overflow-hidden ${fullHeight ? 'min-h-screen flex items-center' : 'py-16 md:py-24'}`,
    [fullHeight]
  );

  return (
    <section ref={sectionRef} className={sectionClasses}>
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: 'url("src/assets/images/cafe7.png")' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-t from-black/20 to-transparent" />

      <div ref={wrapperRef} className="relative w-full max-w-7xl mx-auto px-6" style={{ paddingLeft: leftOffset ? leftOffset + 24 : undefined }}>
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
          <div className="col-span-12 text-center mb-4">
            <p className="text-white/90 text-xs md:text-sm">
              Explore our nanolots, build direct trade partnerships, and stay tuned for our roasted line.
            </p>
          </div>
          <div className="col-span-12">
            <div className="relative h-[360px] sm:h-[420px] md:h-[520px]">
              <div className="relative h-full w-full [perspective:1200px]">
                {cards.map((c, i) => {
                  const offset = i - active;
                  const dir = (offset + cards.length + Math.floor(cards.length / 2)) % cards.length - Math.floor(cards.length / 2);
                  const baseX = 180;
                  const rot = 14;
                  const translateX = dir * baseX;
                  const rotateY = dir * -rot;
                  const scale = Math.max(0.8, 1 - Math.abs(dir) * 0.1);
                  const zIndex = 50 - Math.abs(dir);
                  return (
                    <Link
                      key={c.title}
                      to={c.to}
                      aria-current={i === active ? 'true' : undefined}
                      onClick={(e) => {
                        if (i !== active) { e.preventDefault(); setActive(i); }
                      }}
                      className="absolute left-1/2 top-1/2 block touch-pan-y"
                      style={{ zIndex, transform: `translate3d(-50%, -50%, 0) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`, transition: 'transform 700ms cubic-bezier(.2,.8,.2,1), filter 400ms', willChange: 'transform' }}
                    >
                      <article className="relative w-[200px] sm:w-[240px] md:w-[300px] h-[300px] sm:h-[360px] md:h-[440px] overflow-hidden ring-1 ring-white/15 shadow-2xl bg-white/10 backdrop-blur-sm">
                        <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" style={{ filter: i === active ? 'none' : 'grayscale(12%) contrast(1.05)' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 p-5 text-white">
                          <h3 className="font-serif text-2xl font-bold drop-shadow">{c.title}</h3>
                          <p className="mt-1 text-white/85 text-sm leading-relaxed font-mono">{c.desc}</p>
                          <span className="mt-3 inline-block text-sm font-semibold opacity-90">{c.title === 'Roasted Coffee' ? 'Coming Soon' : 'See more →'}</span>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
              <button onClick={goPrev} aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-2 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={goNext} aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-2 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-2">
                {cards.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} aria-label={`Go to slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-8 bg-white' : 'w-3 bg-white/50'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
