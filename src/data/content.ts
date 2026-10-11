/**
 * ─────────────────────────────────────────────────────────────
 *  ThatGirlNiq — SITE CONTENT (single source of truth)
 *
 *  RULE: every fact below was extracted live from the verified
 *  sources only:
 *    • TikTok  https://www.tiktok.com/@.thatgirlniq
 *    • Instagram https://www.instagram.com/thatgirlniq/
 *    • Zoom (virtual live shows)
 *      https://us06web.zoom.us/j/85605782390?pwd=wenmJAWbK0PXx13NPGK47czGsj7bnF.1
 *  Nothing here is invented. See README.md before editing.
 * ─────────────────────────────────────────────────────────────
 */

export interface VideoClip {
  /** TikTok video id — drives the official embed */
  id: string;
  /** Real caption from the post (cleaned of the auto suffix) */
  caption: string;
  /** Real view count as shown on the profile */
  views: string;
  /** Derived purely from the post's own hashtags */
  tags: string[];
  /** Card thumbnail — a real cover downloaded from the post */
  cover?: string;
}

export interface IgReel {
  /** Real post URL */
  url: string;
  /** Real accessibility caption from the post thumbnail */
  caption: string;
  date: string;
}

export const site = {
  brand: 'ThatGirlNiq',
  name: 'Niq',
  /** TikTok bio: "📍NC / IG: thatgirlniq" */
  tiktokBio: '📍NC\nIG: thatgirlniq',
  /** Instagram bio (verbatim) */
  instagramBio:
    '29 | #BoyMom x2 👦🏽👶🏽| #NiqNation ✊🏾 | #HbcuGrad 🎓 | @braidedbyniq 💇🏾‍♀️ | 👻 sheniquika',
  /** A short display tagline assembled from her own bio lines */
  tagline: '#NiqNation ✊🏾 · #BoyMom x2 · #HbcuGrad 🎓',
  location: 'NC',
  tiktokUrl: 'https://www.tiktok.com/@.thatgirlniq',
  instagramUrl: 'https://www.instagram.com/thatgirlniq/',
  /** Her virtual live-show room */
  zoomUrl: 'https://us06web.zoom.us/j/85605782390?pwd=wenmJAWbK0PXx13NPGK47czGsj7bnF.1',
  /** Real images pulled from the accounts */
  heroImage: '/assets/avatar.jpg',
  aboutImage: '/assets/hero-cover.jpg',
  altImage: '/assets/cover-slide.jpg',
  /**
   * Next virtual live set. No date has been published on the
   * verified links, so this stays null and the section renders
   * a "coming soon" countdown placeholder. Set an ISO date here
   * when Niq announces one and the timer starts automatically.
   */
  nextLiveShow: null as string | null,
};

/** Real TikTok stats, read from the profile (Oct 2026). */
export const stats = {
  tiktokFollowers: '8,043',
  tiktokLikes: '648K',
  tiktokVideos: '520',
  instagramFollowers: '24K',
  instagramPosts: '882',
};

/** Real top-viewed videos — TikTok embeds (thumbnails come from TikTok itself). */
export const clips: VideoClip[] = [
  {
    id: '7604286960676408606',
    caption: 'Lights camera action, boo.',
    views: '622.5K',
    tags: ['comedy', 'pov'],
    cover: '/assets/hero-cover.jpg',
  },
  {
    id: '7618695938336378143',
    caption: 'I’ll show you how a b*tch go down a slide.',
    views: '512.1K',
    tags: ['comedy'],
    cover: '/assets/cover-slide.jpg',
  },
  {
    id: '7582642781491858719',
    caption: 'And about that man…',
    views: '461.7K',
    tags: ['comedy'],
    cover: '/assets/cover-man.jpg',
  },
  {
    id: '7624628092631272735',
    caption: 'I’m a mermaid.',
    views: '120.5K',
    tags: ['lifestyle'],
  },
  {
    id: '7609715265881787679',
    caption: 'She know ball for sure. #comedyvideo',
    views: '107.9K',
    tags: ['comedy'],
  },
  {
    id: '7618559548655226142',
    caption: 'Any gay people in here? #standupcomedian',
    views: '968',
    tags: ['comedy', 'stand-up'],
  },
  {
    id: '7612104736589860126',
    caption: 'Let me tell you what else was born in the 1900s. #comedyshow',
    views: '995',
    tags: ['comedy', 'stand-up'],
  },
  {
    id: '7609063918677298463',
    caption: 'We still have some work to do. #comedyvideo',
    views: '1.1K',
    tags: ['comedy'],
  },
  {
    id: '7608375154304961823',
    caption: 'Khloe is running a strict program. #boymomsoftiktok',
    views: '5.6K',
    tags: ['family'],
  },
  {
    id: '7630251588233268510',
    caption: 'Better act like you know, bookie. #promlook',
    views: '3.1K',
    tags: ['hair & style'],
  },
  {
    id: '7638039395362163999',
    caption: 'NEW STYLE ALERT 🚨 Watch me do my hair. #cassiebraids #braidedbyniq',
    views: '4.8K',
    tags: ['hair & style'],
  },
  {
    id: '7621357677247073567',
    caption: 'AHT AHT! Chin up, chest out. #relationshipadvice101',
    views: '3.5K',
    tags: ['comedy'],
  },
];

/** Recent Instagram reels — real posts, linked from the profile. */
export const igReels: IgReel[] = [
  {
    url: 'https://www.instagram.com/thatgirlniq/reel/DeVFIlzvGWY/',
    caption: 'Video by Niq — October 10, 2026',
    date: 'Oct 10, 2026',
  },
  {
    url: 'https://www.instagram.com/thatgirlniq/reel/DeLYDekPUId/',
    caption: 'Video by Niq — October 6, 2026',
    date: 'Oct 6, 2026',
  },
  {
    url: 'https://www.instagram.com/thatgirlniq/reel/DeJzPrjvL_R/',
    caption: 'Video by Niq — October 6, 2026',
    date: 'Oct 6, 2026',
  },
  {
    url: 'https://www.instagram.com/thatgirlniq/reel/Dd9bfczgJ9f/',
    caption: 'Video by Niq — October 1, 2026',
    date: 'Oct 1, 2026',
  },
  {
    url: 'https://www.instagram.com/thatgirlniq/reel/Dd2fc9aOKHY/',
    caption: 'Video by Niq — September 28, 2026',
    date: 'Sep 28, 2026',
  },
  {
    url: 'https://www.instagram.com/thatgirlniq/reel/Dcvnhr1te-Z/',
    caption: 'Video by Niq — September 1, 2026',
    date: 'Sep 1, 2026',
  },
];

/** Recurring hashtags observed across her posts. */
export const hashtags = [
  '#thatgirlniq',
  '#NiqNation',
  '#BoyMom',
  '#HbcuGrad',
  '#comedyvideo',
  '#standupcomedian',
  '#braidedbyniq',
  '#nccontentcreator',
];
