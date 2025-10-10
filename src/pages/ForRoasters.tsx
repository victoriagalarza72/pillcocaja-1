import React from 'react';
import {
  Users,
  Target,
  Download,
  MessageSquare,
  Calendar,
  Award,
  ClipboardCheck,
  FileCheck2,
  Plane,
  Mail,
  Video,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import SectionRail from '../components/SectionRail';
import TopNav from '../components/TopNav';
import { useSectionObserver } from '../components/useSectionObserver';
import hoja1 from '../assets/illustrations/hoja1.svg';
import hoja2 from '../assets/illustrations/hoja2.svg';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const RAIL_WIDTH = 260;

const SECTIONS = [
  { id: 'r-hero', title: 'For Roasters' },
  { id: 'r-benefits', title: 'Why Pillcocaja' },
  { id: 'r-profiles', title: 'Roasting Notes' },
  { id: 'r-logistics', title: 'Logistics' },
  { id: 'r-marketing', title: 'Marketing Kit' },
  { id: 'r-contact', title: 'Connect' },
] as const;

const BENEFITS: Array<{ icon: IconType; title: string; description: string }> = [
  {
    icon: Users,
    title: 'Direct Trade Partnership',
    description:
      'Work directly with our family farm to ensure fair pricing and build relationships that elevate every harvest.',
  },
  {
    icon: Target,
    title: 'Complete Traceability',
    description:
      'Every bag includes plot data, harvest timing, and process notes so you can tell the full Pillcocaja story.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description:
      'Rigorous cupping and QC protocols secure consistent, specialty-level performance with each shipment.',
  },
];

const ROASTING_PROFILES = [
  {
    name: 'Honey Typica Premium',
    roastLevel: 'Light to Medium',
    development: '12-15% development time',
    temperature: 'First crack at 196 deg C',
    notes: 'Emphasize citrus brightness and caramel sweetness',
    cupping: {
      aroma: 8.5,
      flavor: 8.0,
      acidity: 7.5,
      body: 7.0,
      overall: 8.0,
    },
    image: new URL('../assets/images/cafe3.jpg', import.meta.url).href,
    bgPosition: 'center',
  },
  {
    name: 'Natural Bourbon Select',
    roastLevel: 'Medium',
    development: '15-18% development time',
    temperature: 'First crack at 198 deg C',
    notes: 'Develop berry notes while maintaining chocolate undertones',
    cupping: {
      aroma: 8.0,
      flavor: 8.5,
      acidity: 7.0,
      body: 8.0,
      overall: 8.2,
    },
    image: new URL('../assets/images/cafe4.jpg', import.meta.url).href,
    bgPosition: 'center',
  },
];

const LOGISTICS_PHASES: Array<{ icon: IconType; title: string; description: string }> = [
  {
    icon: ClipboardCheck,
    title: 'Sample and Alignment',
    description:
      'Cup current harvest lots together via video or shipped samples to choose the profile that fits your menu.',
  },
  {
    icon: FileCheck2,
    title: 'Transparent Contracts',
    description:
      'We handle all export documentation while keeping pricing, volumes, and timelines clear at every step.',
  },
  {
    icon: Plane,
    title: 'Coordinated Logistics',
    description:
      'Consolidated shipping with partner importers or direct air freight, including moisture and QA checks before departure.',
  },
];

const LOGISTICS_STATS = [
  { value: '21 days', label: 'Average ocean transit to US' },
  { value: '9 days', label: 'Express air freight option' },
  { value: '48 hrs', label: 'Sample turnaround after request' },
];

const MARKETING_ASSETS = [
  {
    title: 'Origin Story',
    description: 'Complete narrative about our family farm, history, and values.',
    actionLabel: 'Download PDF',
  },
  {
    title: 'Farm Photos',
    description: 'High resolution images covering farm work, processing, and team portraits.',
    actionLabel: 'Download ZIP',
  },
  {
    title: 'Cupping Cards',
    description: 'Professional cupping forms and tasting note templates for your bar team.',
    actionLabel: 'Download PDF',
  },
  {
    title: 'Farmer Profiles',
    description: 'Personal stories and portraits of the women leading Pillcocaja.',
    actionLabel: 'Download PDF',
  },
  {
    title: 'Sustainability Data',
    description: 'Environmental impact metrics, certifications, and regenerative practices.',
    actionLabel: 'Download PDF',
  },
  {
    title: 'Logo Package',
    description: 'Approved logos and brand marks in multiple formats and orientations.',
    actionLabel: 'Download ZIP',
  },
];

const CONTACT_OPTIONS: Array<{ icon: IconType; title: string; buttonLabel: string }> = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    buttonLabel: 'Message Us',
  },
  {
    icon: Mail,
    title: 'Email',
    buttonLabel: 'Send Email',
  },
  {
    icon: Video,
    title: 'Video Call',
    buttonLabel: 'Schedule Call',
  },
];

