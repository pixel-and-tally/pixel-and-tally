/*
 * THE CONTENT FILE. Business facts, contact details, offers and copy that
 * more than one page uses. For a client site, rewrite this file and theme.css.
 *
 * Rules: no em dashes, no invented reviews, stats or client names. Leave a
 * field empty ("") rather than guess; the pages hide anything that is empty.
 */
import type { Availability } from "./lib/schedule";

export type Offer = {
  name: string;
  price: string;
  cadence: "one-time" | "monthly";
  summary: string;
  includes: string[];
  turnaround?: string;
};

export type WorkItem = {
  name: string;
  kind: string;
  summary: string;
  url: string;
  // What the build includes, grouped by who uses it. Only list what was actually shipped.
  features?: { group: string; items: string[] }[];
};

export const site = {
  name: "Pixel & Tally",
  tagline: "Design & analytics. Sit back, I've got it.",
  owner: "Blake Turner",
  firstName: "Blake",
  url: "https://pixelandtally.com",
  description:
    "Blake Turner builds websites that take bookings and dashboards that show where the money goes, for Charlotte restaurants and small businesses.",
  serviceArea: "Charlotte first, and any US business remotely.",

  // Contact. Empty values are hidden on the site.
  email: "blake@pixelandtally.com",
  phone: "",
  linkedin: "https://www.linkedin.com/in/blakewturner",
  // Path under public/, e.g. "/blake.jpg". Until set, the site shows initials.
  photo: "",

  // The three tabs, then the rest.
  tabs: [
    { href: "/pixel/", label: "Pixel", blurb: "Websites" },
    { href: "/tally/", label: "Tally", blurb: "Data + automation" },
    {
      href: "/pixel-and-tally/",
      label: "Pixel & Tally",
      blurb: "Pick your own",
    },
  ],
  nav: [
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ],
} as const;

// When visitors can request a call (Eastern time). Weekdays only; calls are face to face over video.
export const availability: Availability = {
  timeZone: "America/New_York",
  callMinutes: 20,
  stepMinutes: 30,
  noticeHours: 18,
  daysAhead: 14,
  weekly: {
    1: [["09:00", "17:00"]],
    2: [["09:00", "17:00"]],
    3: [["09:00", "17:00"]],
    4: [["09:00", "17:00"]],
    5: [["09:00", "17:00"]],
  },
};

export const pixel: Offer[] = [
  {
    name: "Starter Site",
    price: "$1,800",
    cadence: "one-time",
    summary:
      "Up to 5 pages. Customers can book, order or find your hours without calling.",
    includes: [
      "Built for phones first",
      "Online booking, or a menu and order link",
      "Google Business Profile cleaned up",
      "Basic local SEO",
      "First month of Care free",
    ],
    turnaround: "about 2 weeks",
  },
  {
    name: "Booking Site",
    price: "$3,200",
    cadence: "one-time",
    summary:
      "Up to 10 pages, for businesses that run on appointments and want deposits up front.",
    includes: [
      "Booking with deposits or payments",
      "A reviews section (real ones only)",
      "Email signup",
      "Visitor analytics",
      "First month of Care free",
    ],
    turnaround: "3 to 4 weeks",
  },
];

export const pixelPlans: Offer[] = [
  {
    name: "Care",
    price: "$95",
    cadence: "monthly",
    summary:
      "Hosting, security updates, backups and uptime checks, plus 30 minutes of edits a month. Text me when something needs changing.",
    includes: [],
  },
  {
    name: "Care Plus",
    price: "$195",
    cadence: "monthly",
    summary:
      "Everything in Care, 2 hours of edits, one Google profile post a month, and a one-page report on visits, bookings and calls.",
    includes: [],
  },
];

export const tally: Offer[] = [
  {
    name: "Data Checkup",
    price: "$300",
    cadence: "one-time",
    summary:
      "We pull your POS, booking or spreadsheet exports, you and I talk for an hour, and you get one page with the 3 changes worth making.",
    includes: [],
    turnaround: "about 1 week",
  },
  {
    name: "Owner Dashboard",
    price: "$1,500",
    cadence: "one-time",
    summary:
      "One live dashboard from up to 3 sources (say POS, booking and your labor sheet): weekly sales, best and worst sellers, labor %, busy hours. A private web page that updates every night and works on your phone, or built in Tableau or Power BI if you use them. Setup call and handoff included.",
    includes: [],
    turnaround: "about 3 weeks",
  },
];

