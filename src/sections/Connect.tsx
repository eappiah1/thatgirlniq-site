import { site } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { ArrowUpRight, InstagramIcon, TikTokIcon, VideoIcon } from '@/components/Icons';

const channels = [
  {
    label: 'TikTok',
    handle: '@.thatgirlniq',
    url: site.tiktokUrl,
    icon: TikTokIcon,
    blurb: 'Daily content — comedy bits, boy-mom life, braids, and NC gems. 520 videos deep.',
  },
  {
    label: 'Instagram',
    handle: '@thatgirlniq',
    url: site.instagramUrl,
    icon: InstagramIcon,
    blurb: 'Reels, highlights, and the bio that says it all. 24K strong.',
  },
  {
    label: 'Live on Zoom',
    handle: 'Virtual live shows',
    url: site.zoomUrl,
    icon: VideoIcon,
    blurb: 'Catch the set live from anywhere. Pull up.',
  },
];

/** Connect / follow — every card links to a verified destination. */
export function Connect() {
  return (
    <section id="follow" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
      <Reveal>
        <p className="eyebrow mb-4">Tap In</p>
        <h2 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
          Connect with <span className="text-grad">Niq</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {channels.map((ch, i) => (
          <Reveal key={ch.label} delay={i * 100}>
            <a
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--magenta)]/50 hover:shadow-[0_18px_60px_rgba(139,92,246,0.15)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--grad)] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <ch.icon className="h-7 w-7" />
              </span>
              <h3 className="font-display mt-6 text-2xl font-bold">{ch.label}</h3>
              <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.15em] text-[var(--magenta)]">
                {ch.handle}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink-dim)]">{ch.blurb}</p>
              <span className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink-faint)] transition-colors group-hover:text-[var(--neon)]">
                Follow
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
