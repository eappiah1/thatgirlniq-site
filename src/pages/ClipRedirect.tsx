import { useEffect } from 'react';
import { useParams } from 'react-router';

/**
 * /clips/tiktok-<id> — shareable per-clip URLs.
 * The site is a single page, so shared clip links land here and are
 * redirected to the Video Vault. (OG tags are site-wide; per-clip OG
 * would require server rendering, noted in README.)
 */
export default function ClipRedirect() {
  const { clipId } = useParams();

  useEffect(() => {
    window.location.replace(`/#videos?clip=${clipId ?? ''}`);
  }, [clipId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--ink)]">
      <p className="font-display text-sm font-bold uppercase tracking-widest opacity-60">
        Taking you to the clip…
      </p>
    </div>
  );
}
