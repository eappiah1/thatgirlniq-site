import { useEffect } from 'react';
import { trackShare } from '@/lib/share';

/**
 * Share nudge — after a visitor has scrolled past 3+ clip cards
 * (the closest a static site can get to "watched 3 clips" without
 * cross-origin embed tracking), show a one-time gentle toast.
 * Fires once per browser session.
 */
export function useShareNudge(onNudge: () => void) {
  useEffect(() => {
    if (sessionStorage.getItem('niq-nudged') === '1') return;

    const cards = Array.from(document.querySelectorAll('[data-clip-card]'));
    if (cards.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) seen.add(e.target);
        });
        if (seen.size >= Math.min(3, cards.length)) {
          sessionStorage.setItem('niq-nudged', '1');
          trackShare('share_nudge_shown', { clips_seen: String(seen.size) });
          onNudge();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
