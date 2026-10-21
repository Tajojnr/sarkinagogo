'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/auctions', label: 'The Royal Vault' },
  { href: '/about', label: 'Heritage' },
  { href: '/contact', label: 'Concierge' },
];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 016 0v2" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);
  const lastY = useRef(0);

  // Scroll behaviour: compact state, hide on scroll down, progress line
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 40);

      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 200 && !menuOpen);
        lastY.current = y;
      }
      if (y < 100) setHidden(false);

      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(y / max, 1) : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Lock page scroll + Escape to close while drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          solid
            ? 'bg-obsidian/85 backdrop-blur-xl border-b border-gold/20'
            : 'bg-gradient-to-b from-obsidian/80 to-transparent border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto max-w-[1600px] px-4 md:px-10 grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? 'h-16 md:h-20' : 'h-20 md:h-28'
          }`}
        >
          {/* LEFT: hamburger (mobile) / links (desktop) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className="md:hidden -ml-3 h-12 w-12 flex items-center justify-center text-ivory"
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-500 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-500 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>

            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.slice(0, 2).map((l) => (
                <Link key={l.href} href={l.href} className="nav-link" aria-current={isActive(l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER: logo, scales down when scrolled */}
          <Link
            href="/"
            aria-label="Sarkin Agogo Watches, home"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-center text-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled ? 'w-[110px] md:w-[130px]' : 'w-[140px] md:w-[190px]'
            }`}
          >
            <span
              className={`block origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                scrolled ? 'scale-[0.4] md:scale-[0.45]' : 'scale-[0.5] md:scale-[0.7]'
              }`}
            >
              <Logo />
            </span>
          </Link>

          {/* RIGHT: links + icons (desktop) / cart (mobile) */}
          <div className="flex items-center justify-end gap-2 md:gap-10">
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.slice(2).map((l) => (
                <Link key={l.href} href={l.href} className="nav-link" aria-current={isActive(l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              <button
                type="button"
                aria-label="Search"
                className="hidden md:flex h-12 w-12 items-center justify-center text-ivory/70 hover:text-gold transition-colors"
              >
                <SearchIcon />
              </button>
              <Link
                href="/checkout"
                aria-label="Shopping bag"
                className="-mr-3 md:mr-0 h-12 w-12 flex items-center justify-center text-ivory/70 hover:text-gold transition-colors"
              >
                <BagIcon />
              </Link>
            </div>
          </div>
        </nav>

        {/* Scroll progress line */}
        <span
          ref={progressRef}
          aria-hidden="true"
          className="absolute left-0 bottom-[-1px] h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold-deep via-gold-light to-gold-pale"
        />
      </header>

      {/* MOBILE DRAWER */}
      <div
        id="mobile-drawer"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 md:hidden bg-obsidian flex flex-col transition-[transform,visibility] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0 visible' : '-translate-x-full invisible'
        }`}
      >
        {/* gold accent edge */}
        <span aria-hidden="true" className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

        <div className="flex-1 flex flex-col justify-center px-8 pt-24">
          <p className="eyebrow mb-8">Navigate</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: menuOpen ? `${250 + i * 90}ms` : '0ms' }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className="group flex items-baseline gap-5 min-h-[3.5rem] py-2"
                >
                  <span className="text-[10px] tracking-[0.3em] text-gold/70">0{i + 1}</span>
                  <span
                    className={`font-display text-4xl font-light italic transition-colors ${
                      isActive(l.href) ? 'text-gold' : 'text-ivory group-hover:text-gold'
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`px-8 pb-10 transition-all duration-700 delay-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="gold-divider mb-6"><span>◆</span></div>
          <p className="eyebrow mb-2">VIP Concierge</p>
          <a href="tel:+2347025712293" className="text-sm text-ivory/80 hover:text-gold transition-colors">
            +234 702 571 2293
          </a>
        </div>
      </div>
    </>
  );
}