// src/components/SeasonalHighlightMobile.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Droplet, Leaf, Timer } from "lucide-react";

import cherries from "../assets/images/cafehoney.png";
import floralIllustration from "../assets/illustrations/cafeflor.svg";

const SeasonalHighlightMobile: React.FC = () => {
  return (
    <section className="block md:hidden relative min-h-screen overflow-hidden bg-[rgb(255,248,225)]">
      <img
        src={floralIllustration}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain opacity-[0.15]"
        style={{ transform: "scaleX(-1)" }}
      />

      <div className="relative z-10 w-full px-6 pt-10 pb-14 flex flex-col items-center">
        <div className="relative w-full">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-64 h-16 rounded-full bg-black/15 blur-2xl" aria-hidden />
          <img
            src={cherries}
            alt="Honey-processed Typica - coffee cherries"
            className="relative mx-auto w-full h-[300px] object-contain"
            loading="lazy"
          />
        </div>

        <div className="mt-6 text-forest-900 text-center">
          <div className="flex items-center gap-3 justify-center mb-3">
            <span className="h-px w-10 bg-forest-900/20" />
            <span className="uppercase tracking-[0.22em] text-[11px] text-forest-900/60">Seasonal Highlight</span>
            <span className="h-px w-10 bg-forest-900/20" />
          </div>

          <h2 className="font-serif text-[28px] leading-tight font-black mb-3">
            New Honey-Processed Typica
          </h2>
          <p className="text-[15px] text-forest-900/80 mb-5 desc-text">
            A bright, fruit-forward Typica from Yunguilla Valley. Honey processing preserves sweetness and layered
            aromatics while maintaining a clean finish.
          </p>

          <ul className="grid grid-cols-1 gap-3 mb-6 text-forest-900/80 text-sm">
            <li className="flex items-center gap-2 justify-center"><Droplet className="h-5 w-5 text-forest-700" /> Honey process</li>
            <li className="flex items-center gap-2 justify-center"><Leaf className="h-5 w-5 text-forest-700" /> Typica variety</li>
            <li className="flex items-center gap-2 justify-center"><Calendar className="h-5 w-5 text-forest-700" /> Harvest: May-Sep</li>
          </ul>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cream-200 ring-1 ring-forest-900/10">
              <Timer className="h-4 w-4 text-forest-700" />
            </div>
            <p className="text-xs text-forest-900/70 desc-text">
              Average drying time <span className="font-semibold text-forest-900">12-18 days</span> under shade.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/green-coffee" className="rounded-none px-4 py-2 text-sm font-semibold text-forest-800 ring-2 ring-forest-800 hover:bg-forest-800 hover:text-white transition-colors w-full sm:w-auto text-center">
              View Specs
            </Link>
            <Link to="/contact" className="rounded-none px-4 py-2 text-sm font-semibold text-forest-800 ring-2 ring-forest-800 hover:bg-forest-800 hover:text-white transition-colors w-full sm:w-auto text-center">
              Request Sample
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalHighlightMobile;
