/**
 * All page copy and every real-world fact lives here, so the client can edit
 * the page without touching components.
 *
 * Anything still wrapped in [BRACKETS] is a placeholder waiting on a real
 * value — search the file for "[" before going live.
 */

export const site = {
  name: "Freedom AI",
  /** Shown in the nav and above the registration form. */
  sessionDate: "[DATE]",
  sessionTime: "[TIME + TIMEZONE]",
  /** Telegram channel holding the full testimonial feed. */
  testimonialsUrl: "[TELEGRAM TESTIMONY CHANNEL LINK]",
  year: new Date().getFullYear(),
} as const;

export const cta = {
  primary: "Experience AI trading live",
  secondary: "Join today's live session",
  nav: "Join the live session",
} as const;

/**
 * The scrolling bar above the nav.
 * [The third phrase was cut off in the reference screenshot — replace or drop it.]
 */
export const ticker = [
  "Limited to 50 active traders",
  "AI advantage is here",
] as const;

export const hero = {
  badge: "Trade smart Live Freer fit dey here",
  eyebrowAccent: "Trade smarter.",
  eyebrowRest: "Live freer.",
  /** Desktop sets the headline in caps with numerals; mobile spells it out. */
  headline: {
    desktop: { plain: "Skip the 5-year grind.", accent: "Trade with AI in 3 days." },
    mobile: { plain: "Skip the five-year grind. Trade with AI in", accent: "three days." },
  },
  body: "Ditch endless guessing and confusing charts. Experience how AI-assisted analysis can help you identify potential setups, simplify the process and make clear, confident decisions.",
  ctaLine1: "Join the free 3-day",
  ctaLine2: "AI trading experience",
  note: "Free to attend",
} as const;

export const shift = {
  eyebrow: "The shift",
  heading: "The way people trade is changing.",
  lines: [
    "Gone are the days of spending hours staring at charts searching for the perfect setup.",
    "Gone are the days of manually checking multiple timeframes, confirmations and conditions before every single trade.",
    "Gone are the days of second-guessing every entry because you're not sure what you missed.",
  ],
} as const;

export const intro = {
  eyebrow: "Introducing",
  heading: site.name,
  body: "Freedom AI brings AI-assisted analysis into the trading process — helping you read the market and identify potential setups without manually doing every single step yourself.",
  caveat: "It isn't a promise of profit. It's a different way of approaching the work.",
  points: [
    { icon: "chart", label: "Scans conditions across multiple timeframes" },
    { icon: "search", label: "Surfaces potential setups for your review" },
    { icon: "brain", label: "Leaves the decision — and the risk — with you" },
  ],
} as const;

export const curiosity = {
  heading: "What if you could see it for yourself?",
  body: "Don't spend another year wondering whether AI can really change the way you approach trading. Come and experience it live.",
  offer: "Join my free 3-day AI trading experience",
  offerBody:
    "For three days you'll watch me trade live, see exactly how AI is used in the process, and experience what AI-assisted trading actually looks like.",
} as const;

export const comparison = {
  eyebrow: "The difference",
  heading: "Two ways to approach the same chart.",
  oldWay: {
    label: "The old way",
    items: [
      "Years of trying to master everything",
      "Hours staring at charts",
      "Manually checking multiple timeframes",
      "Hunting for confirmations everywhere",
      "Constantly second-guessing your entries",
    ],
  },
  newWay: {
    label: "The AI-assisted way",
    items: [
      "AI-assisted market analysis",
      "Faster analysis across multiple conditions",
      "Potential setups identified for review",
      "Less time manually scanning charts",
      "More focus on decisions and risk management",
    ],
  },
  disclaimer:
    "AI doesn't remove the risk from trading. It changes how you approach the process.",
} as const;

export const imagine = {
  eyebrow: "Imagine this",
  heading: "You open your phone.",
  lines: [
    "Instead of spending hours going through charts, an AI-assisted system is already helping you analyze the market.",
    "You can see what it's identifying. You watch the analysis unfold.",
    "You understand **why** a potential setup is being considered.",
    "And instead of wondering what trading looks like — you're experiencing it live.",
  ],
  kicker: "That's what I want you to experience.",
  mock: {
    status: "Live",
    alertLabel: "Potential setup identified",
    alertBody:
      "Multiple timeframes aligned. Awaiting your review before any decision.",
    timeframes: ["H4", "H1", "M15"],
    timeframeState: "Checked",
  },
} as const;

export const days = {
  eyebrow: "What happens",
  heading: "Three days. Three live sessions. No theory.",
  items: [
    {
      number: "01",
      title: "See it",
      body: "Watch a live AI-assisted trading session — the full process, in real time, nothing edited out.",
      short: "Watch a live AI-assisted trading session, start to finish.",
    },
    {
      number: "02",
      title: "Understand it",
      body: "See how the analysis and the decision-making process work, and why a setup gets considered at all.",
      short: "See how the analysis and decision-making process works.",
    },
    {
      number: "03",
      title: "Experience it",
      body: "Another live session — then decide for yourself whether AI-assisted trading is something you want to explore further.",
      short: "Another live session — then decide if this is worth exploring further.",
    },
  ],
} as const;

export const testimonials = {
  heading: "Don't just take my word for it.",
  body: "Messages and screenshots shared by people inside the community.",
  linkLabel: "See more community feedback",
  /**
   * Real screenshots from /public/images. Because these show individual
   * results, the disclaimer below must stay visible next to them.
   */
  gallery: [
    { src: "/images/testimonial-1.jpeg", width: 880, height: 1080 },
    { src: "/images/testimonial-2.jpeg", width: 805, height: 1080 },
    { src: "/images/testimonial-3.jpeg", width: 807, height: 1080 },
    { src: "/images/testimonial-4.jpeg", width: 998, height: 1080 },
    { src: "/images/testimonial-5.jpeg", width: 733, height: 1280 },
    { src: "/images/testimonial-6.jpeg", width: 496, height: 1080 },
  ],
  imageAlt: "Screenshot shared by a member of the Freedom AI community",
  resultsDisclaimer:
    "Individual results shared by community members. These are not verified by us, are not typical, and are not a promise or projection of future results. Trading carries a risk of losing your capital.",
} as const;

