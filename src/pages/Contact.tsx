import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Calendar, Send } from 'lucide-react';
import TopNav from '../components/TopNav';
import SectionRail from '../components/SectionRail';
import { useSectionObserver } from '../components/useSectionObserver';

type Channel = {
  title: string;
  description: string;
  detail: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  actionLabel: string;
  href?: string;
};

const RAIL_WIDTH = 260;
const DESKTOP_BREAKPOINT = 1024;

const SECTIONS = [
  { id: 'c-hero', title: 'Contact' },
  { id: 'c-channels', title: 'Channels' },
  { id: 'c-form', title: 'Message' },
] as const;

const CHANNELS: Channel[] = [
  {
    title: 'WhatsApp',
    description: 'Quick answers and sample requests in real time.',
    detail: '+593 997 069 202',
    icon: MessageSquare,
    actionLabel: 'Start chat',
    href: 'https://wa.me/593997069202',
  },
  {
    title: 'Email',
    description: 'Detailed inquiries, proposals, and logistics coordination.',
    detail: 'ana.crespo@pillcocaja.com',
    icon: Mail,
    actionLabel: 'Send email',
    href: 'mailto:ana.crespo@pillcocaja.com',
  },
];

// Removed Visit and Social sections per request

const Contact: React.FC = () => {
  const heroBg = new URL('../assets/images/cafe14.png', import.meta.url).href;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'general',
  });
  const [submitted, setSubmitted] = useState(false);

  const ids = React.useMemo(() => SECTIONS.map((section) => section.id), []);
  const activeId = useSectionObserver(ids, '0px 0px -65% 0px');
  const [viewportWidth, setViewportWidth] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth : DESKTOP_BREAKPOINT));
  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isLargeUp = viewportWidth >= DESKTOP_BREAKPOINT;
  const showRail = Boolean(isLargeUp && activeId && activeId !== 'c-hero');
  const isNavOnLight = ['c-channels', 'c-form'].includes(activeId ?? '');
  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const data = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: '', email: '', company: '', message: '', interest: 'general' });
        } else {
          response.json().then(data => {
            // You can use data.errors to display validation errors
            console.error('Form submission error', data);
          })
        }
      }).catch(error => {
        console.error('Form submission error', error);
      });
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
          id="c-hero"
          className="relative h-screen snap-start flex items-center text-white overflow-hidden"
        >
          <img
            src={heroBg}
            alt="Contact hero"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover animate-hero-pan will-change-transform"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ marginLeft: showRail ? RAIL_WIDTH : 0 }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0">
              <span className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: '38%' }} />
              <span className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '64%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/20" style={{ top: '24%' }} />
              <span className="absolute left-0 right-0 h-px bg-white/15" style={{ top: '56%' }} />
            </div>
            <div className="absolute top-14 left-[22%] h-36 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent" />
            <div className="absolute bottom-24 right-[18%] h-28 w-px bg-gradient-to-t from-white/55 via-white/25 to-transparent rotate-[10deg]" />
            <div className="absolute top-24 right-[24%] h-28 w-28 rounded-full border border-white/18" />
            <div className="absolute bottom-18 left-[26%] h-22 w-22 rounded-full border border-white/12" />
          </div>

          <div className="relative z-20 w-full">
            <div
              className="container-width px-8 md:px-0 text-center"
              style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 30 }}
            >
              <div className="max-w-3xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Let us know how we can help
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/85 desc-text">
                  Talk directly with the team leading Pillcocaja. We are ready to collaborate on sourcing, roasting projects, and farm visits.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
                  <button
                    onClick={() => scrollTo('c-channels')}
                    className="btn-primary bg-white text-forest-800 hover:bg-gray-100"
                  >
                    Contact team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="c-channels" className="relative min-h-screen snap-start overflow-hidden bg-cream-50">
          {/* Background floral illustration (keep seasonal style) */}
          <img
            src={new URL('../assets/illustrations/cafeflor.svg', import.meta.url).href}
            alt=""
            aria-hidden
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain opacity-[0.13]"
          />
          <div className="relative z-10" style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}>
            <div className="container-width px-8 md:px-0" style={{ paddingTop: '6.5rem'}}>
              <div className="text-center mb-8 md:mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-black text-forest-900">Ready to Connect?</h2>
                <p className="text-base md:text-lg text-forest-900/80 max-w-2xl mx-auto desc-text mt-2">Choose your preferred channel and we’ll get back to you quickly.</p>
              </div>
              {/* Mobile: stacked cards with margins and centered text */}
              <div className="md:hidden mx-auto w-full max-w-md space-y-6">
                {CHANNELS.map((channel) => (
                  <div key={channel.title} className="rounded-none ring-1 ring-black/10 bg-white/25 backdrop-blur-lg p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-100">
                      <channel.icon className="h-6 w-6 text-forest-700" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">{channel.title}</h3>
                    <p className="text-sm text-forest-900/80 mb-2">{channel.description}</p>
                    <div className="text-base font-semibold text-forest-900 mb-4">{channel.detail}</div>
                    {channel.href ? (
                      <a className="btn-primary w-full" href={channel.href} target="_blank" rel="noopener noreferrer">{channel.actionLabel}</a>
                    ) : (
                      <button className="btn-primary w-full">{channel.actionLabel}</button>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop/tablet grid */}
              <div className="hidden md:grid mx-auto max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                {CHANNELS.map((channel) => (
                  <div key={channel.title} className="group p-8 text-center backdrop-blur-md bg-white/20 rounded-none ring-1 ring-black/10">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 transition-colors duration-300 group-hover:bg-forest-200">
                      <channel.icon className="h-8 w-8 text-forest-600" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">{channel.title}</h3>
                    <p className="text-gray-600 mb-4">{channel.description}</p>
                    <div className="text-lg font-semibold text-gray-900 mb-6">{channel.detail}</div>
                    {channel.href ? (
                      <a className="btn-primary w-full" href={channel.href} target="_blank" rel="noopener noreferrer">{channel.actionLabel}</a>
                    ) : (
                      <button className="btn-primary w-full">{channel.actionLabel}</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="c-form" className="relative min-h-screen snap-start bg-cream-50 overflow-hidden">
          <div className="absolute inset-0" style={{ paddingLeft: showRail ? RAIL_WIDTH : 0 }}>
            {/* Mobile: top image (50vh) + bottom form (50vh). Desktop: two columns */}
            <div
              className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 h-full"
              style={{ gridTemplateRows: isLargeUp ? undefined : '35vh 1fr' }}
            >
              {/* Top image area */}
              <div className="relative h-full lg:h-auto">
                <img
                  src={heroBg}
                  alt="Coffee farm"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-forest-900/10" aria-hidden />
              </div>
              {/* Bottom form panel */}
              <div className="relative flex items-start justify-center p-6 pt-6 pb-28 lg:p-8 lg:pb-8 overflow-y-auto">
                <div className="w-full max-w-lg backdrop-blur-md bg-white/20 p-6 lg:p-8 rounded-none">
                  <h2 className="font-serif text-3xl font-bold text-forest-900 mb-6 text-center">Send us a message</h2>
                  {!submitted ? (
                    <form
                      className="space-y-4"
                      action="https://formspree.io/f/mqkrvgjw"
                      method="POST"
                    >
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                          Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-none border border-gray-300 bg-white/50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            Email *
                          </label>
                          <input
                            id="email"
                            name="_replyto"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-none border border-gray-300 bg-white/50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                            placeholder="name@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                            Company
                          </label>
                          <input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full rounded-none border border-gray-300 bg-white/50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                            placeholder="Roastery or business name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="interest" className="mb-2 block text-sm font-medium text-gray-700">
                          Area of interest
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full rounded-none border border-gray-300 bg-white/50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                        >
                          <option value="general">General inquiry</option>
                          <option value="samples">Samples</option>
                          <option value="partnership">Partnership</option>
                          <option value="visit">Farm visit</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full rounded-none border border-gray-300 bg-white/50 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                          placeholder="Volume, timelines, specific lots..."
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send message
                      </button>
                    </form>
                  ) : (
                    <div className="rounded-none border border-green-200 bg-green-50/50 p-8 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                        <Send className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">Thank you!</h3>
                      <p className="text-sm text-green-700">
                        We will get back to you within 24 hours.
                      </p>
                      <button
                        className="btn-secondary mt-6"
                        onClick={() => setSubmitted(false)}
                      >
                        Send another message
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img
                  src={new URL('../assets/images/yunguillafondo.jpeg', import.meta.url).href}
                  alt="Yunguilla landscape"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit and Social sections removed per request */}
      </div>
    </main>
  );
};

export default Contact;



