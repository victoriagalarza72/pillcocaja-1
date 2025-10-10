import React from 'react';
import { X } from 'lucide-react';
import illusCafe from '../assets/illustrations/cafeflor.svg';

type Props = {
  open: boolean;
  onClose: () => void;
};

const NewsletterModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    if (!email) return;
    // Placeholder: close after a basic submission
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <button
        aria-label="Close newsletter"
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div className="relative z-10 mx-auto mt-24 w-[92%] max-w-3xl">
        <div className="relative overflow-hidden rounded-none bg-cream-50 ring-1 ring-forest-900/10 shadow-2xl">
          {/* Background illustration */}
          <img
            src={illusCafe}
            alt=""
            aria-hidden
            className="pointer-events-none select-none absolute inset-0 h-full w-full object-contain opacity-[0.13]"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-forest-900 shadow-sm ring-1 ring-forest-900/10 hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10 grid grid-cols-1 p-6 md:p-8 items-center">
            {/* Content */}
            <div className="text-forest-900 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex-1 h-px bg-forest-900/20" />
                <span className="uppercase tracking-[0.22em] text-[11px] text-forest-900/60">Newsletter</span>
                <span className="flex-1 h-px bg-forest-900/20" />
              </div>
              <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-black mb-2">
                New Harvest Coming Soon
              </h3>
              <p className="text-forest-900/75 mb-4 desc-text">
                Suscríbete para enterarte cuando lancemos los primeros lotes de la nueva cosecha y recibir novedades desde Yunguilla.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="flex-1 rounded-none border border-forest-900/20 bg-white/80 px-4 py-3 text-forest-900 placeholder-forest-900/40 focus:outline-none focus:ring-2 focus:ring-forest-700/40"
                />
                <button
                  type="submit"
                  className="rounded-none bg-forest-800 px-5 py-3 font-semibold text-white hover:bg-forest-700 transition-colors"
                >
                  Suscribirme
                </button>
              </form>
              <p className="mt-2 text-xs text-forest-900/60">Puedes cerrar esta ventana si prefieres continuar navegando.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
