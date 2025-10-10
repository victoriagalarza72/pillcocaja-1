// src/components/MobileOfferingsCarousel.tsx
import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Green Coffee",
    img: "src/assets/images/cafe3.jpg",
    to: "/green-coffee",
    desc: "Premium microlots with full traceability.",
  },
  {
    title: "Direct Trade",
    img: "src/assets/images/cafe4.jpg",
    to: "/for-roasters",
    desc: "Transparent partnerships with our family farm.",
  },
  {
    title: "Roasted Coffee",
    img: "src/assets/images/cafe5.jpg",
    to: "/roasted-coffee",
    desc: "Our roasted line is coming soon.",
  },
];

const MobileOfferingsCarousel: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== page) setPage(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [page]);

  const goTo = (i: number) => {
    const el = ref.current; if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="block md:hidden min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-center bg-cover opacity-60" style={{ backgroundImage: 'url("src/assets/images/cafe7.png")' }} aria-hidden />
      <div className="relative h-full flex flex-col">
        <div className="px-6 pt-8">
          <p className="uppercase tracking-[0.18em] text-xs text-white/80">Our Offerings</p>
        </div>
        <div ref={ref} className="mt-3 flex-1 overflow-x-auto snap-x snap-mandatory no-scrollbar">
          <div className="flex w-full px-5 gap-5">
            {cards.map((c, i) => (
              <article key={c.title} className="relative snap-center shrink-0 w-[86vw] max-w-[440px] h-[68vh] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
                <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-2xl font-bold mb-1 drop-shadow-sm">{c.title}</h3>
                  <p className="text-white/85 text-sm leading-relaxed">{c.desc}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4">
                  <Link
                    to={c.to}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-forest-800 font-semibold shadow-lg"
                  >
                    {c.title === 'Roasted Coffee' ? 'Coming Soon' : 'Explore'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="relative pb-6 flex items-center justify-center gap-2">
          {cards.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i+1}`} className={`h-1.5 rounded-full transition-all ${page===i ? 'w-6 bg-white' : 'w-3 bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileOfferingsCarousel;
