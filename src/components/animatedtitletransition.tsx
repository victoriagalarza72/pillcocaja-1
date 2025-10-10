import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/**
 * AnimatedTitleTransition
 * - Shows a big HERO title ("Pillcocaja — Journey of the Week") in the hero.
 * - When the Story section enters the viewport, the word "Pillcocaja" rotates
 *   90° and morphs into "STORY", then docks inside the left green rail.
 *
 * How to use:
 * 1) Ensure you have Tailwind set up (already in your project) and install framer-motion:
 *      npm i framer-motion
 * 2) Drop this component in your Home page and pass the refs of your sections.
 * 3) Make sure your Story section has id="story" to attach the observer.
 */

// Small helper to clamp values safely
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function AnimatedTitleTransition() {
  // Track whether the story section is in view
  const storyRef = useRef<HTMLDivElement | null>(null);
  const storyInView = useInView(storyRef, { amount: 0.4, margin: "-10% 0px -10% 0px" });

  // Internal state to lock the animation once we reached Story the first time (optional)
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    if (storyInView) setDocked(true);
  }, [storyInView]);

  /**
   * Layout:
   * - Left green rail (fixed). The animated label will dock here.
   * - Content wrapper with Hero and Story sections.
   */
  return (
    <div className="relative min-h-screen bg-white text-neutral-900">
      {/* Left green rail */}
      <div className="fixed left-0 top-0 h-screen w-20 md:w-24 bg-emerald-800/95 shadow-xl z-30 flex items-center justify-center">
        {/* Docked label target box */}
        <div className="relative h-[60vh] w-full">
          <AnimatePresence>
            {docked && (
              <motion.div
                key="docked-label"
                initial={{ opacity: 0, rotate: 90, y: 40 }}
                animate={{ opacity: 1, rotate: 90, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
              >
                <span className="block font-extrabold tracking-[0.2em] text-white text-[0.95rem] md:text-[1.05rem]">
                  STORY
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content area shifted to account for the rail */}
      <div className="ml-20 md:ml-24">
        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
          {/* Background (optional hero image/video slot) */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />

          {/* Animated giant word: starts here and later flies/docks left */}
          <motion.h1
            aria-label="Pillcocaja — Journey of the Week"
            className="relative z-10 text-[12vw] leading-[0.9] font-extrabold tracking-tight text-neutral-900 px-4 text-center"
            initial={false}
            animate={docked ? "docked" : "hero"}
            variants={{
              hero: {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { type: "spring", stiffness: 160, damping: 24 }
              },
              docked: {
                // Move towards the left rail and shrink
                x: -clamp(typeof window !== "undefined" ? window.innerWidth * 0.32 : 360, 240, 520),
                y: -clamp(typeof window !== "undefined" ? window.innerHeight * 0.26 : 220, 140, 320),
                scale: 0.2,
                rotate: 90,
                opacity: 0, // fade out as it turns into the rail label
                filter: "blur(1px)",
                transition: { type: "spring", stiffness: 200, damping: 30 }
              }
            }}
          >
            <span className="block">Pillcocaja</span>
            <span className="block text-[8vw] md:text-[6vw] font-medium mt-4">
              Journey of the Week
            </span>
          </motion.h1>

          {/* Scroll cue */}
          <div className="absolute bottom-8 inset-x-0 flex justify-center">
            <span className="text-sm text-neutral-500">Scroll ↓</span>
          </div>
        </section>

        {/* STORY SECTION (observer target) */}
        <section
          id="story"
          ref={storyRef}
          className="relative min-h-[120svh] px-6 md:px-10 py-24 md:py-32 bg-white"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-6">Story</h2>
            <p className="text-neutral-700 text-lg leading-relaxed">
              Aquí va el contenido de la historia de la semana: fotos, texto, curiosidades,
              un pequeño timeline, etc. Al entrar a esta sección, el rótulo gigante de
              “Pillcocaja” habrá rotado 90° y se habrá transformado en “STORY” dentro del
              menú lateral verde, creando una transición elegante y memorable.
            </p>

            {/* Example filler content */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-video rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
