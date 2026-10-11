import { site } from '@/data/content';
import { LogoMark, InstagramIcon, TikTokIcon, VideoIcon } from '@/components/Icons';

/** Footer — verified links only. */
export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-sm font-extrabold uppercase tracking-tight">
              ThatGirl<span className="text-grad">Niq</span>
            </span>
          </a>

          <div className="flex items-center gap-5">
            <a
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok @.thatgirlniq"
              className="text-[var(--ink-dim)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--magenta)]"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @thatgirlniq"
              className="text-[var(--ink-dim)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--magenta)]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={site.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the live Zoom show"
              className="text-[var(--ink-dim)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--magenta)]"
            >
              <VideoIcon className="h-5 w-5" />
            </a>
          </div>

          <p className="text-center text-xs text-[var(--ink-faint)] md:text-right">
            © 2026 ThatGirlNiq · {site.location}
            <br className="hidden md:block" />
            Built for the culture.
          </p>
        </div>
      </div>
    </footer>
  );
}
