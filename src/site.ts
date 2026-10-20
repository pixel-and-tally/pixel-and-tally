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
  email: "",
  phone: "",
  linkedin: "https://www.linkedin.com/in/blakewturner",
  // Path under public/, e.g. "/blake.jpg". Until set, the site shows initials.
  photo: "",

  // The three tabs, then the rest.
  tabs: [
    { href: "/pixel/", label: "Pixel", blurb: "Websites" },
    { href: "/tally/", label: "Tally", blurb: "Data + automation" },
    { href: "/pixel-and-tally/", label: "Pixel & Tally", blurb: "Pick your own" },
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
    summary: "Up to 5 pages. Customers can book, order or find your hours without calling.",
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
    summary: "Up to 10 pages, for businesses that run on appointments and want deposits up front.",
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
    summary: "Hosting, security updates, backups and uptime checks, plus 30 minutes of edits a month. Text me when something needs changing.",
    includes: [],
  },
  {
    name: "Care Plus",
    price: "$195",
    cadence: "monthly",
    summary: "Everything in Care, 2 hours of edits, one Google profile post a month, and a one-page report on visits, bookings and calls.",
    includes: [],
  },
];

export const tally: Offer[] = [
  {
    name: "Data Checkup",
    price: "$300",
    cadence: "one-time",
    summary: "We pull your POS, booking or spreadsheet exports, you and I talk for an hour, and you get one page with the 3 changes worth making.",
    includes: [],
    turnaround: "about 1 week",
  },
  {
    name: "Owner Dashboard",
    price: "$1,500",
    cadence: "one-time",
    summary: "One live dashboard from up to 3 sources (say POS, booking and your labor sheet): weekly sales, best and worst sellers, labor %, busy hours. Setup call and handoff included.",
    includes: [],
    turnaround: "about 3 weeks",
  },
];

export const tallyPlans: Offer[] = [
  {
    name: "Dashboard Care",
    price: "$150",
    cadence: "monthly",
    summary: "I keep the data flowing and fix things when your tools change, and we do a 30-minute review call each month.",
    includes: [],
  },
  {
    name: "Automation Care",
    price: "$75",
    cadence: "monthly",
    summary: "I watch your workflows and connections, fix them when a tool changes, and make one small change a month.",
    includes: [],
  },
];

// Workflows and API connections live on the Tally tab: they move the same data the dashboards read.
export const automations: Offer[] = [
  {
    name: "Workflow Setup",
    price: "$450",
    cadence: "one-time",
    summary: "One automation between tools you already use, so a busywork step happens on its own. Built on Zapier or Make in your account, so you own it.",
    includes: [
      "Example: a new booking lands in your spreadsheet and the customer gets a reminder text",
      "Example: a new order or invoice shows up in QuickBooks without retyping",
      "Tested with real data, plus a short video showing how it works",
    ],
    turnaround: "about 1 week",
  },
  {
    name: "API Connection",
    price: "$1,200",
    cadence: "one-time",
    summary: "A custom link between two systems when there's no ready-made one, like pulling POS sales into your dashboard every night.",
    includes: [
      "Connects to your tools' APIs with your own keys",
      "Retries and an alert if something breaks",
      "Written up so anyone can maintain it",
    ],
    turnaround: "about 2 weeks",
  },
];

export const steps = [
  { title: "We talk", body: "A free 20-minute video call. You tell me what's annoying you. I tell you what I'd do and what it costs." },
  { title: "Price in writing", body: "One page with the scope, the price and the launch date. It doesn't change later." },
  { title: "We build it", body: "You see it come together and you can text me any time. One round of changes is included." },
  { title: "Launch", body: "We launch it, I walk you through it, and we keep it running each month if you want." },
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
  { area: "Websites & booking", detail: "HTML, CSS and JavaScript, built for phones, wired to booking and ordering." },
  { area: "SQL & data", detail: "Cleaning and joining messy exports from POS, booking and spreadsheet tools." },
  { area: "Dashboards", detail: "Tableau, Power BI and Looker, the same tools I use at my day job." },
  { area: "Automation & APIs", detail: "Python and workflow tools that move data between the apps you already pay for." },
  { area: "Money side", detail: "Excel, QuickBooks and a summer at a Charlotte CPA firm, so a P&L makes sense to me." },
] as const;

// The pick-your-own builder: every item a visitor can add to an order, grouped like a menu.
export const builderGroups = [
  { title: "Pixel / Builds", tone: "pixel", items: pixel },
  { title: "Pixel / Monthly", tone: "pixel", items: pixelPlans },
  { title: "Tally / Numbers", tone: "tally", items: tally },
  { title: "Tally / Automation", tone: "tally", items: automations },
  { title: "Tally / Monthly", tone: "tally", items: tallyPlans },
] as const;

/** "$1,800" -> 1800 */
export const priceAmount = (price: string) => Number(price.replace(/[^0-9.]/g, ""));
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

// Real projects only. Blake: check these summaries and add links when ready.
export const work: WorkItem[] = [
  {
    name: "Mint Coupe",
    kind: "Booking site",
    summary: "Online booking for a mobile car detailing service, from picking a package to paying.",
    url: "",
  },
  {
    name: "Visu Kitchen",
    kind: "Restaurant site",
    summary: "A restaurant website built so guests find the menu and hours in seconds.",
    url: "",
  },
];