/**
 * Accountability block: who runs this, and under what legal entity.
 *
 * NOTE: the bracketed values are the only honest way to ship this before the
 * real details exist — a named individual presented as legally responsible for
 * a trading site must be a real, correct person. Replace every [BRACKET] below
 * before this page goes live.
 */
export const owner = {
  eyebrow: "Who is behind this",
  heading: "There's a real person behind Freedom AI.",
  name: "[FULL NAME]",
  role: "[ROLE — e.g. Founder & Lead Trader]",
  /** Optional headshot in /public/images; falls back to a monogram. */
  photo: null as string | null,
  bio: [
    "I've spent [NUMBER] years trading the markets, and most of those years were the slow way — screens full of charts, timeframes checked by hand, and plenty of decisions I second-guessed afterwards.",
    "Freedom AI came out of that. It's the process I actually use, with AI doing the scanning I used to do manually. I run every live session myself, and I show the trades that don't work alongside the ones that do.",
  ],
  commitments: [
    "Every live session is run personally — nothing is outsourced or pre-recorded.",
    "Losing trades are shown alongside winning ones.",
    "No signal is ever sold as a guarantee, and no account is ever managed on your behalf.",
  ],
} as const;

export const finalCta = {
  heading: "Ready to experience AI trading for yourself?",
  body: "You don't have to decide today whether this is for you. Just come and watch one live session — then judge it with your own eyes.",
  assurances: [
    "Completely free to attend",
    "Live, not pre-recorded",
    "No experience needed to attend",
  ],
  formEyebrow: "Save your seat",
  formNote: "You'll get the session link by email and WhatsApp. Leave any time.",
} as const;

export const footer = {
  disclaimerLead: "Risk disclaimer.",
  disclaimer:
    "Trading foreign exchange, CFDs and other leveraged instruments carries a high level of risk and can result in the loss of all of your capital. Freedom AI provides AI-assisted analysis and education only — it does not provide financial advice, does not execute trades on your behalf, and does not guarantee any result. Past performance is not indicative of future results. Only trade with money you can afford to lose. [ADD YOUR COMPANY NAME, REGISTRATION AND JURISDICTION HERE]",
  links: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ],
} as const;

/* -------------------------------------------------------------------------
   Visual sections
   ------------------------------------------------------------------------- */

/**
 * Real imagery slots. Drop files into /public/images and set the paths here —
 * each component falls back to a drawn mock until a real file is provided.
 * Use genuine screenshots only; never a mock-up presented as the real thing.
 */
export const media = {
  /** A real screenshot of the Telegram channel with an AI analysis post. */
  telegramScreenshot: null as string | null,
} as const;

/** Illustrative pair tiles — shapes only, not a live feed and not a track record. */
export const marketStrip = {
  note: "Illustrative — not a live feed",
  pairs: [
    { pair: "EUR/USD", trace: [12, 14, 13, 16, 15, 18, 21, 20, 23, 26], up: true },
    { pair: "GBP/USD", trace: [22, 20, 21, 18, 19, 16, 15, 17, 14, 12], up: false },
    { pair: "XAU/USD", trace: [10, 13, 12, 15, 19, 18, 22, 25, 24, 28], up: true },
    { pair: "USD/JPY", trace: [18, 17, 19, 20, 18, 21, 20, 23, 22, 25], up: true },
    { pair: "BTC/USD", trace: [24, 21, 23, 19, 20, 17, 19, 16, 15, 13], up: false },
  ],
} as const;

export const telegram = {
  eyebrow: "Inside the channel",
  heading: "How the AI reaches you on Telegram.",
  body: "You don't install anything or learn a new platform. The analysis lands in a Telegram channel you already know how to use — and every post shows its reasoning, not just a verdict.",
  note: "Illustrative example of a channel post — not a signal or a recommendation.",
  steps: [
    {
      number: "01",
      title: "The AI scans",
      body: "Conditions across several timeframes are checked continuously, without anyone staring at a chart.",
    },
    {
      number: "02",
      title: "A potential setup is posted",
      body: "When conditions line up, the channel gets a post: the pair, the context, and what the analysis is reacting to.",
    },
    {
      number: "03",
      title: "You decide",
      body: "In the live sessions I walk through the reasoning out loud. The entry, the size and the risk stay your call.",
    },
  ],
  thread: {
    channel: "Freedom AI · Live Analysis",
    members: "[MEMBER COUNT] members",
    messages: [
      {
        kind: "text" as const,
        time: "09:14",
        body: "Morning scan running across EUR/USD, GBP/USD, XAU/USD.",
      },
      {
        kind: "setup" as const,
        time: "09:41",
        pair: "XAU/USD",
        label: "Potential setup identified",
        lines: [
          "H4 and H1 structure aligned",
          "Reaction from prior demand zone",
          "Awaiting M15 confirmation",
        ],
        footer: "Analysis only. Not financial advice — manage your own risk.",
      },
      {
        kind: "text" as const,
        time: "09:46",
        body: "Going live in 15 minutes to walk through why this one qualified — and why two others didn't.",
      },
    ],
  },
} as const;

export const scanVisual = {
  oldLabel: "Checking it by hand",
  newLabel: "AI-assisted pass",
} as const;
