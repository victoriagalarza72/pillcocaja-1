import React from 'react';
import {
  Leaf,
  Users,
  Target,
  Droplets,
  TreePine,
  Heart,
  BookOpen,
  Handshake,
  Sprout,
  ShieldCheck,
} from 'lucide-react';
import TopNav from '../components/TopNav';
import SectionRail from '../components/SectionRail';
import { useSectionObserver } from '../components/useSectionObserver';

type Practice = {
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type CommunityPoint = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ImpactMetric = {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Goal = {
  value: string;
  title: string;
  description: string;
};

const RAIL_WIDTH = 260;
const DESKTOP_BREAKPOINT = 1024;

const SECTIONS = [
  { id: 's-hero', title: 'Sustainability' },
  { id: 's-practices', title: 'Practices' },
  { id: 's-community', title: 'Community' },
  { id: 's-impact', title: 'Impact' },
  { id: 's-goals', title: 'Goals' },
] as const;

const PRACTICES: Practice[] = [
  {
    title: 'Agroforestry Systems',
    description: 'Coffee thrives under native shade trees, creating wildlife corridors and capturing more carbon.',
    image: new URL('../assets/images/cafe9.jpg', import.meta.url).href,
    icon: TreePine,
  },
  {
    title: 'Water Conservation',
    description: 'Eco pulpers and closed loop fermentation cut water usage by 80 percent versus traditional methods.',
    image: new URL('../assets/images/cafe10.jpg', import.meta.url).href,
    icon: Droplets,
  },
  {
    title: 'Living Soil',
    description: 'Compost, cover crops, and minimal tillage keep soil biology active and resilient season after season.',
    image: new URL('../assets/images/cafe11.jpg', import.meta.url).href,
    icon: Leaf,
  },
];

const COMMUNITY_POINTS: CommunityPoint[] = [
  {
    title: 'Education Programs',
    description: 'Scholarships and workshops for local youth focused on regenerative agriculture and entrepreneurship.',
    icon: BookOpen,
  },
  {
    title: 'Equitable Partnerships',
    description: 'Profit sharing for farm collaborators and transparent pay for seasonal workers.',
    icon: Handshake,
  },
  {
    title: 'Women-led Leadership',
    description: 'Pillcocaja is stewarded by women across management, cupping, and community initiatives.',
    icon: Heart,
  },
];

const TRANSPARENCY_POINTS = [
  'Harvest gallery',
  'Processing videos',
  'Farmer interviews',
  'Environmental data',
  'Payment receipts',
  'Cupping scores',
  'Shipping timeline',
  'Impact metrics',
];

const IMPACT_METRICS: ImpactMetric[] = [
  { value: '2.5 tons CO2/year', label: 'Carbon sequestered', icon: Leaf },
  { value: '80% less water', label: 'Processing savings', icon: Droplets },
  { value: '95% native', label: 'Biodiversity index', icon: TreePine },
  { value: '15 families', label: 'Local employment', icon: Users },
];

const CERTIFICATIONS = [
  'Rainforest Alliance aligned',
  'Women in Coffee supported',
  'Carbon neutral verified',
  'Water stewardship program',
];

const GOALS: Goal[] = [
  {
    value: '100%',
    title: 'Renewable energy',
    description: 'Transition our dryers, beneficio, and offices to solar and micro hydro.',
  },
  {
    value: '50%',
    title: 'Expanded habitat',
    description: 'Add native tree corridors that increase wildlife presence across the farm.',
  },
  {
    value: '25',
    title: 'New scholarships',
    description: 'Support students from Yunguilla Valley in agronomy and environmental studies.',
  },
];

const Sustainability: React.FC = () => {
  const heroBg = new URL('../assets/images/yunguilla3.png', import.meta.url).href;

  const [viewportWidth, setViewportWidth] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : DESKTOP_BREAKPOINT
  );

  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLargeUp = viewportWidth >= DESKTOP_BREAKPOINT;
  const effectiveRailWidth = isLargeUp ? RAIL_WIDTH : 0;

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false);

  React.useEffect(() => {
    if (!isLargeUp) {
      setScrolledPastHero(false);
      return;
    }
    const node = scrollContainerRef.current;
    if (!node) return;

    const handleScroll = () => {
      const heroEl = document.getElementById('s-hero');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      setScrolledPastHero(rect.bottom <= viewportHeight * 0.65);
    };

    handleScroll();
    node.addEventListener('scroll', handleScroll, { passive: true });
    return () => node.removeEventListener('scroll', handleScroll);
  }, [isLargeUp]);

  const ids = React.useMemo(() => SECTIONS.map((section) => section.id), []);
  const activeId = useSectionObserver(ids, '0px 0px -65% 0px');
  const showRail = Boolean(
    isLargeUp && (scrolledPastHero || (activeId && activeId !== 's-hero'))
  );
  const heroRailOffset = showRail ? effectiveRailWidth : 0;
  const isNavOnLight = ['s-practices', 's-community', 's-goals'].includes(activeId ?? '');
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <main className="relative">
      <TopNav leftOffset={heroRailOffset} onLight={isNavOnLight} />
      <SectionRail
        items={SECTIONS}
        activeId={activeId}
        onClick={scrollTo}
        railWidth={effectiveRailWidth}
        showLabels
        visible={showRail}
      />

      <div
        className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <section
          id="s-hero"
          className="relative h-screen snap-start flex items-center text-white overflow-hidden"
        >
          <img
            src={heroBg}
            alt="Sustainability hero"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover animate-hero-pan will-change-transform"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          {isLargeUp && (
            <div
              className="absolute left-0 top-0 h-full bg-[#6b7145] transition-all duration-500 ease-out"
              style={{ width: showRail ? effectiveRailWidth : 0, opacity: showRail ? 1 : 0 }}
              aria-hidden="true"
            />
          )}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ marginLeft: heroRailOffset }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0">
              <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '54%' }} />
              <span className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '76%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/20" style={{ top: '26%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/15" style={{ top: '68%' }} />
            </div>
            <div className="absolute top-16 left-[20%] h-36 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent" />
            <div className="absolute bottom-24 right-[18%] h-28 w-px bg-gradient-to-t from-white/55 via-white/25 to-transparent rotate-[8deg]" />
            <div className="absolute top-24 right-[24%] h-28 w-28 rounded-full border border-white/18" />
            <div className="absolute bottom-16 left-[26%] h-20 w-20 rounded-full border border-white/12" />
          </div>

          <div className="relative z-20 w-full">
            <div
              className="container-width"
              style={{ paddingLeft: showRail ? effectiveRailWidth + 24 : 0 }}
            >
              <div className="max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Sustainability First
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl text-white/85">
                  Regenerative farming, community uplift, and transparent storytelling guide every decision at Pillcocaja.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button className="btn-primary bg-white text-forest-800 hover:bg-gray-100">
                    Explore practices
                  </button>
                  <button className="btn-secondary border-white text-white hover:bg-white hover:text-cacao-800">
                    View impact metrics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="s-practices"
          className="relative min-h-screen snap-start section-padding bg-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? effectiveRailWidth + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">Farming with Purpose</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Each practice is designed to restore the ecosystem while producing coffees with clarity, sweetness, and longevity.
              </p>
            </div>

            <div className="space-y-16">
              {PRACTICES.map((practice, index) => (
                <div
                  key={practice.title}
                  className={`grid grid-cols-1 gap-12 items-center lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <img
                      src={practice.image}
                      alt={practice.title}
                      className="h-96 w-full object-cover shadow-xl"
                    />
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-100">
                        <practice.icon className="h-6 w-6 text-forest-600" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-forest-900">{practice.title}</h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="s-community"
          className="relative min-h-screen snap-start section-padding bg-cream-50"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? effectiveRailWidth + 24 : 0 }}
          >
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">Community First</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-10">
                  Our success is shared. We invest in programs that protect culture, expand opportunity, and keep families thriving in Yunguilla Valley.
                </p>

                <div className="space-y-6">
                  {COMMUNITY_POINTS.map((point) => (
                    <div key={point.title} className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cacao-500 text-white">
                        <point.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-forest-900 mb-1">{point.title}</h3>
                        <p className="text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-none border border-black/10 bg-white p-8">
                  <h3 className="font-serif text-2xl font-bold text-forest-900 mb-4 text-center">Transparency Hub</h3>
                  <p className="mb-6 text-center text-gray-700">
                    Every bag carries a QR code linking to real time updates from the farm.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    {TRANSPARENCY_POINTS.map((item) => (
                      <div key={item} className="rounded-none bg-cream-100 px-3 py-2 text-center">{item}</div>
                    ))}
                  </div>
                </div>

                <div className="rounded-none border border-black/10 bg-white p-8 text-center">
                  <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">Wellbeing Snapshot</h3>
                  <p className="text-sm text-gray-600">
                    100 percent of seasonal collaborators receive healthcare, maternity support, and safe working conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="s-impact"
          className="relative min-h-screen snap-start section-padding bg-gradient-to-r from-forest-900 to-cacao-700 text-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? effectiveRailWidth + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-6">Measuring Our Impact</h2>
              <p className="text-xl text-white/85 max-w-2xl mx-auto">
                We track environmental and social indicators to ensure our work produces lasting positive results.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.label} className="text-center rounded-none border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
                    <metric.icon className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm text-white/80">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="font-serif text-2xl font-bold mb-4">Certified and Verified</h3>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
                {CERTIFICATIONS.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="s-goals"
          className="relative min-h-screen snap-start section-padding bg-cream-50"
        >
          <div
            className="container-width text-center"
            style={{ paddingLeft: showRail ? effectiveRailWidth + 24 : 0 }}
          >
            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">Our 2030 Goals</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
              We plan ahead with measurable targets that keep us accountable to the land and to our community.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {GOALS.map((goal) => (
                <div key={goal.title} className="card p-8">
                  <div className="text-4xl font-bold text-forest-800 mb-2">{goal.value}</div>
                  <h3 className="font-semibold text-forest-900 mb-3">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Sustainability;















