import { clips, site, stats } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { InstagramIcon, PlayIcon, TikTokIcon } from '@/components/Icons';

/** Social proof — real follower counts and real video stats only. */
export function SocialProof() {
  const top = [...clips].sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 3);

  return (
    <section id="proof" className="relative border-y border-[var(--line)] bg-[var(--bg-soft)]/50 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">The Numbers Don’t Lie</p>
          <h2 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
            NiqNation is <span className="text-grad">growing</span>
          </h2>
        </Reveal>

        {/* platform stats */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="glass flex items-center justify-between gap-6 p-8">
              <div>
                <p className="eyebrow !text-[0.62rem] mb-2">TikTok — @.thatgirlniq</p>
                <p className="font-display text-5xl font-extrabold text-grad">{stats.tiktokFollowers}</p>
                <p className="mt-1 text-sm text-[var(--ink-dim)]">followers</p>
                <p className="mt-4 text-sm text-[var(--ink-faint)]">
                  {stats.tiktokLikes} likes · {stats.tiktokVideos} videos
                </p>
              </div>
              <TikTokIcon className="h-14 w-14 shrink-0 text-[var(--ink-faint)]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="glass flex items-center justify-between gap-6 p-8">
              <div>
                <p className="eyebrow !text-[0.62rem] mb-2">Instagram — @thatgirlniq</p>
                <p className="font-display text-5xl font-extrabold text-grad">{stats.instagramFollowers}</p>
                <p className="mt-1 text-sm text-[var(--ink-dim)]">followers</p>
                <p className="mt-4 text-sm text-[var(--ink-faint)]">{stats.instagramPosts} posts</p>
              </div>
              <InstagramIcon className="h-14 w-14 shrink-0 text-[var(--ink-faint)]" />
            </div>
          </Reveal>
        </div>

        {/* most-viewed videos */}
        <Reveal delay={150}>
          <h3 className="display-hero mt-20 text-3xl sm:text-4xl">
            Most-viewed <span className="outline-text">drops</span>
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {top.map((clip, i) => (
            <Reveal key={clip.id} delay={i * 100}>
              <a
                href={`${site.tiktokUrl}/video/${clip.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group block p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--magenta)]/50 hover:shadow-[0_18px_60px_rgba(255,45,154,0.15)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl font-extrabold text-grad">{clip.views}</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-[var(--bg-card)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
                    <PlayIcon className="h-3 w-3" />
                    views
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-[var(--ink)]">{clip.caption}</p>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--ink-faint)]">
                  <TikTokIcon className="h-3.5 w-3.5" />
                  Watch on TikTok
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