export const tallyPlans: Offer[] = [
  {
    name: "Dashboard Care",
    price: "$150",
    cadence: "monthly",
    summary:
      "I keep the data flowing and fix things when your tools change, and we do a 30-minute review call each month.",
    includes: [],
  },
  {
    name: "Automation Care",
    price: "$75",
    cadence: "monthly",
    summary:
      "I watch your workflows and connections, fix them when a tool changes, and make one small change a month.",
    includes: [],
  },
];

// Workflows and API connections live on the Tally tab: they move the same data the dashboards read.
export const automations: Offer[] = [
  {
    name: "Workflow Setup",
    price: "$450",
    cadence: "one-time",
    summary:
      "One automation between tools you already use, so a busywork step happens on its own. Built on Zapier or Make in your account, so you own it.",
    includes: [
      "Example: a new booking lands in your spreadsheet and the customer gets a reminder text",
      "Example: a new order or invoice shows up in QuickBooks without retyping",
      "Tested with real data, plus a short video showing how it works",
    ],
    turnaround: "about 1 week",
  },
  {
    name: "API Connection",
    price: "From $800",
    cadence: "one-time",
    summary:
      "A custom link between two systems when there's no ready-made one, like pulling POS sales into your dashboard every night. Simple connections are $800; I quote yours on the call.",
    includes: [
      "Connects to your tools' APIs with your own keys",
      "Retries and an alert if something breaks",
      "Written up so anyone can maintain it",
    ],
    turnaround: "about 2 weeks",
  },
];

export const steps = [
  {
    title: "We talk",
    body: "A free 20-minute video call. You tell me what's annoying you. I tell you what I'd do and what it costs.",
  },
  {
    title: "Price in writing",
    body: "One page with the scope, the price and the launch date. It doesn't change later.",
  },
  {
    title: "We build it",
    body: "You see it come together and you can text me any time. One round of changes is included.",
  },
  {
    title: "Launch",
    body: "We launch it, I walk you through it, and we keep it running each month if you want.",
  },
] as const;

export const shoutouts = [
  "Charlotte native",
  "Text me, I answer",
  "Fixed prices",
  "Websites that book",
  "Numbers that make sense",
  "Busywork on autopilot",
  "One real person",
] as const;

export const offers = [...pixel, ...tally, ...automations];

// What Blake is good at, for the owner section on the home and about pages.
export const expertise = [
  {
    area: "Websites & booking",
    detail:
      "HTML, CSS and JavaScript, built for phones, wired to booking and ordering.",
  },
  {
    area: "SQL & data",
    detail:
      "Cleaning and joining messy exports from POS, booking and spreadsheet tools.",
  },
  {
    area: "Dashboards",
    detail:
      "Tableau and Power BI if you already pay for them. Otherwise a custom live dashboard we build and host, with no license to buy.",
  },
  {
    area: "Automation & APIs",
    detail:
      "Python and workflow tools that move data between the apps you already pay for.",
  },
  {
    area: "Money side",
    detail:
      "Excel, QuickBooks and a summer at a Charlotte CPA firm, so a P&L makes sense to me.",
  },
] as const;

// The pick-your-own builder: every item a visitor can add to an order, grouped like a menu.
export const builderGroups = [
  { title: "Pixel / Builds", tone: "pixel", items: pixel },
  { title: "Pixel / Monthly", tone: "pixel", items: pixelPlans },
  { title: "Tally / Numbers", tone: "tally", items: tally },
  { title: "Tally / Automation", tone: "tally", items: automations },
  { title: "Tally / Monthly", tone: "tally", items: tallyPlans },
] as const;

/** "$1,800" -> 1800, "From $800" -> 800 */
export const priceAmount = (price: string) =>
  Number(price.replace(/[^0-9.]/g, ""));
export const plans = [...pixelPlans, ...tallyPlans];

export const bundle = {
  name: "Starter Site + Data Checkup",
  price: "$1,950",
  saves: "$150",
  items: ["Starter Site", "Data Checkup"],
};

