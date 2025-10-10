import React, { useState } from 'react';
import {
  Mail,
  Bell,
  Package,
  Coffee,
  Star,
  Flame,
  Clock,
  Droplet,
} from 'lucide-react';
import TopNav from '../components/TopNav';
import SectionRail from '../components/SectionRail';
import { useSectionObserver } from '../components/useSectionObserver';

type Product = {
  name: string;
  description: string;
  roast: string;
  notes: string[];
  price: string;
};

type FocusPoint = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: string;
};

type TimelineEntry = {
  quarter: string;
  title: string;
  description: string;
  tone: 'forest' | 'cacao' | 'neutral';
};

const RAIL_WIDTH = 260;

const SECTIONS = [
  { id: 'rc-hero', title: 'Roasted Coffee' },
  { id: 'rc-early', title: 'Early Access' },
  { id: 'rc-products', title: 'Collection' },
  { id: 'rc-experience', title: 'Experience' },
  { id: 'rc-timeline', title: 'Timeline' },
] as const;

const PRODUCTS: Product[] = [
  {
    name: 'Yunguilla Morning Blend',
    description: 'Balanced honey processed Typica with bright sweetness.',
    roast: 'Medium',
    notes: ['Caramel', 'Citrus', 'Smooth'],
    price: '$18.99',
  },
  {
    name: 'Heritage Single Origin',
    description: 'Pure expression of our natural Bourbon lot.',
    roast: 'Medium-dark',
    notes: ['Berry', 'Chocolate', 'Rich'],
    price: '$22.99',
  },
  {
    name: 'Geisha Reserve',
    description: 'Limited release from our high elevation Geisha plants.',
    roast: 'Light',
    notes: ['Floral', 'Tea-like', 'Complex'],
    price: '$45.99',
  },
];

const FOCUS_POINTS: FocusPoint[] = [
  {
    title: 'Small-batch Roasting',
    description: 'Each batch is roasted to order for peak freshness and clarity.',
    icon: Coffee,
    accent: 'bg-cacao-100 text-cacao-600',
  },
  {
    title: 'Responsive Development',
    description: 'We iterate on profiles with cupping feedback from our partners.',
    icon: Flame,
    accent: 'bg-forest-100 text-forest-600',
  },
  {
    title: 'Sustainable Packaging',
    description: 'Compostable bags with one way valves keep flavor locked in.',
    icon: Package,
    accent: 'bg-cream-200 text-cacao-600',
  },
];

const TIMELINE: TimelineEntry[] = [
  {
    quarter: 'Q1 2025',
    title: 'Roastery Setup',
    description: 'Finalizing equipment and roasting space to scale small-batch production.',
    tone: 'forest',
  },
  {
    quarter: 'Q2 2025',
    title: 'Profile Development',
    description: 'Collaborating with master roasters to define target curves for each lot.',
    tone: 'cacao',
  },
  {
    quarter: 'Q3 2025',
    title: 'Beta Launch',
    description: 'Limited release to early access subscribers for feedback and refinement.',
    tone: 'neutral',
  },
  {
    quarter: 'Q4 2025',
    title: 'Public Launch',
    description: 'Expanded availability with online ordering and subscription options.',
    tone: 'neutral',
  },
];

