import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Calendar,
  Send,
  Clock,
  Users,
} from 'lucide-react';
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

type VisitDetail = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const RAIL_WIDTH = 260;

const SECTIONS = [
  { id: 'c-hero', title: 'Contact' },
  { id: 'c-channels', title: 'Channels' },
  { id: 'c-form', title: 'Message' },
  { id: 'c-visit', title: 'Visit' },
  { id: 'c-social', title: 'Social' },
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
  {
    title: 'Video Call',
    description: 'Schedule a conversation with our export and quality team.',
    detail: '30 to 60 minutes',
    icon: Calendar,
    actionLabel: 'Schedule call',
  },
];

const VISIT_DETAILS: VisitDetail[] = [
  {
    label: 'Location',
    value: 'Yunguilla Valley, Mindo, Ecuador',
    icon: MapPin,
  },
  {
    label: 'Phone',
    value: '+593 997 069 202',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'ana.crespo@pillcocaja.com',
    icon: Mail,
  },
  {
    label: 'Hours',
    value: '08:00 to 18:00 ECT',
    icon: Clock,
  },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', short: 'IG' },
  { label: 'LinkedIn', short: 'LI' },
];

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
  const showRail = Boolean(activeId && activeId !== 'c-hero');
  const isNavOnLight = ['c-channels', 'c-form', 'c-social'].includes(activeId ?? '');
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
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '', interest: 'general' });
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
              className="container-width"
              style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
            >
              <div className="max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Let us know how we can help
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl text-white/85">
                  Talk directly with the women leading Pillcocaja. We are ready to collaborate on sourcing, roasting projects, and farm visits.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button className="btn-primary bg-white text-forest-800 hover:bg-gray-100">
                    Contact team
                  </button>
                  <button className="btn-secondary border-white text-white hover:bg-white hover:text-cacao-800">
                    Plan a visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="c-channels"
          className="relative min-h-screen snap-start section-padding bg-white"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {CHANNELS.map((channel) => (
                <div key={channel.title} className="card group p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 transition-colors duration-300 group-hover:bg-forest-200">
                    <channel.icon className="h-8 w-8 text-forest-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">{channel.title}</h3>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <div className="text-lg font-semibold text-gray-900 mb-6">{channel.detail}</div>
                  {channel.href ? (
                    <a className="btn-primary w-full" href={channel.href} target="_blank" rel="noopener noreferrer">
                      {channel.actionLabel}
                    </a>
                  ) : (
                    <button className="btn-primary w-full">{channel.actionLabel}</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="c-form"
          className="relative min-h-screen snap-start section-padding bg-cream-50"
        >
          <div
            className="container-width"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold text-forest-900 mb-6">Send us a message</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Tell us about the coffees you are looking for, your volume needs, or any detail you want to explore together.
                </p>

                {!submitted ? (
                  <form className="space-y-6" onSubmit={handleSubmit}>
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
                        className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
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
                          className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
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
                        className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
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
                        rows={5}
                        className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-forest-500"
                        placeholder="Share volume expectations, timelines, or specific lots you are interested in."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send message
                    </button>
                  </form>
                ) : (
                  <div className="rounded-none border border-green-200 bg-green-50 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <Send className="h-6 w-6 text-green-700" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">Thank you!</h3>
                    <p className="text-sm text-green-700">
                      We will get back to you within 24 hours. Meanwhile feel free to reach out through WhatsApp for urgent needs.
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

              <div className="space-y-8">
                <div className="card p-8">
                  <h3 className="font-serif text-2xl font-bold text-forest-900 mb-6">Visit our farm</h3>
                  <div className="space-y-4 mb-6">
                    {VISIT_DETAILS.map((detail) => (
                      <div key={detail.label} className="flex items-start gap-3">
                        <detail.icon className="mt-1 h-5 w-5 text-forest-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{detail.label}</div>
                          <div className="text-sm text-gray-600">{detail.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    We welcome visitors year round. Reach out in advance so we can tailor a tour and cupping session for your team.
                  </p>
                  <button className="btn-secondary mt-6 w-full">Plan farm visit</button>
                </div>

                <div className="card p-8">
                  <h3 className="font-serif text-xl font-bold text-forest-900 mb-4">Find us</h3>
                  <div className="flex h-64 items-center justify-center rounded-none bg-gray-100">
                    <div className="text-center text-gray-500">
                      <MapPin className="mx-auto mb-2 h-12 w-12" />
                      <p className="text-sm">Interactive map coming soon</p>
                      <p className="text-xs">Yunguilla Valley, Ecuador</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="c-visit"
          className="relative min-h-[70vh] snap-start section-padding bg-white"
        >
          <div
            className="container-width text-center"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <h2 className="font-serif text-3xl font-bold text-forest-900 mb-6">Why partner with Pillcocaja</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
              Direct access to our team means fast communication, transparent pricing, and logistics aligned with your roasting schedule.
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { value: '24 hrs', label: 'Average response time' },
                { value: '3', label: 'Languages spoken' },
                { value: '100%', label: 'Traceability provided' },
              ].map((item) => (
                <div key={item.label} className="rounded-none border border-black/10 bg-cream-100 p-6">
                  <div className="text-2xl font-bold text-forest-900 mb-2">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="c-social"
          className="relative min-h-[60vh] snap-start section-padding bg-cream-50"
        >
          <div
            className="container-width text-center"
            style={{ paddingLeft: showRail ? RAIL_WIDTH + 24 : 0 }}
          >
            <h2 className="font-serif text-3xl font-bold text-forest-900 mb-6">Follow our journey</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Stay connected for harvest updates, sustainability milestones, and stories from the women of Pillcocaja.
            </p>
            <div className="flex justify-center gap-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-100 text-forest-600 transition-colors duration-300 hover:bg-forest-200"
                  aria-label={link.label}
                >
                  <span className="font-bold">{link.short}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;



