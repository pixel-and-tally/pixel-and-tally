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
    { href: "/tally/", label: "Tally", blurb: "Your numbers" },
    { href: "/both/", label: "Both", blurb: "Site + numbers" },
  ],
  nav: [
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ],
} as const;

// When visitors can request a call (Eastern time). Blake: set your real hours.
export const availability: Availability = {
  timeZone: "America/New_York",
  callMinutes: 20,
  stepMinutes: 30,
  noticeHours: 18,
  daysAhead: 14,
  weekly: {
    1: [["12:00", "13:00"], ["17:30", "19:30"]],
    2: [["12:00", "13:00"], ["17:30", "19:30"]],
    3: [["12:00", "13:00"], ["17:30", "19:30"]],
    4: [["12:00", "13:00"], ["17:30", "19:30"]],
    5: [["12:00", "13:00"]],
    6: [["10:00", "13:00"]],
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
    summary: "I pull your POS, booking or spreadsheet exports, we talk for an hour, and you get one page with the 3 changes worth making.",
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
];

export const offers = [...pixel, ...tally];
export const plans = [...pixelPlans, ...tallyPlans];

export const bundle = {
  name: "Starter Site + Data Checkup",
  price: "$1,950",
  saves: "$150",
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
