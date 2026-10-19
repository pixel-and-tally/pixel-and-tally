/*
 * THE CONTENT FILE. Business facts, contact details, offers and copy that
 * more than one page uses. For a client site, rewrite this file and theme.css.
 *
 * Rules: no em dashes, no invented reviews, stats or client names. Leave a
 * field empty ("") rather than guess; the pages hide anything that is empty.
 */

export type Offer = {
  name: string;
  line: "web" | "data";
  price: string;
  cadence: "one-time" | "monthly";
  summary: string;
  includes: string[];
  turnaround: string;
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
  url: "https://pixelandtally.com",
  description:
    "Websites that get you booked and dashboards that show where the money goes, for Charlotte restaurants and service businesses. One real person from start to finish.",
  location: "Charlotte, NC",
  serviceArea: "Charlotte first, and any US business remotely.",

  // Contact. Empty values are hidden on the site.
  email: "",
  phone: "",
  linkedin: "https://www.linkedin.com/in/blakewturner",

  // Cal.com booking. Set to your event path, e.g. "pixelandtally/intro-call"
  // (the part after cal.com/). While empty, the site shows a placeholder that
  // points people to the contact form instead.
  calLink: "",
  callLength: "20-minute",

  nav: [
    { href: "/services/", label: "Services & pricing" },
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ],
} as const;

export const offers: Offer[] = [
  {
    name: "Starter Site",
    line: "web",
    price: "$1,800",
    cadence: "one-time",
    summary: "A clean, fast site that lets customers book or order without calling.",
    includes: [
      "Up to 5 pages, built for phones first",
      "Online booking or a menu and order link",
      "Google Business Profile cleanup",
      "Basic local SEO",
      "First month of Care free",
    ],
    turnaround: "2 weeks",
  },
  {
    name: "Booking Site",
    line: "web",
    price: "$3,200",
    cadence: "one-time",
    summary: "For businesses that run on appointments and want deposits up front.",
    includes: [
      "Up to 10 pages",
      "Booking with deposits or payments",
      "Reviews section (real reviews only)",
      "Email signup",
      "Visitor analytics",
      "First month of Care free",
    ],
    turnaround: "3 to 4 weeks",
  },
  {
    name: "Data Checkup",
    line: "data",
    price: "$300",
    cadence: "one-time",
    summary: "A quick, honest look at your numbers and the three changes worth making.",
    includes: [
      "I pull your POS, booking or spreadsheet exports",
      "A 60-minute call",
      "A one-page write-up with the 3 changes worth making",
    ],
    turnaround: "1 week",
  },
  {
    name: "Owner Dashboard",
    line: "data",
    price: "$1,500",
    cadence: "one-time",
    summary: "One live dashboard you can read in five minutes, built from the tools you already use.",
    includes: [
      "Up to 3 sources, like POS, booking and a labor sheet",
      "Weekly sales, best and worst sellers",
      "Labor % and busy hours",
      "Setup call and handoff",
    ],
    turnaround: "3 weeks",
  },
];

export const plans: Offer[] = [
  {
    name: "Care",
    line: "web",
    price: "$95",
    cadence: "monthly",
    summary: "Your site stays up, safe and current.",
    includes: [
      "Hosting, security updates and backups",
      "Uptime monitoring",
      "30 minutes of edits a month",
      "Text-me support",
    ],
    turnaround: "Monthly",
  },
  {
    name: "Care Plus",
    line: "web",
    price: "$195",
    cadence: "monthly",
    summary: "Everything in Care, plus a little marketing every month.",
    includes: [
      "Everything in Care",
      "2 hours of edits a month",
      "One Google profile post a month",
      "A one-page monthly report: visits, bookings, calls",
    ],
    turnaround: "Monthly",
  },
  {
    name: "Dashboard Care",
    line: "data",
    price: "$150",
    cadence: "monthly",
    summary: "Your dashboard keeps working when your tools change.",
    includes: [
      "Data refresh and fixes when sources change",
      "One 30-minute review call a month",
    ],
    turnaround: "Monthly",
  },
];

export const bundle = {
  name: "Starter Site + Data Checkup",
  price: "$1,950",
  note: "Saves $150. The site gets you booked; the checkup shows what the bookings are worth.",
};

export const foundingOffer =
  "My first 3 clients get 15% off any build in exchange for an honest testimonial and permission to write up the project.";

export const terms = [
  "Fixed price, agreed before any work starts.",
  "50% deposit to start, 50% at launch.",
  "One revision round per deliverable.",
  "Work outside the package is $85/hour, quoted before I start.",
  "Monthly plans are month to month. Cancel with 30 days' notice.",
  "You own your domain and your site.",
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

export const steps = [
  {
    title: "A 20-minute call",
    body: "You tell me what's not working. I tell you, in plain English, what I'd do and what it costs.",
  },
  {
    title: "A fixed price",
    body: "You get one page with the scope, price and launch date. No surprises later.",
  },
  {
    title: "I build it",
    body: "You see progress along the way and text me whenever. One revision round is built in.",
  },
  {
    title: "Launch and look after",
    body: "I launch it, show you how it works, and keep it running on a monthly plan if you want.",
  },
];

/** Cal.com is configured once a calLink is set. */
export function bookingUrl(calLink: string = site.calLink): string {
  const path = calLink.trim().replace(/^https?:\/\/(app\.)?cal\.com\//, "").replace(/^\/+/, "");
  return path ? `https://cal.com/${path}` : "";
}
