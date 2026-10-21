import Link from 'next/link';
import Logo from './Logo';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6A8.5 8.5 0 1 1 20.5 11.5Z" />
    <path d="M8.5 8.2c.3-.6.6-.6 1-.6h.4c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .5-.2 1.2-.7 1.5-.5.4-1.2.6-2 .4-1.1-.3-2.5-1-3.8-2.3-1.1-1.1-1.8-2.5-2-3.5-.2-.8.1-1.5.4-1.9Z" />
  </svg>
);

const SOCIALS = [
  { href: 'https://www.instagram.com/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://wa.me/2347025712293', label: 'Chat with Sarkin Agogo on WhatsApp', Icon: WhatsAppIcon },
];

const EXPLORE = [
  { href: '/collections', label: 'Collections' },
  { href: '/auctions', label: 'The Royal Vault' },
  { href: '/about', label: 'Our Heritage' },
  { href: '/contact', label: 'Concierge' },
];

const SHOWROOMS = ['Abuja Lounge', 'Kano Private Suite', 'Nationwide Delivery'];

export default function Footer() {
  return (
    <footer className="relative bg-onyx pt-20 md:pt-28 pb-8 overflow-hidden">
      {/* hairline gold glow along the top edge */}
      <span
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />

      <div className="container-luxe">
        {/* Ornament divider */}
        <div className="gold-divider mb-14 md:mb-20" aria-hidden="true">
          <span>◆</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Sarkin Agogo Watches home"
              className="inline-flex text-gold mb-8"
            >
              <Logo />
            </Link>

            <p className="font-display italic text-2xl font-light text-ivory/80 leading-snug max-w-xs">
              The Watch Emporium.
            </p>
            <p className="mt-3 text-sm text-ivory/60 leading-relaxed max-w-xs">
              Luxury timepieces trusted by watch lovers nationwide.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h4 className="eyebrow mb-6">Explore</h4>
            <ul className="space-y-1">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-10 text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Showrooms */}
          <div>
            <h4 className="eyebrow mb-6">Showrooms</h4>
            <ul className="space-y-1">
              {SHOWROOMS.map((s) => (
                <li key={s} className="flex items-center min-h-10 text-sm text-ivory/70">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="eyebrow mb-6">Connect</h4>

            <div className="flex gap-3 mb-8">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 text-ivory/80 border border-gold/30 rounded-full flex items-center justify-center transition-all duration-500 hover:text-gold hover:bg-gold/10 hover:border-gold hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">
              VIP Concierge
            </p>
            <a
              href="tel:+2347025712293"
              className="inline-flex items-center min-h-10 text-sm text-ivory/80 hover:text-gold transition-colors"
            >
              +234 702 571 2293
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-ivory/40 text-xs font-light text-center md:text-left">
            © 2026 Sarkin Agogo Watches. All rights reserved.
            <span className="hidden sm:inline text-gold/50"> · </span>
            <span className="block sm:inline mono-num text-gold/50">№ SA-2026</span>
          </p>

          <p className="text-ivory/40 text-[10px] tracking-[0.3em] uppercase text-center">
            Timeless · Refined · Trusted
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 min-h-10 text-[10px] tracking-[0.3em] uppercase text-ivory/50 hover:text-gold transition-colors"
          >
            Back to top
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M5 9V1M1.5 4.5L5 1l3.5 3.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}