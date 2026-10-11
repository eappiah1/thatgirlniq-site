import { site } from '@/data/content';
import { useCountdown } from '@/hooks/useCountdown';
import { Reveal } from '@/components/Reveal';
import { VideoIcon } from '@/components/Icons';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Live virtual shows on Zoom. No date is published on the verified
 * links yet, so with `site.nextLiveShow === null` this renders a
 * "coming soon" countdown placeholder; set a date in content.ts and
 * the real timer starts automatically.
 */
export function LiveShows() {
  const t = useCountdown(site.nextLiveShow ?? undefined);
  const hasDate = !!site.nextLiveShow && !t.past;

  const cells = hasDate
    ? [
        { label: 'days', value: pad(t.days) },
        { label: 'hours', value: pad(t.hours) },
        { label: 'mins', value: pad(t.minutes) },
        { label: 'secs', value: pad(t.seconds) },
      ]
    : [
        { label: 'days', value: '--' },
        { label: 'hours', value: '--' },
        { label: 'mins', value: '--' },
        { label: 'secs', value: '--' },
      ];

  return (
    <section id="live" className="relative overflow-hidden py-28 md:py-36">
      {/* magenta glow backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,45,154,0.14),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">From Her Screen To Yours</p>
          <h2 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
            Live <span className="text-grad">virtual</span> shows
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-dim)]">
            Niq goes live on Zoom — pull up a seat from anywhere and catch the set in real time. No dress code. Loud
            laughter encouraged.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-3 sm:gap-5">
            {cells.map((c, i) => (
              <div key={c.label} className="glass px-2 py-6 sm:py-8">
                <p
                  className={`font-display text-4xl font-extrabold tabular-nums sm:text-6xl ${
                    i % 2 === 0 ? 'text-grad' : ''
                  }`}
                  aria-hidden="true"
                >
                  {c.value}
                </p>
                <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[var(--ink-faint)]">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-[var(--ink-faint)]" role="status">
            {hasDate
              ? 'Until the next live set'
              : 'Next live set — date dropping soon. Follow TikTok & IG so you don’t miss it.'}
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={site.zoomUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <VideoIcon className="h-4 w-4" />
              Join Next Live Set
            </a>
            <a
              href={site.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--ink-dim)] underline-offset-4 transition-colors hover:text-[var(--magenta)] hover:underline"
            >
              Or save the Zoom room link →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
