import { useEffect, useRef, useState } from 'react';
import {
  WhatsAppIcon,
  XIcon,
  SmsIcon,
  LinkIcon,
  ShareIcon,
  CloseIcon,
} from '@/components/Icons';
import { useToast } from '@/components/Toast';
import {
  canNativeShare,
  copyText,
  openShareWindow,
  shareNative,
  shareTargets,
  trackShare,
} from '@/lib/share';

/**
 * ShareMenu — a compact "Share" button that opens a small popover
 * with per-item share options. Used on video cards and the live-show
 * section. Renders in a fixed-position panel so card overflow never clips it.
 */

interface ShareMenuProps {
  url: string;
  title: string;
  text: string;
  /** extra tracking metadata, e.g. { clip: '7604286960676408606' } */
  detail?: Record<string, string>;
  className?: string;
  label?: string;
}

export function ShareMenu({ url, title, text, detail = {}, className = '', label = 'Share' }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const payload = { url, title, text };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const openPanel = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY + 6, left: Math.min(r.left + window.scrollX, window.innerWidth - 220) });
    }
    setOpen((o) => !o);
  };

  const fire = (platform: 'whatsapp' | 'x' | 'sms') => {
    trackShare(`share_click`, { platform, ...detail, url });
    openShareWindow(shareTargets[platform](payload));
    setOpen(false);
  };

  const copy = async () => {
    trackShare('share_copy_link', { ...detail, url });
    const ok = await copyText(url);
    toast(ok ? 'Link copied! 🔗 Share it everywhere' : 'Copy failed — long-press the address bar');
    setOpen(false);
  };

  const native = async () => {
    const ok = await shareNative(payload);
    if (!ok) await copy();
    setOpen(false);
  };

  const item =
    'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-[var(--bg-card)]';

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={`${label} (opens share options)`}
        aria-expanded={open}
        onClick={openPanel}
        className={className}
      >
        <ShareIcon className="h-4 w-4" />
        {label !== 'Share' ? <span>{label}</span> : null}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label="Share options"
          className="glass fixed z-[85] w-52 rounded-2xl p-2 shadow-2xl"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="mb-1 flex items-center justify-between px-2 pt-1">
            <p className="font-display text-xs font-extrabold uppercase tracking-widest text-[var(--ink-faint)]">Share this</p>
            <button onClick={() => setOpen(false)} aria-label="Close share menu" className="opacity-50 hover:opacity-100">
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <button role="menuitem" className={item} onClick={native}>
            <ShareIcon className="h-4 w-4 text-[var(--magenta)]" />
            {canNativeShare() ? 'Share via apps…' : 'Share (copy link)'}
          </button>
          <button role="menuitem" className={item} onClick={() => fire('whatsapp')}>
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </button>
          <button role="menuitem" className={item} onClick={() => fire('x')}>
            <XIcon className="h-4 w-4" /> X (Twitter)
          </button>
          <button role="menuitem" className={item} onClick={() => fire('sms')}>
            <SmsIcon className="h-4 w-4 text-[var(--gold)]" /> iMessage / SMS
          </button>
          <button role="menuitem" className={item} onClick={copy}>
            <LinkIcon className="h-4 w-4 text-[var(--neon)]" /> Copy link
          </button>
        </div>
      )}
    </>
  );
}
