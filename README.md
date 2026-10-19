# pixelandtally.com

The Pixel & Tally website, and the starting template for client sites.

```sh
npm install
npm run dev      # http://localhost:4321
npm run verify   # type check, tests, production build
```

## Where things live

| To change | Edit |
| --- | --- |
| Colors, fonts, corner radius | `src/theme.css` |
| Business details, prices, shared copy, Cal.com link | `src/site.ts` |
| A page | `src/pages/*.astro` |

## Going live (one-time setup)

1. **Netlify:** Add new site > Import from GitHub > `pixel-and-tally/pixel-and-tally`. Build settings come from `netlify.toml`.
2. **Form emails:** after the first deploy, Netlify > Forms > `contact` > Form notifications > add your email.
3. **Cal.com:** create an event (e.g. "Intro call", 20 min), then set `calLink` in `src/site.ts` to the part after `cal.com/`, like `pixelandtally/intro-call`.
4. **Domain:** Netlify > Domain management > Add `pixelandtally.com`, then point the domain at Netlify (Netlify DNS, or the records Netlify shows). HTTPS is automatic.
