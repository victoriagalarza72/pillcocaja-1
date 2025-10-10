// src/components/SeasonalHighlight.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Droplet, Leaf, Timer } from "lucide-react";

import illusCafe from "../assets/illustrations/cafeflor.svg";
import cherries from "../assets/images/cafehoney.png";
type Props = {
  leftOffset?: number;
  fullHeight?: boolean;
};

const SeasonalHighlight: React.FC<Props> = ({ leftOffset = 0, fullHeight = true }) => {
  return (
    <section
      className={`relative overflow-hidden ${
        fullHeight ? "min-h-screen flex items-center" : "py-16 md:py-24"
      }`}
    >
      {/* Fondo de color y viñeta */}
      <div className="absolute inset-0 bg-cream-50" />
      {/* Ilustración de fondo */}
      <img
        src={illusCafe}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain opacity-[0.13]"
      />
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6"
        style={{ paddingLeft: leftOffset ? leftOffset + 24 : undefined }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Image left */}
          <figure className="col-span-1 md:col-span-6 relative z-10">
            {/* soft shadow beneath cherries */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-80 h-24 rounded-full bg-black/15 blur-3xl" aria-hidden />
            <img
              src={cherries}
              alt="Honey-processed Typica - coffee cherries"
              className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] object-contain"
              loading="lazy"
            />
          </figure>

          {/* Text right */}
          <div className="col-span-12 md:col-span-6 text-forest-900">
            {/* chapter line */}
            <div className="flex items-center gap-4 mb-3">
              <span className="flex-1 h-px bg-forest-900/20" />
              <span className="uppercase tracking-[0.22em] text-[11px] text-forest-900/60">Seasonal Highlight</span>
              <span className="flex-1 h-px bg-forest-900/20" />
            </div>

            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] leading-tight font-black text-forest-900">
              New Honey-Processed Typica Now Available
            </h2>

            <div className="flex items-center justify-center gap-2 my-3 text-forest-900/30">
              <span className="flex-1 h-px bg-forest-900/20" />
              <span className="text-xs tracking-[0.3em]">?</span>
              <span className="flex-1 h-px bg-forest-900/20" />
            </div>

            <p className="text-base md:text-lg text-forest-900/80 mb-5 max-w-[60ch] desc-text">
              A bright, fruit-forward Typica from Yunguilla Valley. Honey processing preserves sweetness
              and layered aromatics while maintaining a clean finish.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-forest-900/80">
              <li className="flex items-center gap-2"><Droplet className="h-5 w-5 text-forest-700" /> Honey process</li>
              <li className="flex items-center gap-2"><Leaf className="h-5 w-5 text-forest-700" /> Typica variety</li>
              <li className="flex items-center gap-2"><Calendar className="h-5 w-5 text-forest-700" /> Harvest: May?Sep</li>
            </ul>

            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-cream-200 ring-1 ring-forest-900/10">
                <Timer className="h-5 w-5 text-forest-700" />
              </div>
              <p className="text-sm text-forest-900/70 desc-text">
                Average drying time <span className="font-semibold text-forest-900">12?18 days</span> under shade.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/green-coffee" className="rounded-none px-4 py-2.5 text-sm font-semibold text-forest-800 ring-2 ring-forest-800 hover:bg-forest-800 hover:text-white transition-colors">
                View Specs
              </Link>
              <Link to="/contact" className="rounded-none px-4 py-2.5 text-sm font-semibold text-forest-800 ring-2 ring-forest-800 hover:bg-forest-800 hover:text-white transition-colors">
                Request Sample
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalHighlight;
