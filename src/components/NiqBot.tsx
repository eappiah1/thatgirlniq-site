import { useEffect, useRef, useState } from 'react';
import { clips, igReels, site, stats } from '@/data/content';

/**
 * NiqBot — rule-based chat widget.
 * Answers are assembled ONLY from the verified data in content.ts
 * (bio, stats, real clip captions, the Zoom room). No API, no keys.
 * Fallback line is verbatim from the project brief.
 */

interface BotReply {
  text: string;
  link?: { label: string; href: string };
}

interface Message {
  from: 'bot' | 'user';
  reply: BotReply;
}

const FALLBACK: BotReply = {
  text: "I'm just a bot, but ThatGirlNiq is the real deal. Follow her on TikTok for the real answers. 🎤",
  link: { label: 'TikTok @.thatgirlniq', href: site.tiktokUrl },
};

interface Intent {
  match: RegExp;
  reply: () => BotReply;
}

const topClip = clips[0]; // grid is ordered by views — first = highest

const INTENTS: Intent[] = [
  {
    match: /\b(hi|hii+|hello|hey|heyy+|yo|sup|what'?s up|good (morning|afternoon|evening))\b/i,
    reply: () => ({
      text: "Hey hey! 👋🏾 Welcome to NiqNation. Ask me about shows, clips, or the vibes — I know things.",
    }),
  },
  {
    match: /who (is|are)|what is a thatgirlniq|about (you|niq)|yourself|bio/i,
    reply: () => ({
      text: `ThatGirlNiq — Niq for short. ${site.instagramBio.split('|')[0].trim()} | ${site.tagline}. Based in ${site.location}, running ${stats.tiktokVideos} TikToks deep with ${stats.tiktokLikes} likes and counting. The bio says it all.`,
      link: { label: 'Instagram @thatgirlniq', href: site.instagramUrl },
    }),
  },
  {
    match: /next show|when.*show|show.*when|upcoming|live show|livestream|live stream|countdown|tour/i,
    reply: () => ({
      text: "No date announced yet — but the room is ready. The second Niq posts a show date, the countdown on this site starts ticking. Keep an eye on her TikTok for the drop. 👀",
      link: { label: 'TikTok @.thatgirlniq', href: site.tiktokUrl },
    }),
  },
  {
    match: /watch|clips|videos|funny|best of|where.*(see|content)/i,
    reply: () => ({
      text: `Everything lives on TikTok — ${stats.tiktokVideos} videos, ${stats.tiktokLikes} likes. Top clip right now: "${topClip.caption}" with ${topClip.views} views. The Video Vault section up top has a whole grid of her real clips embedded.`,
      link: { label: 'Watch on TikTok', href: site.tiktokUrl },
    }),
  },
  {
    match: /zoom|join|how.*(join|attend|watch live)|ticket|rsvp|virtual/i,
    reply: () => ({
      text: "Easy — hit the Zoom link, same room every time. Camera optional, laughing mandatory. Links are in the Live section of this site too.",
      link: { label: 'Join the Zoom room', href: site.zoomUrl },
    }),
  },
  {
    match: /style|comedy style|type of comedy|stand ?up|standup|pov|genre/i,
    reply: () => ({
      text: `A mix: stand-up sets, POV bits, and everyday-life comedy — boy-mom chaos, relationship advice ("AHT AHT! Chin up, chest out."), NC gems, and a little hair & style on the side. "${topClip.caption}" is the flavor. 😂`,
    }),
  },
  {
    match: /instagram|\big\b|reels?|posts?\b/i,
    reply: () => ({
      text: `IG is @thatgirlniq — ${stats.instagramFollowers} followers, ${stats.instagramPosts} posts. New reels drop constantly; the freshest is from ${igReels[0].date}. Also peep @braidedbyniq for the hair magic. 💇🏾‍♀️`,
      link: { label: 'Instagram @thatgirlniq', href: site.instagramUrl },
    }),
  },
  {
    match: /tiktok|followers|likes|fans|follow|stats|numbers/i,
    reply: () => ({
      text: `Real numbers: ${stats.tiktokFollowers} TikTok followers, ${stats.tiktokLikes} likes across ${stats.tiktokVideos} videos, and ${stats.instagramFollowers} on IG. Organic, no bought followers — NiqNation shows up. ✊🏾`,
      link: { label: 'TikTok @.thatgirlniq', href: site.tiktokUrl },
    }),
  },
  {
    match: /hair|braid|style|locs|look/i,
    reply: () => ({
      text: "Two answers: watch the 'NEW STYLE ALERT 🚨' clip for the #cassiebraids breakdown, and follow @braidedbyniq — that's her braid page, straight from the bio. 💇🏾‍♀️",
    }),
  },
  {
    match: /where.*(from|live|located)|location|nc|north carolina|city|state/i,
    reply: () => ({
      text: "📍 NC — that's straight off the TikTok bio. North Carolina gems only.",
    }),
  },
  {
    match: /kids|boy ?mom|sons|family|mom\b|baby/i,
    reply: () => ({
      text: "Boy mom x2 👦🏽👶🏽 — her words. The little ones make cameos; 'Khloe is running a strict program' is a whole moment. #BoyMomSoftikTok",
    }),
  },
  {
    match: /book|hire|collab|business|brand|email|contact|manager/i,
    reply: () => ({
      text: "For booking/collabs, DM her on Instagram — that's the move. Niq reads her own messages. 📲",
      link: { label: 'DM @thatgirlniq', href: site.instagramUrl },
    }),
  },
  {
    match: /love|fan|amazing|funny|best|goat|queen|icon|slay/i,
    reply: () => ({
      text: "AHT AHT! Flattery will get you everywhere. Chin up, chest out — and tell a friend about NiqNation. 😌✊🏾",
    }),
  },
  {
    match: /thank|thanks|thx|appreciated/i,
    reply: () => ({
      text: "Anytime, bookie. Now go run them views up. 🎤",
    }),
  },
  {
    match: /bot|robot|ai|human|real\?/i,
    reply: () => ({
      text: "Rule-based bot, Niq's real data, zero AI keys — everything I say traces back to her actual pages. The sass, however, is open-source.",
    }),
  },
];

function answer(input: string): BotReply {
  const q = input.trim();
  if (!q) return FALLBACK;
  for (const intent of INTENTS) {
    if (intent.match.test(q)) return intent.reply();
  }
  return FALLBACK;
}

const SUGGESTIONS = [
  'When is the next show?',
  'Where can I watch your clips?',
  'How do I join the Zoom show?',
  "What's your comedy style?",
];

const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 2-7 20-4-9-9-4z" />
    <path d="M22 2 11 13" />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export function NiqBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      reply: {
        text: "Hey, I'm NiqBot 🤖 — I know everything on this site and I'm not afraid to say it. Ask away.",
      },
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', reply: { text } }, { from: 'bot', reply: answer(text) }]);
    setInput('');
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        aria-label={open ? 'Close NiqBot chat' : 'Chat with NiqBot'}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--magenta)] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:bottom-5 md:right-5"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="NiqBot chat"
          className="fixed bottom-[8.75rem] right-4 z-50 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] shadow-2xl md:bottom-[5.5rem] md:right-5"
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
          <div className="flex items-center gap-3 border-b border-[var(--line)] bg-[var(--bg-card)] px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--magenta)] text-lg text-white">🎤</span>
            <div>
              <p className="text-sm font-bold leading-tight">NiqBot</p>
              <p className="text-xs opacity-60">Powered by real Niq facts · no AI keys</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    m.from === 'user'
                      ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--magenta)] px-3 py-2 text-sm text-white'
                      : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-[var(--bg-card)] px-3 py-2 text-sm'
                  }
                >
                  <p className="whitespace-pre-wrap">{m.reply.text}</p>
                  {m.reply.link && (
                    <a
                      href={m.reply.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold underline-offset-2 hover:underline"
                    >
                      {m.reply.link.label} ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--line)] px-3 pt-2">
            <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--bg-card)] px-3 py-1 text-xs opacity-90 transition-opacity hover:opacity-100"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2 pb-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask NiqBot…"
                aria-label="Message NiqBot"
                className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--bg-card)] px-4 py-2 text-sm outline-none placeholder:opacity-50 focus:border-[var(--magenta)]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--magenta)] text-white transition-opacity hover:opacity-90"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
