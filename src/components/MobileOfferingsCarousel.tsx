// src/components/MobileOfferingsCarousel.tsx
import React from "react";
import { Link } from "react-router-dom";

const assetImg = (file: string) =>
  new URL(`../assets/images/${file}`, import.meta.url).href;

const cards = [
  {
    title: "Green Coffee",
    img: assetImg("micro7.png"),
    to: "/green-coffee",
    desc: "Premium microlots and nanolots with full traceability.",
  },
  {
    title: "Direct Trade",
    img: assetImg("cafefondo.jpeg"),
    to: "/farm",
    desc: "Transparent partnerships with our family farm.",
  },
  {
    title: "Roasted Coffee",
    img: assetImg("roastedcoffee.jpeg"),
    to: "/contact",
    desc: "Our roasted line is coming soon.",
  },
];

const MobileOfferingsCarousel: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || el.children.length === 0 || el.children[0].children.length === 0) return;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const containerCenter = el.clientWidth / 2;
      
      let closestCardIndex = 0;
      let smallestDistance = Infinity;

      const cardElements = el.children[0].children;
      for (let i = 0; i < cardElements.length; i++) {
        const card = cardElements[i] as HTMLElement;
        const cardCenter = card.offsetLeft - scrollLeft + card.clientWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestCardIndex = i;
        }
      }

      if (closestCardIndex !== page) {
        setPage(closestCardIndex);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [page]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el || el.children.length === 0 || el.children[0].children.length === 0) return;
    
    const cardElements = el.children[0].children;
    if (cardElements[i]) {
      const card = cardElements[i] as HTMLElement;
      const containerWidth = el.clientWidth;
      const cardWidth = card.clientWidth;
      const cardLeft = card.offsetLeft;
      
      const scrollTo = cardLeft - (containerWidth - cardWidth) / 2;
      
      el.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex flex-col">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-60"
        style={{ backgroundImage: `url("${assetImg("cafe7.png")}")` }}
        aria-hidden
      />
      <div className="relative h-full flex flex-col flex-1">
        <div className="px-6 pt-24 pb-8 text-center">
          <p className="uppercase tracking-[0.18em] text-sm text-white/80">
            Our Offerings
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mt-2">
            We Grow & Trade Coffee with Care
          </h2>
        </div>
        
        <div ref={ref} className="flex-1 overflow-x-auto snap-x snap-mandatory no-scrollbar flex items-center scroll-px-6 px-6">
          <div className="flex gap-4">
            {cards.map((c) => (
              <article key={c.title} className="relative snap-center shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] max-w-[420px] h-[65vh] rounded-none overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
                <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                
                <div className="absolute top-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold drop-shadow-sm">{c.title}</h3>
                  <p className="text-white/85 text-sm md:text-base mt-2 max-w-xs">{c.desc}</p>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <Link
                    to={c.to}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-none bg-white text-forest-800 font-semibold shadow-lg hover:bg-gray-200 transition-colors"
                  >
                    {c.title === 'Roasted Coffee' ? 'Coming Soon' : 'Explore'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative py-6 flex items-center justify-center gap-2">
          {cards.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i+1}`} className={`h-1.5 rounded-full transition-all ${page === i ? 'w-6 bg-white' : 'w-3 bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileOfferingsCarousel;
