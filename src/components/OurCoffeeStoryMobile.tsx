import React from "react";
import topImg from "../assets/images/cafe1.jpg";
import illusCafe from "../assets/illustrations/CAFE.svg";

const OurCoffeeStoryMobile: React.FC = () => {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setPage(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="block md:hidden min-h-screen snap-start">
      <div className="w-full">
        <figure className="relative w-full h-[54vh] overflow-hidden">
          <img
            src={topImg}
            alt="Yunguilla Valley"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        </figure>

        {/* Horizontal cards */}
        <div className="-mt-6">
          <div
            ref={scrollerRef}
            className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
          >
            <div className="flex gap-4 w-full px-5">
              {/* Slide 1 */}
              <article className="relative snap-center shrink-0 w-[86vw] max-w-[560px] bg-white shadow-xl border border-black/5 p-12">
                <img
                  src={illusCafe}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
                />
                <header className="relative z-10 mb-3">
                  <span className="inline-block w-1.5 h-6 bg-forest-700 align-middle mr-2" />
                  <span className="uppercase tracking-[0.22em] text-[11px] text-forest-900/70 align-middle">
                    From Yunguilla Valley
                  </span>
                </header>
                <h3 className="relative z-10 font-serif text-2xl font-bold text-forest-900 mb-2">
                  Our Story
                </h3>
                <p className="relative z-10 text-[16px] leading-relaxed text-forest-900/80 desc-text">
                  Pillcocaja is a women-led, family-run project rooted in stewardship. We nurture biodiversity,
                  protect water sources and harvest with care so each lot tells an honest story of place and people.
                </p>
                <div className="relative z-10 mt-4">
                  <a href="/about" className="rounded-none border border-forest-800 text-forest-800 px-4 py-2 text-sm font-semibold">
                    Read more
                  </a>
                </div>
              </article>

              {/* Slide 2 */}
              <article className="relative snap-center shrink-0 w-[86vw] max-w-[560px] bg-white shadow-xl border border-black/5 p-12">
                <img
                  src={illusCafe}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
                />
                <header className="relative z-10 mb-3">
                  <span className="inline-block w-1.5 h-6 bg-forest-700 align-middle mr-2" />
                  <span className="uppercase tracking-[0.22em] text-[11px] text-forest-900/70 align-middle">
                    To The World
                  </span>
                </header>
                <h3 className="relative z-10 font-serif text-2xl font-bold text-forest-900 mb-2">
                  Traceable Microlots
                </h3>
                <p className="relative z-10 text-[16px] leading-relaxed text-forest-900/80 desc-text">
                  Through traceable, carefully prepared microlots, our coffees travel from the valley to roasters
                  around the world. Each bag carries the work of our community � clarity, sweetness and the distinct
                  character of our mountains.
                </p>
              </article>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {[0,1].map(i => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to card ${i+1}`}
                className={`h-1.5 rounded-full transition-all ${page===i? 'w-6 bg-forest-800' : 'w-3 bg-forest-800/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCoffeeStoryMobile;
