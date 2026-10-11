/**
 * Share utilities — platform URL builders, clipboard with fallback,
 * native Web Share API, and share-analytics plumbing.
 *
 * Analytics: events are pushed to window.dataLayer (GA4-ready) and logged
 * to the console. No tracking keys are hardcoded; if a GA4/Plausible ID is
 * added later (index.html), these events flow into it with zero code change.
 */

export interface SharePayload {
  url: string;
  title: string;
  text: string;
}

export function absoluteUrl(path = ''): string {
  const base = `${window.location.protocol}//${window.location.host}`;
  return path ? `${base}${path}` : window.location.href;
}

/** Clip share URLs look like thatgirlniq.com/clips/tiktok-<id> (see ClipRedirect route). */
export function clipShareUrl(clipId: string): string {
  return `${window.location.protocol}//${window.location.host}/clips/tiktok-${clipId}`;
}

export const shareTargets = {
  whatsapp: (p: SharePayload) => `https://wa.me/?text=${encodeURIComponent(`${p.text}\n${p.url}`)}`,
  x: (p: SharePayload) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(p.text)}&url=${encodeURIComponent(p.url)}`,
  facebook: (p: SharePayload) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(p.url)}`,
  telegram: (p: SharePayload) =>
    `https://t.me/share/url?url=${encodeURIComponent(p.url)}&text=${encodeURIComponent(p.text)}`,
  sms: (p: SharePayload) => `sms:?&body=${encodeURIComponent(`${p.text}\n${p.url}`)}`,
};

export type SharePlatform = keyof typeof shareTargets;

/** Copy text to clipboard — modern API with legacy fallback. Returns success. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

/** True when the native share sheet is available (most mobile browsers). */
export const canNativeShare = (): boolean =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';

/** Open the native share sheet. Returns false when unsupported. */
export async function shareNative(p: SharePayload): Promise<boolean> {
  if (!canNativeShare()) return false;
  try {
    await navigator.share({ title: p.title, text: p.text, url: p.url });
    trackShare('share_native', { url: p.url });
    return true;
  } catch {
    return false; // user dismissed the sheet
  }
}

export function openShareWindow(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Fire-and-forget share analytics. Goes to dataLayer (GA4) + console; harmless without an ID. */
export function trackShare(event: string, detail: Record<string, string> = {}): void {
  const payload = { event, ...detail, page: window.location.pathname };
  try {
    (window as unknown as { dataLayer?: unknown[] }).dataLayer =
      (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(payload);
  } catch {
    /* no-op */
  }
  // eslint-disable-next-line no-console
  console.info('[share]', payload);
}
