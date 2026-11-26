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
  // Priced per unit (e.g. "page"): the builder asks how many.
  per?: string;
};

export type WorkItem = {
  name: string;
  kind: string;
  summary: string;
  url: string;
  // Screenshot under public/, 16:9. Empty hides the picture.
  image?: string;
  // Three short lines on what was built, for the home page card.
  highlights?: string[];
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
    "Websites that take bookings for Charlotte restaurants and small businesses, with fixed prices on the page and monthly care. Plus dashboards and a $300 Data Checkup. You deal with the owner, Blake Turner.",
  serviceArea: "Charlotte first, and any US business remotely.",
  // Named on the about page and in search data. Places we can serve today, all over video.
  areas: ["Charlotte", "Matthews", "Huntersville", "Concord", "Gastonia", "Belmont", "Fort Mill"],

  // Contact. Empty values are hidden on the site.
  email: "blake@pixelandtally.com",
  phone: "",
  linkedin: "https://www.linkedin.com/in/blakewturner",
  // Path under public/, e.g. "/blake.jpg". Until set, the site shows initials.
  photo: "",

  // The three tabs, then the rest.
  tabs: [
    {
      href: "/pixel/",
      label: "Pixel",
      blurb: "Websites + design",
      desc: "Websites that take bookings and orders, help with your logo if it needs it, and monthly care so it never goes stale.",
    },
    {
      href: "/tally/",
      label: "Tally",
      blurb: "Data + automation",
      desc: "Dashboards for your numbers, plus workflows and app connections that do the busywork.",
    },
    {
      href: "/pixel-and-tally/",
      label: "Pixel & Tally",
      blurb: "Pick your own",
      desc: "Mix anything from both menus into one package, with a combo discount.",
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

// Build a site piece by piece. The packages above are preset combos of these pieces that cost
// the same or less (Starter = base + 4 pages, with booking thrown in).
export const pixelPieces: Offer[] = [
  {
    name: "Base Site",
    price: "$900",
    cadence: "one-time",
    summary:
      "One page, designed for you (no template), built for phones first, with a contact form, basic local SEO and your Google Business Profile cleaned up.",
    includes: [],
  },
  {
    name: "Extra Page",
    price: "$225",
    cadence: "one-time",
    summary: "Each extra page in the same design: a menu, services, about, gallery, whatever you need.",
    includes: [],
    per: "page",
  },
  {
    name: "Booking Calendar",
    price: "$350",
    cadence: "one-time",
    summary:
      "Customers pick an open time on your site, and you get the booking by email with a calendar file.",
    includes: [],
  },
  {
    name: "Deposits or Payments",
    price: "$400",
    cadence: "one-time",
    summary: "Card checkout on a booking or order, so you get paid up front and no-shows cost less.",
    includes: [],
  },
  {
    name: "Extra Form",
    price: "$150",
    cadence: "one-time",
    summary:
      "A second form with your own questions, like catering requests or job applications, sent straight to your email.",
    includes: [],
  },
  {
    name: "Signature Piece",
    price: "$500",
    cadence: "one-time",
    summary:
      "One interactive centerpiece that makes your site unlike anyone else's, built around what you do.",
    includes: [],
  },
  {
    name: "Hub as an App",
    price: "$500",
    cadence: "one-time",
    summary:
      "Your private owner hub as an app on your phone's home screen, with alerts the moment a booking, order or message comes in. Add it to any site with an owner hub.",
    includes: [],
  },
];

export const pixelPlans: Offer[] = [
  {
    name: "Care",
    price: "$95",
    cadence: "monthly",
    summary:
      "Hosting, security updates, backups and uptime checks, plus a 30 minute call each month to go over changes and 30 minutes of work on them.",
    includes: [],
  },
  {
    name: "Care Plus",
    price: "$245",
    cadence: "monthly",
    summary:
      "Everything in Care, but with up to an hour of calls (one hour or two half hours) and an hour of work on changes, plus one Google profile post a month, and a one-page report on visits, bookings and calls.",
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
    body: "We launch it, I walk you through it, and Care keeps it running and up to date every month.",
  },
] as const;

export const shoutouts = [
  "Charlotte native",
  "Text me, I answer",
  "Prices on the page",
  "Websites that book",
  "Numbers that make sense",
  "Busywork on autopilot",
  "One real person",
] as const;

export const offers = [...pixel, ...pixelPieces, ...tally, ...automations];

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
  { title: "Pixel / Packages", tone: "pixel", items: pixel },
  { title: "Pixel / By the piece", tone: "pixel", items: pixelPieces },
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

// Leaving Care and keeping the site: a one-time copy of the files. Blake's accounts never go with it.
export const buyout = { percent: 50, minimum: "$500" } as const;

export const terms = [
  "The price is fixed and agreed before I start.",
  "Half to start, half at launch.",
  "One round of revisions on everything I deliver.",
  "Anything outside the package is $85/hour, and I quote it first.",
  "Monthly plans are month to month. Cancel with 30 days' notice.",
  "You own your domain and your content (words, photos, logo). Always.",
  "The site, booking, payments and forms run on Care. If Care ends, they go offline and your domain is yours to point anywhere.",
  `Want to keep the site after Care? Buy a copy of the files for ${buyout.percent}% of your build price (${buyout.minimum} minimum). My accounts aren't included, so booking and payments get reconnected on your side.`,
];

// Real projects only.
export const work: WorkItem[] = [
  {
    name: "Mint Coupe",
    kind: "Booking marketplace",
    summary:
      "Mobile car detailing in Charlotte. Customers pick a package priced by their vehicle, choose a time, place and detailer, and their card is only charged once the detailer confirms. Gift certificates and referral credit are built in.",
    url: "https://mintcoupe.com",
    image: "/work/mint-coupe.webp",
    highlights: ["Customer, detailer and owner hubs, all connected", "Masked calls and texts, real numbers stay private", "Card held until the detailer confirms"],
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
  {
    name: "Oogum Vending",
    kind: "Family business site + owner hub",
    summary:
      "Refrigerated smart vending from a family in Belmont, NC. A light, friendly site built on the owners' own flier, a form for businesses that want a machine, and a private login where the owners track host requests and bulk prices.",
    url: "https://oogum-vending.blake-499.workers.dev",
    image: "/work/oogum-vending.webp",
    highlights: ["Bulk prices compared across 5 stores", "Online prices pulled in every Monday", "Fewest-stops shopping trip"],
    features: [
      {
        group: "Public site",
        items: [
          "Built from the owners' own flier and its five cornerstones",
          "Host-a-machine request form for businesses that want one",
          "Call picker for a quick phone call, with an add-to-calendar file",
        ],
      },
      {
        group: "Owner hub",
        items: [
          "Private login for both owners, with passwords they change themselves",
          "Every host request saved and tracked",
          "Log bulk prices from Costco, Sam's Club, Walmart, Target and Amazon; it shows the cheapest store per unit",
          "Watch list of up to 20 items, compared per unit even when pack sizes differ",
          "Online store prices pulled in through a Google Shopping connection every Monday morning, or on a Refresh tap",
          "Sales that beat every other price get called out",
          "Shopping trip planner: the fewest store stops for the best prices, and what skipping a store would cost",
          "Settings page so the owners update their own site details, no call to me needed",
        ],
      },
    ],
  },
  {
    name: "Resume Pro NC",
    kind: "Wix rebuild + client portal",
    summary:
      "Nancy Turner's resume writing service, moved off Wix with nothing lost. A guided order form with resume upload, PayPal checkout tied to each order, a free resume review, and a dashboard where every order moves from paid to delivered, with her own emails one click away.",
    url: "https://resume-pro-nc.blake-499.workers.dev",
    image: "/work/resume-pro-nc.webp",
    highlights: ["Order, pay and get on the schedule in one go", "Payment confirmed and emailed on its own", "A morning to-do list in her inbox"],
    features: [
      {
        group: "For clients",
        items: [
          "Guided order form: pick services, answer the questionnaire, upload a resume",
          "Checkout through PayPal for the exact total, tied to that order",
          "Free resume review with upload",
          "Free phone consultation picker on the contact form",
          "Career Tips blog, and all 40+ old Wix links still land on the right page",
        ],
      },
      {
        group: "Billing and emails on autopilot",
        items: [
          "PayPal tells the site when a payment clears; the order is marked paid and the client gets a receipt email",
          "Questionnaire-received email with a payment link, sent the moment an order comes in",
          "One automatic payment reminder for orders left unpaid",
          "Every client email is written in the owner's own words, with her signature",
          "Send an order link after a phone call by email or one-tap text",
        ],
      },
      {
        group: "Owner dashboard",
        items: [
          "Today view: drafts due or overdue, unconfirmed calls, unanswered messages, unpaid orders",
          "Every order moves from waiting on payment to queued, writing, draft sent and delivered, with the draft due date set automatically",
          "Each client's orders, messages, files and notes on one page",
          "A 30-day check-in reminder to ask how the job search is going",
          "Weekday 7 AM email with the day's list",
          "Settings to change her own prices, hours, turnaround and contact details",
        ],
      },
    ],
  },
  {
    name: "Chromerabilia",
    kind: "Sports card shop + owner portal",
    summary:
      "A Charlotte graded sports card seller. Every card sits in its own lit display case that flips to the back and shines like a refractor. The owner adds cards from his phone in seconds, and buyers can check out, make an offer or message him on Instagram.",
    url: "https://chromerabilia.blake-499.workers.dev",
    highlights: ["Snap a photo, it crops itself", "PSA details fill in from the cert number", "Checkout, offers and Instagram DMs"],
    features: [
      {
        group: "Shop",
        items: [
          "Display-case showcase: cards flip to their back photo and catch a refractor shine",
          "Filters, including search by card color",
          "PayPal checkout for cards that ship, plus a Make an Offer form",
          "Inquire button copies a ready message and opens his Instagram DMs",
          "A Vault page for cards he's keeping, never for sale",
          "Real view and in-cart counts, hidden at zero and never made up",
        ],
      },
      {
        group: "Owner portal",
        items: [
          "Upload from a phone: the photo crops itself to the slab, even on a cluttered table",
          "Type the PSA cert number and the card's name, year, set and grade fill in on their own",
          "Choose per card: ship it, inquiry only, or Vault",
          "Orders and offers each in their own inbox",
          "Settings to change his own contact details, Instagram, Zelle, shipping and password",
        ],
      },
    ],
  },
];

// Questions a careful owner asks before hiring anyone for a website. Answers only say what is true today.
export const faqs = [
  {
    q: "Who owns what?",
    a: "Your domain and your content are yours: the name, the words, the photos and the logo. The site itself, with its booking, payments and forms, runs on our systems as part of Care.",
  },
  {
    q: "Are domains and other app fees included?",
    a: "No, and I don't mark them up. Your domain (about $10 a year) and any outside app you choose cost exactly what the company charges, nothing more. I suggest the free version whenever it does the job. I bill these once a year at cost and can show you the receipt for every one.",
  },
  {
    q: "How does billing work?",
    a: "Everything is on autopay with a card or bank account on file, so nothing gets missed. Three days before a monthly charge, and a month before a yearly one, you get an email with the amount and the date. Pay Care for the year and it's $1,000 instead of $1,140, or Care Plus for $2,500 instead of $2,940. Your first month of Care or Care Plus after launch is free: no charge, and you can cancel before it ends. Yearly starts after that free month. Switch to yearly or upgrade to Care Plus anytime, and you only pay the difference. Pay your build by bank transfer and take $50 off. If a payment fails and isn't fixed, service pauses until it's paid.",
  },
  {
    q: "What if I stop paying for Care?",
    a: `No hard feelings. Your domain stays yours and I help you point it wherever you like. The site, booking, payments and forms run on our systems, so they switch off when Care ends, with 30 days' notice. Want to keep the site? Buy a copy of the files for ${buyout.percent}% of what you paid for the build (${buyout.minimum} minimum). My accounts don't come with it, so booking and payments get reconnected on your end.`,
  },
  {
    q: "How do changes work after launch?",
    a: "Each month we get on a call and go over what you want changed. Care includes a 30 minute call and 30 minutes of work. Care Plus includes up to an hour of calls and an hour of work. Small changes fit in that time; new features get quoted separately. Need more time? Extra work is $50 per 30 minutes, agreed before I start.",
  },
  {
    q: "How long does it take?",
    a: "A Starter Site takes about 2 weeks and a Booking Site 3 to 4 weeks. The clock starts once I have your logo, photos and hours. You get the launch date in writing.",
  },
  {
    q: "What do you need from me?",
    a: "A 20-minute call, your logo and photos if you have them, and the basics: hours, services, prices. Rough notes are fine. We shape the words together.",
  },
  {
    q: "Why are your prices on the page?",
    a: "Because you should know before you call. Most web shops quote after a meeting. Mine are fixed and written down, and the price I quote doesn't change later.",
  },
  {
    q: "Do you meet in person?",
    a: "Calls are face to face over video, so it works the same in Charlotte or anywhere in the US. I grew up in Charlotte and know the area.",
  },
  {
    q: "Do you use AI?",
    a: "We use good tools, like any shop. But you talk to me, I decide what goes on your site, and I check every page myself before it launches.",
  },
] as const;