export const foundingOffer =
  "My first 3 clients get 15% off any build. In return I ask for an honest review and permission to write up how it went.";

export const terms = [
  "The price is fixed and agreed before I start.",
  "Half to start, half at launch.",
  "One round of revisions on everything I deliver.",
  "Anything outside the package is $85/hour, and I quote it first.",
  "Monthly plans are month to month. Cancel with 30 days' notice.",
  "You own your domain and your site. Always.",
];

// Real projects only.
export const work: WorkItem[] = [
  {
    name: "Mint Coupe",
    kind: "Booking marketplace",
    summary:
      "Mobile car detailing in Charlotte. Customers pick a package priced by their vehicle, choose a time, place and detailer, and their card is only charged once the detailer confirms. Gift certificates and referral credit are built in.",
    url: "https://mintcoupe.com",
    features: [
      {
        group: "Customer booking",
        items: [
          "Step-by-step booking: package, vehicle, date and time, location, then pick a detailer from a short list",
          "Booking calendar that only shows open days and times, with an add-to-calendar file after booking",
          "Prices that change with vehicle size, plus approve-or-decline add-on charges at the door",
          "Saves a half-finished booking if the page refreshes",
          "Card held at booking, charged only when the detailer confirms; holds that get stuck release on their own",
          "Tips after the job, receipts by email",
          "Self-serve cancel and reschedule with the fee shown up front",
          "Gift certificates, promo codes and referral credit for both sides",
          "Out-of-area check: enter your address, leave your email if it isn't covered yet",
          "Accounts with Google sign-in, phone verification, password reset",
          "Report a problem, file a damage claim, self-serve account deletion",
        ],
      },
      {
        group: "Calls, texts and email",
        items: [
          "Automatic phone call to the detailer when a job is booked: press 1 for details, 5 to accept, 6 to decline",
          "One-tap accept or decline links in texts and emails, no login needed",
          "Masked calls and texts, so customers and detailers never see each other's real number",
          "Recording notice played before masked calls connect",
          "STOP, HELP and START handled automatically, with an opt-out list",
          "Reminders the evening before and the morning of each appointment",
          "Rating request a few minutes after the job is done",
          "Win-back message six weeks after a customer's last detail",
          "Branded emails for every step, with notification preferences per person",
        ],
      },
      {
        group: "Detailer app",
        items: [
          "Apply online: setup, documents, insurance upload, agreement, consent, status tracking",
          "Today view, schedule, time off and job offers",
          "Before and after condition photos on every job",
          "Start and complete jobs, flag wrong vehicle, overruns, no-shows or a customer who isn't home",
          "Weather reschedules and cancellations",
          "Earnings, statements to download and a 1099 tax summary",
          "Payout setup through Stripe Connect, paid automatically after a hold period",
          "Ratings, tiers, reputation and a refer-a-detailer bonus after their third job",
        ],
      },
      {
        group: "Owner admin",
        items: [
          "Dashboard with work queues, bookings and detailers",
          "Review detailer applications and first jobs before they go live",
          "Disputes, damage claims, chargebacks, refunds and payment holds",
          "Support inbox with replies, customer reports and an audit log of every admin action",
          "Promo codes, reviews, imported Google and Yelp reviews",
          "Metrics and tax reports exported to a spreadsheet",
        ],
      },
      {
        group: "Runs on its own",
        items: [
          "Background timers: detailer response windows, no-show and not-home grace periods, payout holds",
          "Hourly safety sweeps for stuck payments and unpaid payouts",
          "Ratings recalculate and detailer tiers update automatically",
          "Referral credits granted on the first completed booking",
          "Bot protection on public forms",
        ],
      },
      {
        group: "Domain, email and launch",
        items: [
          "Domain moved onto the host's DNS, with the main and www addresses both live",
          "Business inbox on Google Workspace, with SPF, DKIM and DMARC set so mail lands in the inbox",
          "Site email sent from the brand's own domain, with replies going to the support inbox",
          "Stripe on live keys, set up under the LLC with the brand name on card statements",
          "Google sign-in branding, privacy, terms and texting-consent pages",
          "Health check page that confirms the database, messaging and background jobs are up",
          "Nightly database backups",
          "Lint, type checks and tests run on every change before it ships",
        ],
      },
    ],
  },
];
