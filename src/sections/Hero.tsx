import { useEffect, useState } from 'react';
import { clips, site } from '@/data/content';
import { InstagramIcon, PlayIcon, TikTokIcon, VideoIcon } from '@/components/Icons';

/**
 * Full-screen hero. Background is Niq's real profile photo (pulled from
 * her TikTok account) with a slow Ken Burns drift. The featured card is
 * her most-viewed TikTok video, embedded officially.
 */
export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const featured = clips[0];

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* background — real profile photo */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={site.heroImage}
          alt=""
          className="ken-burns h-full w-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[color-mix(in_srgb,var(--bg)_45%,transparent)] to-[color-mix(in_srgb,var(--bg)_60%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg)_135%)] opacity-80" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[7fr_5fr] lg:items-center">
        <div>
          <p
            className={`eyebrow mb-5 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            {site.location} · Comedy & real life
          </p>

          <h1 className="display-hero text-[clamp(2rem,10.5vw,9.25rem)] leading-[0.85]">
            <span
              className={`block transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
              ThatGirl
            </span>
            <span
              className={`text-grad block transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
              Niq
            </span>
          </h1>

          <p
            className={`mt-7 max-w-lg text-lg leading-relaxed text-[var(--ink-dim)] transition-all duration-700 delay-300 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {site.tagline}
          </p>

          <div
            className={`mt-9 flex flex-wrap items-center gap-4 transition-all duration-700 delay-400 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <a href="#videos" className="btn btn-primary">
              <PlayIcon className="h-4 w-4" />
              Watch My Sets
            </a>
            <a href={site.zoomUrl} target="_blank" rel="noopener noreferrer" className="btn btn-neon">
              <VideoIcon className="h-4 w-4" />
              Join Live Show
            </a>
          </div>

          <div
            className={`mt-10 flex items-center gap-5 transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="eyebrow !text-[0.65rem]">Follow the journey</span>
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>

        {/* featured video — her most-viewed TikTok, embedded */}
        <div
          className={`transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="overflow-hidden rounded-2xl border border-[var(--line)] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <iframe
              src={`https://www.tiktok.com/embed/${featured.id}`}
              title={`ThatGirlNiq on TikTok: ${featured.caption}`}
              allow="encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              scrolling="no"
              className="aspect-[9/13] w-full bg-black"
            />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--ink-faint)]">
            Most viewed — {featured.views} views · @{'.thatgirlniq'} on TikTok
          </p>
        </div>
      </div>

      {/* scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 right-6 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] sm:flex"
      >
        <span className="relative flex h-full w-full items-center justify-center">
          <span className="scroll-dot absolute h-1.5 w-1.5 rounded-full bg-[var(--neon)]" />
        </span>
      </a>
    </section>
  );
}
