// src/components/OurCoffeeSection.tsx
import React, { useEffect, useRef } from "react";
import illusMountain from "../assets/illustrations/montana.svg";
import illusCafe from "../assets/illustrations/CAFE.svg";

import topImg from "../assets/images/cafe1.jpg";
import imgA from "../assets/images/cafe9.jpg";
import imgB from "../assets/images/cafe12.jpg";
import imgC from "../assets/images/cafe10.jpg";

type Props = {
  fullHeight?: boolean;
  leftOffset?: number;
};

const OurCoffeeSection: React.FC<Props> = ({
  fullHeight = true,
  leftOffset = 0,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll("[data-reveal]")) as HTMLElement[];

    let scrollRoot: Element | null = root.parentElement;
    while (scrollRoot) {
      const style = getComputedStyle(scrollRoot as HTMLElement);
      if (/(auto|scroll|hidden)/.test(style.overflowY)) break;
      scrollRoot = scrollRoot.parentElement;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.setAttribute("data-reveal", "shown");
          } else {
            el.removeAttribute("data-reveal");
          }
        });
      },
      { threshold: 0.2, root: scrollRoot, rootMargin: "0px 0px -5% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sectionClass = fullHeight
    ? "relative h-screen overflow-hidden bg-cream-50"
    : "relative overflow-hidden bg-cream-50 py-16 md:py-20";

  const innerClass = fullHeight
    ? "relative h-full px-4 md:px-6 py-6"
    : "relative px-4 md:px-6 py-12 md:py-16";

  const gridClass = fullHeight
    ? "grid h-full grid-cols-12 md:[&>*]:rounded-none"
    : "grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-0 md:[&>*]:rounded-none";

  const heroFigureClass = [
    "reveal col-span-full md:col-span-7 md:row-start-2 md:row-span-3 relative overflow-hidden rounded",
  ];
  if (!fullHeight) heroFigureClass.push("min-h-[260px]");

  const detailFigureClass = [
    "reveal col-span-full md:col-span-5 md:col-start-8 md:row-start-4 md:row-span-1 overflow-hidden rounded",
  ];
  if (!fullHeight) detailFigureClass.push("min-h-[200px]");

  const portraitFigureClass = [
    "reveal col-span-full md:col-span-6 md:row-start-5 md:row-span-3 overflow-hidden rounded",
  ];
  if (!fullHeight) portraitFigureClass.push("min-h-[220px]");

  const wildlifeFigureClass = [
    "reveal col-span-full md:col-span-4 md:col-start-7 md:row-start-7 md:row-span-1 overflow-hidden rounded",
  ];
  if (!fullHeight) wildlifeFigureClass.push("min-h-[200px]");

  const tallFigureClass = [
    "reveal col-span-full md:col-span-2 md:col-start-11 md:row-start-5 md:row-span-3 overflow-hidden rounded",
  ];
  if (!fullHeight) tallFigureClass.push("min-h-[220px]");

  return (
    <section className={sectionClass}>
      <div
        className={innerClass}
        ref={rootRef}
        style={{ paddingLeft: leftOffset ? leftOffset + 24 : undefined }}
      >
        <div className={gridClass}>
          <figure
            data-reveal
            className={heroFigureClass.join(" ")}
            style={{ transitionDelay: "0ms" }}
          >
            <img
              src={topImg}
              alt="Valley / video cover"
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20" />
            <button 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-5 border-2 border-white/90 text-white rounded backdrop-blur-sm bg-white/10 hover:bg-white/20 transition"
              aria-label="Play video"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21 5,3" />
              </svg>
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-5 text-[10px] tracking-[0.35em] text-white/85">
              PLAY VIDEO
            </span>
          </figure>

          <article
            data-reveal
            className="reveal col-span-full md:col-span-5 md:col-start-8 md:row-start-2 md:row-span-2 bg-transparent shadow-sm border border-black/5 p-6 md:p-7 relative overflow-hidden"
            style={{ transitionDelay: "150ms" }}
          >
            <img
              src={illusCafe}
              alt=""
              aria-hidden
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain opacity-15"
            />
            <h3 className="uppercase tracking-[0.25em] text-[11px] text-forest-900/90 mb-2">
              FROM YUNGUILLA VALLEY
            </h3>
            <p className="text-sm leading-relaxed text-forest-900/80 desc-text">
              From Yunguilla Valley to the World - Pillcocaja is a women-led, family-run project rooted in stewardship.
              We nurture biodiversity, protect water sources and harvest with care so each lot tells an honest story of
              place and people.
            </p>
            <div className="mt-4 flex gap-6 text-[12px] text-forest-900/60 flex-wrap md:flex-nowrap">
              <button className="hover:text-forest-900">Read more</button>
              <button className="hover:text-forest-900">Go to top</button>
              <button className="hover:text-forest-900">Share</button>
            </div>
          </article>

          <figure
            data-reveal
            className={detailFigureClass.join(" ")}
            style={{ transitionDelay: "300ms" }}
          >
            <img
              src={imgC}
              alt="Detail"
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
            />
          </figure>

          <figure
            data-reveal
            className={portraitFigureClass.join(" ")}
            style={{ transitionDelay: "450ms" }}
          >
            <img
              src={imgA}
              alt="Portrait / Origin"
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
            />
          </figure>

          <article
            data-reveal
            className="reveal col-span-full md:col-span-4 md:col-start-7 md:row-start-5 md:row-span-2 bg-transparent shadow-sm border border-black/5 p-6 md:p-7 relative overflow-hidden"
            style={{ transitionDelay: "600ms" }}
          >
            <img
              src={illusMountain}
              alt=""
              aria-hidden
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain opacity-15"
            />
            <h4 className="uppercase tracking-[0.35em] text-[11px] text-forest-900/90 mb-3">
              TO THE WORLD
            </h4>
            <p className="text-sm leading-relaxed text-forest-900/80 desc-text">
              Through traceable, carefully prepared microlots, our coffees travel from the valley to roasters around the
              world. Each bag carries the work of our community-clarity, sweetness and the distinct character of our
              mountains.
            </p>
          </article>

          <figure
            data-reveal
            className={wildlifeFigureClass.join(" ")}
            style={{ transitionDelay: "750ms" }}
          >
            <img
              src={imgC}
              alt="Wildlife"
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
            />
          </figure>

          <figure
            data-reveal
            className={tallFigureClass.join(" ")}
            style={{ transitionDelay: "900ms" }}
          >
            <img
              src={imgB}
              alt="Produce"
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default OurCoffeeSection;
