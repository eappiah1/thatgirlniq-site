import { useEffect, useState } from 'react';
import { site } from '@/data/content';
import { LogoMark, MenuIcon, CloseIcon, MoonIcon, SunIcon } from '@/components/Icons';

const links = [
  { href: '#about', label: 'About' },
  { href: '#videos', label: 'Videos' },
  { href: '#live', label: 'Live' },
  { href: '#follow', label: 'Follow' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] border-b border-[var(--line)]' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main">
        <a href="#top" className="flex items-center gap-3 group">
          <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105" />
          <span className="font-display text-lg font-extrabold tracking-tight uppercase">
            ThatGirl<span className="text-grad">Niq</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a className="nav-link" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-colors hover:border-[var(--magenta)] hover:text-[var(--magenta)]"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <a
            href={site.zoomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !px-6 !py-2.5 text-xs md:inline-flex"
          >
            Join Live Show
          </a>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 top-[68px] z-40 flex flex-col bg-[var(--bg)] transition-all duration-500 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
          {links.map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: `${i * 55}ms` }}
              className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="display-hero block py-2 text-5xl text-[var(--ink)] transition-colors hover:text-[var(--magenta)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="px-8 pb-10 text-sm text-[var(--ink-faint)]">{site.tiktokBio.replace('\n', ' · ')}</p>
      </div>
    </header>
  );
}