const ForRoasters: React.FC = () => {
  const heroBg = new URL('../assets/images/caferojo2.png', import.meta.url).href;

  const ids = React.useMemo(() => SECTIONS.map((section) => section.id), []);
  const activeId = useSectionObserver(ids, '0px 0px -65% 0px');
  const showRail = Boolean(activeId && activeId !== 'r-hero');
  const [openBenefit, setOpenBenefit] = React.useState<number | null>(0);
  const [activeProfile, setActiveProfile] = React.useState(0);
  const isNavOnLight = ['r-benefits', 'r-profiles', 'r-marketing'].includes(activeId ?? '');
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const clamp = React.useCallback(
    (n: number) => (n + ROASTING_PROFILES.length) % ROASTING_PROFILES.length,
    [],
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
          id="r-hero"
          className="relative h-screen text-white flex items-center overflow-hidden snap-start"
        >
          <img
            src={heroBg}
            alt="Roasters hero"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover animate-hero-pan will-change-transform"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ marginLeft: showRail ? RAIL_WIDTH : 0 }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0">
              <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '60%' }} />
              <span className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '78%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/20" style={{ top: '28%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/15" style={{ top: '66%' }} />
            </div>
            <div className="absolute top-20 left-[15%] h-40 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent" />
            <div className="absolute bottom-24 right-[18%] h-28 w-px bg-gradient-to-t from-white/50 via-white/25 to-transparent rotate-[10deg]" />
            <div className="absolute top-24 right-[22%] h-32 w-32 rounded-full border border-white/20" />
            <div className="absolute bottom-20 left-[20%] h-28 w-28 rounded-full border border-white/10" />
          </div>

          <div className="relative z-20 w-full">
            <div
              className="container-width"
              style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
            >
              <div className="max-w-3xl text-center mx-auto">
                <h1 className="font-serif font-black leading-[0.9] tracking-tight text-white/70 text-4xl sm:text-5xl md:text-6xl mb-6">
                  Partner With Pillcocaja
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 desc-text mt-4">
                  Join our network of specialty roasters committed to transparent sourcing, long term collaboration,
                  and coffees that speak of Yunguilla Valley.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary bg-white text-cacao-800 hover:bg-gray-100">
                    Request Partnership Info
                  </button>
                  <button className="btn-secondary border-white text-white hover:bg-white hover:text-cacao-800">
                    Schedule a Cupping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
  id="r-benefits"
  className="relative h-screen snap-start grid grid-cols-1 lg:grid-cols-2"
