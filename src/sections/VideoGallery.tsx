import { useMemo, useState } from 'react';
import { clips, igReels, site } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { ArrowUpRight, InstagramIcon, TikTokIcon } from '@/components/Icons';
import { ShareMenu } from '@/components/ShareMenu';
import { clipShareUrl } from '@/lib/share';

type Filter = 'all' | string;

/** Video gallery — official TikTok embeds + real Instagram reel links. */
export function VideoGallery() {
  const filters = useMemo(() => {
    const set = new Set<string>();
    clips.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return ['all', ...set];
  }, []);
  const [filter, setFilter] = useState<Filter>('all');

  const shown = useMemo(
    () => (filter === 'all' ? clips : clips.filter((c) => c.tags.includes(filter))),
    [filter]
  );

  return (
    <section id="videos" className="relative border-y border-[var(--line)] bg-[var(--bg-soft)]/50 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">The Vault</p>
              <h2 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
                Watch the <span className="text-grad">sets</span>
              </h2>
            </div>
            <a
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost self-start md:self-auto"
            >
              <TikTokIcon className="h-4 w-4" />
              All 520 videos on TikTok
            </a>
          </div>
        </Reveal>

        {/* filters — derived from real post hashtags */}
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Filter videos">
            {filters.map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-5 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                  filter === key
                    ? 'border-transparent bg-[var(--grad)] text-white shadow-[0_6px_24px_rgba(255,45,154,0.35)]'
                    : 'border-[var(--line)] text-[var(--ink-dim)] hover:border-[var(--magenta)] hover:text-[var(--magenta)]'
                }`}
              >
                {key === 'all' ? 'All' : key}
              </button>
            ))}
          </div>
        </Reveal>

        {/* TikTok embeds — thumbnails load straight from TikTok */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((clip, i) => (
            <Reveal key={clip.id} delay={(i % 3) * 90}>
              <article
                data-clip-card
                className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-black transition-all duration-300 hover:-translate-y-1 hover:border-[var(--magenta)]/50"
              >
                <div className="absolute right-3 top-3 z-20">
                  <ShareMenu
                    url={clipShareUrl(clip.id)}
                    title="ThatGirlNiq on TikTok"
                    text={`"${clip.caption}" — ${clip.views} views. You gotta watch this 🔥🎤`}
                    detail={{ clip: clip.id }}
                    className="glass flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
                  />
                </div>
                <iframe
                  src={`https://www.tiktok.com/embed/${clip.id}`}
                  title={`ThatGirlNiq on TikTok: ${clip.caption}`}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; clipboard-write"
                  allowFullScreen
                  scrolling="no"
                  className="aspect-[9/13] w-full"
                />
                <div className="space-y-2 border-t border-[var(--line)] bg-[var(--bg-soft)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-dim)]">
                      <TikTokIcon className="h-3.5 w-3.5 text-[var(--magenta)]" />
                      {clip.views} views
                    </span>
                    <div className="flex gap-1.5">
                      {clip.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[var(--bg-card)] px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-[var(--ink-faint)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-snug text-[var(--ink)]">{clip.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Instagram reels — real posts linked from the profile */}
        <Reveal delay={100}>
          <div className="mt-20 flex items-end justify-between gap-6">
            <h3 className="display-hero text-3xl sm:text-4xl">
              Fresh from the <span className="text-grad">’Gram</span>
            </h3>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hidden !px-5 !py-2 text-xs sm:inline-flex"
            >
              <InstagramIcon className="h-4 w-4" />
              @thatgirlniq
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {igReels.map((reel, i) => (
            <Reveal key={reel.url} delay={(i % 3) * 80}>
              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center justify-between gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--magenta)]/50"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--grad)] text-white">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{reel.caption}</p>
                    <p className="mt-0.5 text-xs text-[var(--ink-faint)]">{reel.date}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--ink-faint)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--neon)]" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
