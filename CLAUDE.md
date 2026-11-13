# Pixel & Tally

Marketing site for Pixel & Tally (pixelandtally.com), Blake Turner's one-person US LLC.
Tagline: "Design & analytics. Sit back, I've got it."

Two service lines: websites with booking plus monthly care plans (Pixel), and dashboards plus
data advice (Tally). Clients are US small businesses only, starting with Charlotte restaurants
and service businesses. The pitch is "you deal with one real person", not "no AI".
App building is not offered on the site until one has been delivered for a paying client.

This repo is also the template for client sites: a client re-skin should only touch
`src/theme.css` (colors, fonts, shape) and `src/site.ts` (business facts, offers, copy).

## Stack

- Astro 5 static site, Tailwind 4 (CSS-first tokens in `src/theme.css`), TypeScript strict.
- Hosted on Netlify free plan (`@astrojs/netlify`, `netlify.toml`; Blake moved off Vercel 2026-11-13 because Vercel needs Pro for a private org repo and for business use). Pages are static; only `src/pages/api/contact.ts`
  runs as a function. It emails form notes through Resend (env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  optional `CONTACT_FROM_EMAIL`). Validation lives in `src/lib/contact.ts`.
- Call booking is built in (no Cal.com): `src/lib/schedule.ts`, ported from Mint Coupe's booking calendar,
  turns `availability` in `src/site.ts` into open days and times (Eastern). The visitor's pick is re-checked
  on the server and emailed with an .ics file; Blake confirms by reply. No database, so no double-booking guard.
- Site sections are three tabs: Pixel (`/pixel/`, web), Tally (`/tally/`, data, workflows and API connections), Pixel & Tally (`/pixel-and-tally/`, a pick-your-own builder:
  a GET form to `/contact/?order=...` with a live receipt total). Home is the landing page; Blake's photo sits in
  the "Talk to the owner" consult section, not the hero.
- Node 22. `npm run dev`, `npm run verify` (astro check + vitest + build).
- `vite` is pinned via `overrides` in package.json so Tailwind's Vite plugin and Astro share one
  version (otherwise `astro check` fails on mismatched plugin types).

## Rules

- `npm run verify` must pass before every commit; CI runs the same thing.
- No em dashes in user-facing copy. `tests/no-em-dash.test.ts` enforces it.
- Never show fake reviews, stats, testimonials or client names. Show an honest empty state.
- Leave unknown facts empty in `site.ts` rather than guessing; pages hide empty fields.
- Don't name Blake's employer's clients. Say "Fortune 500 utility clients".
- Every form field gets a label, `autocomplete`, and an inline error; on failure, focus the
  first bad field and show a form-level message.
- Colors and type come only from theme tokens (`bg-paper`, `text-ink`, `bg-accent`...), never raw hex,
  so a client re-skin is one file.
- Prices live only in `src/site.ts`; `tests/site.test.ts` pins the agreed price sheet, so update
  both together when prices change.
- Copy is direct and plain: short sentences, first person ("I"), no corporate fluff. Voice (Blake chose 2026-10-20): Blake is the owner
  and the person clients talk to ("I" for the consult, texts, his background); the work is "we" (we build, we launch).
  Never name, picture or invent team members, and no fake team page.
- Look (Blake picked "bold" 2026-10-20 and asked for something unlike a normal website): cream paper,
  ink outlines with hard offset shadows (`.sticker`), expanded Archivo caps, one color per tab (Pixel tomato,
  Tally mint, Both mustard), and a restaurant theme: prices as POS receipts (`Receipt`), steps as order
  tickets on a rail (`TicketRail`), the bundle as a combo discount in the builder. Avoid generic SaaS patterns (feature grids with
  checkmarks, pricing-card rows).
- Commit messages say what changed for the visitor, in plain English.