const RoastedCoffee: React.FC = () => {
  const heroBg = new URL('../assets/images/cafe6.png', import.meta.url).href;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const ids = React.useMemo(() => SECTIONS.map((section) => section.id), []);
  const activeId = useSectionObserver(ids, '0px 0px -65% 0px');
  const showRail = Boolean(activeId && activeId !== 'rc-hero');
  const isNavOnLight = ['rc-early', 'rc-products'].includes(activeId ?? '');
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSubscribe = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubscribed(true);
      setEmail('');
    },
    []
  );

  return (
    <main className="relative">
      <TopNav leftOffset={showRail ? RAIL_WIDTH : 0} onLight={isNavOnLight} />
      <SectionRail
        items={SECTIONS}
        activeId={activeId}
        onClick={scrollTo}
        railWidth={RAIL_WIDTH}
        showLabels
        visible={showRail}
      />

      <div
        className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <section
          id="rc-hero"
          className="relative h-screen snap-start flex items-center text-white overflow-hidden"
        >
          <img
            src={heroBg}
            alt="Roasted coffee hero"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover animate-hero-pan will-change-transform"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ marginLeft: showRail ? RAIL_WIDTH : 0 }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0">
              <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '48%' }} />
              <span className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '70%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/20" style={{ top: '34%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/15" style={{ top: '62%' }} />
            </div>
            <div className="absolute top-16 left-[18%] h-40 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent" />
            <div className="absolute bottom-24 right-[22%] h-28 w-px bg-gradient-to-t from-white/55 via-white/25 to-transparent rotate-[12deg]" />
            <div className="absolute top-24 right-[20%] h-32 w-32 rounded-full border border-white/18" />
            <div className="absolute bottom-16 left-[24%] h-24 w-24 rounded-full border border-white/12" />
          </div>

          <div className="relative z-20 w-full">
            <div
              className="container-width"
              style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
            >
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm mb-6">
                  <Coffee className="mr-2 h-4 w-4" />
                  Coming soon
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Roasted Coffee Collection
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl text-white/85">
                  Our roasted line is almost here. Be first in line for coffees that translate the energy of Yunguilla Valley straight to your bar.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button className="btn-primary bg-white text-cacao-800 hover:bg-gray-100">
                    Join early access
                  </button>
                  <button className="btn-secondary border-white text-white hover:bg-white hover:text-cacao-800">
                    View timeline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="rc-early"
          className="relative min-h-screen snap-start section-padding bg-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <Bell className="mx-auto mb-6 h-16 w-16 text-cacao-600" />
              <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">Get Early Access</h2>
              <p className="text-lg text-gray-700 mb-8">
                Subscribe for launch updates. Early supporters receive limited beta drops, cupping invites, and special release pricing.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 rounded-none border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cacao-500"
                  />
                  <button type="submit" className="btn-primary flex items-center justify-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Notify me
                  </button>
                </form>
              ) : (
                <div className="mx-auto max-w-md rounded-none border border-green-200 bg-green-50 p-6">
                  <div className="mb-2 text-green-600">
                    <Mail className="mx-auto h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-green-800">You are on the list!</h3>
                  <p className="text-sm text-green-700">We will email you as soon as the first roasted batches are available.</p>
                </div>
              )}

              <div className="mt-8 text-sm text-gray-600">
                <strong>1,247</strong> coffee lovers already signed up
              </div>
            </div>
          </div>
        </section>

        <section
          id="rc-products"
          className="relative min-h-screen snap-start section-padding bg-cream-50"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">What to Expect</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Preview the first lots we will roast. Each profile keeps the origin character intact while dialing in sweetness and texture.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((product) => (
                <article key={product.name} className="card relative overflow-hidden p-6">
                  <div className="absolute right-4 top-4 rounded-none bg-cacao-100 px-2 py-1 text-xs font-semibold text-cacao-800">
                    Coming soon
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">{product.name}</h3>
                  <p className="text-sm uppercase tracking-[0.3em] text-cacao-600 mb-4">{product.roast}</p>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-forest-700">
                    {product.notes.map((note) => (
                      <span key={note} className="rounded-none border border-forest-200 px-3 py-1 text-[11px]">
                        {note}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Expected price {product.price}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="rc-experience"
          className="relative min-h-screen snap-start section-padding bg-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">The Pillcocaja Experience</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                From roast curves to packaging, every touch is crafted for consistency, clarity, and storytelling at your bar.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {FOCUS_POINTS.map((point) => (
                <div key={point.title} className="text-center">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${point.accent}`}>
                    <point.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
              {[ 
                { value: '12 hrs', label: 'Degassing before shipping', icon: Clock },
                { value: '48 hrs', label: 'Sample roast turnaround', icon: Flame },
                { value: '3 profiles', label: 'Launch day offerings', icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="rounded-none border border-black/10 bg-cream-100 p-6">
                  <stat.icon className="mx-auto mb-3 h-8 w-8 text-cacao-600" />
                  <div className="text-2xl font-bold text-forest-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="rc-timeline"
          className="relative min-h-screen snap-start section-padding bg-gradient-to-r from-forest-800 to-cacao-700 text-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-6">Launch Timeline</h2>
              <p className="text-xl text-white/85 max-w-2xl mx-auto">
                Track our milestones as we prepare to ship the first roasted batches. We share progress and invite feedback at every stage.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-8">
              {TIMELINE.map((entry) => {
                const toneClass = entry.tone === 'forest' ? 'bg-forest-500' : entry.tone === 'cacao' ? 'bg-cacao-500' : 'bg-white/40';
                return (
                  <div key={entry.quarter} className="flex items-start gap-4">
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${toneClass}`}>
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{entry.quarter} - {entry.title}</h3>
                      <p className="text-sm text-white/85">{entry.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 rounded-none border border-white/15 bg-white/10 p-8 text-center">
              <h3 className="font-serif text-2xl font-bold mb-3 text-white">Want samples sooner?</h3>
              <p className="text-white/80 mb-6">
                Join our pilot roasting group for sneak peeks at profiles, shipping tests, and direct feedback sessions with our team.
              </p>
              <button className="btn-primary bg-white text-forest-800 hover:bg-gray-100">
                Request pilot access
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RoastedCoffee;



