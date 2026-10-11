import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
} as const;

export const InstagramIcon = (props: P) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTokIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4c.6 2.6 2.4 4.4 5 5" />
  </svg>
);

export const FacebookIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3.5H9V21h3.8v-8.5h2.7l.5-3.5h-3.2V6.8c0-.6.4-1 .9-1H15Z" />
  </svg>
);

export const YoutubeIcon = (props: P) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10.5 9.5 5 2.5-5 2.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const XIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

export const socialIcons = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  x: XIcon,
} as const;

export const PlayIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5.5v13l11-6.5Z" />
  </svg>
);

export const ArrowUpRight = (props: P) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const MicIcon = (props: P) => (
  <svg {...base} {...props}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
  </svg>
);

export const StarIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.6 14.9 8.7l6.6.9-4.8 4.6 1.2 6.6L12 17.9l-5.9 2.9 1.2-6.6L2.5 9.6l6.6-.9Z" />
  </svg>
);

export const SunIcon = (props: P) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);

export const MoonIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
  </svg>
);

export const MenuIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const CloseIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const TicketIcon = (props: P) => (
  <svg {...base} {...props}>
    <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4Z" />
    <path d="M13 6v2M13 11v2M13 16v2" strokeDasharray="0" />
  </svg>
);

export const ShareIcon = (props: P) => (
  <svg {...base} {...props}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="17.5" cy="5.5" r="2.5" />
    <circle cx="17.5" cy="18.5" r="2.5" />
    <path d="m8.3 10.8 6.9-4M8.3 13.2l6.9 4" />
  </svg>
);

export const VideoIcon = (props: P) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="6" width="13" height="12" rx="3" />
    <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
  </svg>
);

export const LogoMark = (props: P) => (  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#niq-g)" />
    <path
      d="M13 15v5h6.5v13h5V20H31v-5H13Z"
      fill="#0a0a0a"
    />
    <circle cx="36.5" cy="33.5" r="3.5" fill="#e8ff3c" />
    <defs>
      <linearGradient id="niq-g" x1="2" y1="2" x2="46" y2="46">
        <stop stopColor="#8b5cf6" />
        <stop offset="0.55" stopColor="#ff2d9a" />
        <stop offset="1" stopColor="#ffc53d" />
      </linearGradient>
    </defs>
  </svg>
);

/* ---------- share platform icons (fill-based brand glyphs) ---------- */

export const WhatsAppIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.03h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);

export const TelegramIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.94 0A12 12 0 1 0 24 12.06 12 12 0 0 0 11.94 0Zm5.89 8.16-1.97 9.3c-.15.66-.54.82-1.09.51l-3-2.21-1.45 1.4c-.16.16-.3.3-.6.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.37-.12l-6.87 4.33-2.96-.93c-.64-.2-.66-.64.14-.95l11.57-4.46c.54-.2 1.01.13.83.9Z" />
  </svg>
);

export const SmsIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 2a3 3 0 0 0-3 3v18l6-4h13a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H4Zm2.5 6.5h2v2h-2v-2Zm5 0h2v2h-2v-2Zm5 0h2v2h-2v-2Z" />
  </svg>
);

export const LinkIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const QrIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM21 14v1M14 21h1M18 18h3v3h-3z" />
  </svg>
);

export const DownloadIcon = (props: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