>
  {/* Left Side: Text Content */}
  <div className="bg-[rgb(16,36,26)] flex flex-col justify-center p-6 md:p-10">
    <div
      className="relative z-20 w-full max-w-2xl mx-auto"
      style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
    >
      <div className="text-center mb-10 text-white">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-[#d2cdbe]">
          Why Choose Pillcocaja
        </h2>
        <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto desc-text">
          We offer more than exceptional coffee. Expect a partnership built on open communication, measurable
          impact, and consistent quality in every cup.
        </p>
      </div>

      <div className="space-y-2 text-white">
        {BENEFITS.map((benefit, index) => (
          <div key={benefit.title} className="border-b border-white/10">
            <button
              onClick={() => setOpenBenefit(openBenefit === index ? null : index)}
              className="w-full flex items-center justify-between text-left p-4 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <benefit.icon className="h-6 w-6 text-white/80" />
                <h3 className="font-serif text-lg font-bold text-[#d2cdbe]">
                  {benefit.title}
                </h3>
              </div>
              <span
                className={`transform transition-transform duration-300 ${
                  openBenefit === index ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openBenefit === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pt-1 text-sm text-white/70 leading-relaxed desc-text">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">15+</div>
          <div className="text-sm text-white/60">Partner Roasters</div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">98%</div>
          <div className="text-sm text-white/60">Quality Score</div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">12</div>
          <div className="text-sm text-white/60">Months Availability</div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-1 text-white/90">3</div>
          <div className="text-sm text-white/60">Generations</div>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side: Image con degradé */}
  <div className="relative h-full w-full hidden lg:block">
    {/* Imagen base */}
    <img
      src={new URL("../assets/images/yunguillafinal.png", import.meta.url).href}
      alt="Yunguilla Valley"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Oscurecido sutil */}
    <div className="absolute inset-0 bg-black/10" />

    {/* 🔰 Degradé verde → transparente desde la izquierda */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-20
                 w-64 xl:w-80 bg-gradient-to-r
                 from-[rgb(16,36,26)]
                 via-[rgba(16,36,26,0.55)]
                 to-transparent"
    />

    {/* Overlay con líneas y texto */}
    <div className="pointer-events-none absolute inset-y-0 right-0 z-30" style={{ left: '20%' }}>
      <span
        className="absolute top-0 bottom-0 w-px bg-white/15"
        style={{ left: "75%" }}
      />
      <span
        className="absolute left-0 right-0 h-px bg-white/15"
        style={{ top: "25%" }}
      />
      <span
        className="absolute left-0 right-0 h-px bg-white/20"
        style={{ top: "75%" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-serif text-[4rem] font-bold text-white/[.35] text-glow animate-fade-in">
          Pillcocaja Valley
        </h3>
      </div>
    </div>
  </div>
</section>

        <section
          id="r-profiles"
          className="relative h-screen snap-start flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Fondos dinámicos */}
          <div className="absolute inset-0 z-0">
            {ROASTING_PROFILES.map((profile, index) => (
              <div
                key={profile.name}
                className="absolute inset-0 w-full h-full bg-cover transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${profile.image})`,
                  backgroundPosition: profile.bgPosition,
                  opacity: activeProfile === index ? 1 : 0,
                  zIndex: activeProfile === index ? 2 : 1,
                }}
              />
            ))}
          </div>
          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 z-10 bg-black/60" />

          <div
            className="container-width relative z-20"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-glow">
                Roasting Notes and Cupping Profiles
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto desc-text">
                Expert recommendations and detailed cupping notes help you unlock the best version of each lot.
              </p>
            </div>

            {/* Vertical Carousel */}
            <div className="relative h-[500px] w-full max-w-3xl mx-auto">
              <div className="relative h-full [perspective:1000px]">
                {ROASTING_PROFILES.map((profile, index) => {
                  const offset = index - activeProfile;
                  const translateY = offset * 40; // Vertical separation
                  const scale = 1 - Math.abs(offset) * 0.15;
                  const rotateX = offset * -10; // Tilt effect
                  const opacity = 1 - Math.abs(offset) * 0.3;
                  const zIndex = ROASTING_PROFILES.length - Math.abs(offset);

                  return (
                    <div
                      key={profile.name}
                      className="absolute left-1/2 top-1/2 w-[90%] max-w-2xl cursor-pointer p-8 transition-transform duration-500 ease-out bg-white/30 backdrop-blur-[60px] rounded-xl ring-1 ring-white/15 shadow-2xl"
                      style={{
                        zIndex,
                        transform: `translateX(-50%) translateY(-50%) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
                        opacity: offset === 0 ? 1 : opacity,
                        pointerEvents: offset === 0 ? 'auto' : 'none',
                      }}
                      onClick={() => setActiveProfile(index)}
                      aria-hidden={offset !== 0}
                    >
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-white mb-4 text-glow">
                            {profile.name}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">Recommended Roast Level</h4>
                              <p className="text-white/70 desc-text">{profile.roastLevel}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">Development Time</h4>
                              <p className="text-white/70 desc-text">{profile.development}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">First Crack Temperature</h4>
                              <p className="text-white/70 desc-text">{profile.temperature}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white/90 mb-2">Roasting Notes</h4>
                              <p className="text-white/70 desc-text">{profile.notes}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white/90 mb-4">Cupping Scores</h4>
                          <div className="space-y-3">
                            {Object.entries(profile.cupping).map(([attribute, score]) => (
                              <div key={attribute} className="flex items-center justify-between">
                                <span className="capitalize text-white/70 desc-text">{attribute}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="h-2 w-20 rounded-full bg-white/20">
                                    <div
                                      className="h-full rounded-full bg-cacao-500"
                                      style={{ width: `${(score / 10) * 100}%` }}
                                    />
                                  </div>
                                  <span className="w-8 text-sm font-medium text-white/90">{score}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Navigation Arrows */}
              <div className="absolute inset-x-0 top-0 flex justify-center">
                <button onClick={() => setActiveProfile(p => clamp(p - 1))} className="p-2 rounded-full bg-white/50 hover:bg-white shadow-md">
                  <ChevronUp className="h-6 w-6 text-forest-800" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <button onClick={() => setActiveProfile(p => clamp(p + 1))} className="p-2 rounded-full bg-white/50 hover:bg-white shadow-md">
                  <ChevronDown className="h-6 w-6 text-forest-800" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="r-logistics"
          className="relative min-h-screen snap-start section-padding bg-forest-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" aria-hidden="true" />
          <img
            src={hoja1}
            alt=""
            aria-hidden
            className="pointer-events-none select-none absolute -top-16 -left-48 w-[44rem] h-[44rem] opacity-[0.02] transform-gpu rotate-[-20deg] "
          />
          <img
            src={hoja2}
            alt=""
            aria-hidden
            className="pointer-events-none select-none absolute -bottom-24 -right-40 w-[40rem] h-[40rem] opacity-[0.02] transform-gpu rotate-[20deg]"
          />
          <div
            className="relative container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Logistics and Support
              </h2>
              <p className="text-lg text-white/85 max-w-2xl mx-auto desc-text">
                We stay close from sample approval through delivery, coordinating export paperwork, traceability, and
                shipping so you can focus on roasting.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {LOGISTICS_PHASES.map((phase) => (
                <div
                  key={phase.title}
                  className="rounded-none border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <phase.icon className="h-10 w-10 text-white mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-3">{phase.title}</h3>
                  <p className="text-white/80 leading-relaxed desc-text">{phase.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {LOGISTICS_STATS.map((stat) => (
                <div key={stat.label} className="rounded-none border border-white/10 bg-white/5 p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="r-marketing"
          className="relative min-h-screen snap-start section-padding bg-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-900 mb-6">
                Marketing Support Kit
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto desc-text">
                Everything you need to tell the Pillcocaja story, from origin details to professional photography ready
                for your channels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MARKETING_ASSETS.map((asset) => (
                <div key={asset.title} className="card p-6 text-center">
                  <Download className="h-12 w-12 text-forest-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-forest-900 mb-2">{asset.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 desc-text">{asset.description}</p>
                  <button className="btn-secondary w-full py-2 text-sm">{asset.actionLabel}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="r-contact"
          className="relative min-h-screen snap-start section-padding bg-gradient-to-r from-forest-800 to-cacao-700 text-white"
        >
          <div
            className="container-width text-center"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Partner?</h2>
            <p className="desc-text mx-auto mb-12 max-w-2xl text-xl text-white/85">
              Let us know how you would like to collaborate and we will respond with tailored availability, pricing, and
              logistics.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {CONTACT_OPTIONS.map((option) => (
                <div key={option.title} className="text-center">
                  <option.icon className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="font-semibold mb-4">{option.title}</h3>
                  <button className="btn-primary bg-white text-forest-800 hover:bg-gray-100">
                    {option.buttonLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForRoasters;
