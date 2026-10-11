import { hashtags, site } from '@/data/content';
import { Reveal } from '@/components/Reveal';

/** About — bios are verbatim from her TikTok & Instagram profiles. */
export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* real photo from her account */}
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--line)]">
            <img
              src={site.aboutImage}
              alt="ThatGirlNiq — photo from her TikTok"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg)] to-transparent p-5 pt-16">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[var(--neon)]">
                #NiqNation ✊🏾
              </p>
            </div>
          </div>
          <div className="glass absolute -right-3 top-8 rotate-6 px-5 py-3 sm:-right-6">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[var(--magenta)]">📍 NC</p>
          </div>
        </Reveal>

        {/* bio */}
        <div>
          <Reveal>
            <p className="eyebrow mb-4">The Girl Behind The Name</p>
            <h2 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
              Just Niq <span className="text-grad">being Niq</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass mt-8 space-y-4 p-6">
              <p className="eyebrow !text-[0.62rem]">Instagram bio — @thatgirlniq</p>
              <p className="whitespace-pre-line font-display text-lg font-bold leading-relaxed">{site.instagramBio}</p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="glass mt-5 space-y-4 p-6">
              <p className="eyebrow !text-[0.62rem]">TikTok bio — @.thatgirlniq</p>
              <p className="whitespace-pre-line font-display text-lg font-bold leading-relaxed">{site.tiktokBio}</p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 leading-relaxed text-[var(--ink-dim)]">
              Her content is exactly what the bios promise: comedy skits and stand-up bits — “
              <span className="text-[var(--ink)]">Any gay people in here?</span>” — mixed with boy-mom life, family
              moments, braids and styles from <span className="text-[var(--ink)]">@braidedbyniq</span>, HBCU pride, and
              North Carolina food spots. Real life, loud and unfiltered.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-2">
              {hashtags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--line)] px-4 py-1.5 text-xs font-semibold text-[var(--ink-dim)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
