import { site } from '@/data/content';
import { LogoMark, InstagramIcon, TikTokIcon, VideoIcon, WhatsAppIcon, XIcon, FacebookIcon, TelegramIcon } from '@/components/Icons';
import { absoluteUrl, openShareWindow, shareTargets, trackShare } from '@/lib/share';

/** Footer — verified links only + quick share row. */
export function Footer() {
  const payload = {
    url: absoluteUrl(),
    title: 'ThatGirlNiq — Stand-Up Comedian',
    text: 'You gotta watch this comedian 🔥🎤',
  };
  const share = (platform: 'whatsapp' | 'x' | 'facebook' | 'telegram') => {
    trackShare('share_click', { platform, source: 'footer', url: payload.url });
    openShareWindow(shareTargets[platform](payload));
  };

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

        {/* share row */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-[var(--line)] pt-8">
          <p className="eyebrow !text-[0.6rem]">Sharing is caring — send Niq to a friend</p>
          <div className="flex items-center gap-3">
            <button onClick={() => share('whatsapp')} aria-label="Share on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-all hover:scale-110 hover:border-[#25D366] hover:text-[#25D366]">
              <WhatsAppIcon className="h-4 w-4" />
            </button>
            <button onClick={() => share('x')} aria-label="Share on X" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-all hover:scale-110 hover:border-[var(--ink)] hover:text-[var(--ink)]">
              <XIcon className="h-4 w-4" />
            </button>
            <button onClick={() => share('facebook')} aria-label="Share on Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-all hover:scale-110 hover:border-[#1877F2] hover:text-[#1877F2]">
              <FacebookIcon className="h-4 w-4" />
            </button>
            <button onClick={() => share('telegram')} aria-label="Share on Telegram" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-all hover:scale-110 hover:border-[#229ED9] hover:text-[#229ED9]">
              <TelegramIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
