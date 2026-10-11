import { useState } from 'react';
import {
  WhatsAppIcon,
  XIcon,
  FacebookIcon,
  TelegramIcon,
  SmsIcon,
  LinkIcon,
  QrIcon,
  ShareIcon,
} from '@/components/Icons';
import { QrModal } from '@/components/QrModal';
import { useToast } from '@/components/Toast';
import {
  absoluteUrl,
  canNativeShare,
  copyText,
  openShareWindow,
  shareNative,
  shareTargets,
  trackShare,
  type SharePlatform,
} from '@/lib/share';

/**
 * Global floating share bar.
 * Desktop: fixed bottom-left, vertical stack, reveals fully on hover.
 * Mobile: fixed bottom-center, horizontal glass pill (native share first).
 */

interface ShareBarProps {
  title?: string;
  text?: string;
}

export function ShareBar({ title = 'ThatGirlNiq — Stand-Up Comedian', text = 'You gotta watch this comedian 🔥🎤' }: ShareBarProps) {
  const [qrOpen, setQrOpen] = useState(false);
  const { toast } = useToast();

  const payload = { url: absoluteUrl(), title, text };

  const share = (platform: SharePlatform) => {
    trackShare(`share_click`, { platform, url: payload.url });
    openShareWindow(shareTargets[platform](payload));
  };

  const copy = async () => {
    trackShare('share_copy_link', { url: payload.url });
    const ok = await copyText(payload.url);
    toast(ok ? 'Link copied! 🔗 Share it everywhere' : 'Copy failed — long-press the address bar');
  };

  const native = async () => {
    const ok = await shareNative(payload);
    if (!ok) {
      // unsupported (desktop) → copy as the "more" fallback
      await copy();
    }
  };

  const btn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-card)] text-[var(--ink-dim)] backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--magenta)] hover:text-[var(--magenta)]';

  return (
    <>
      {/* Desktop: bottom-left vertical stack, expands on hover */}
      <nav
        aria-label="Share this site"
        className="group fixed bottom-6 left-6 z-[70] hidden flex-col items-center gap-2 md:flex"
      >
        <div className="flex flex-col items-center gap-2 opacity-30 transition-opacity duration-300 group-hover:opacity-100">
          <button className={btn} aria-label="Share on WhatsApp" onClick={() => share('whatsapp')}>
            <WhatsAppIcon className="h-4.5 w-4.5" />
          </button>
          <button className={btn} aria-label="Share on X" onClick={() => share('x')}>
            <XIcon className="h-4 w-4" />
          </button>
          <button className={btn} aria-label="Share on Facebook" onClick={() => share('facebook')}>
            <FacebookIcon className="h-4 w-4" />
          </button>
          <button className={btn} aria-label="Share on Telegram" onClick={() => share('telegram')}>
            <TelegramIcon className="h-4 w-4" />
          </button>
          <button className={btn} aria-label="Share via iMessage or SMS" onClick={() => share('sms')}>
            <SmsIcon className="h-4 w-4" />
          </button>
          <button className={btn} aria-label="Show QR code" onClick={() => setQrOpen(true)}>
            <QrIcon className="h-4 w-4" />
          </button>
        </div>
        <button className={btn} aria-label="Copy link" onClick={copy}>
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--magenta)] text-white shadow-lg transition-transform hover:scale-110"
          aria-label={canNativeShare() ? 'Share using your apps' : 'More share options'}
          onClick={native}
        >
          <ShareIcon className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile: bottom-center glass pill */}
      <nav
        aria-label="Share this site"
        className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] px-2 py-1.5 shadow-xl backdrop-blur-xl md:hidden"
      >
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--magenta)] text-white"
          aria-label="Share using your apps"
          onClick={native}
        >
          <ShareIcon className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-dim)]" aria-label="Share on WhatsApp" onClick={() => share('whatsapp')}>
          <WhatsAppIcon className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-dim)]" aria-label="Share on X" onClick={() => share('x')}>
          <XIcon className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-dim)]" aria-label="Copy link" onClick={copy}>
          <LinkIcon className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink-dim)]" aria-label="Show QR code" onClick={() => setQrOpen(true)}>
          <QrIcon className="h-4 w-4" />
        </button>
      </nav>

      <QrModal url={payload.url} open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}
