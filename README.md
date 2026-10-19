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

1. **Vercel:** Add New > Project > import `pixel-and-tally/pixel-and-tally`. Vercel detects Astro; keep the defaults.
2. **Contact form email:** make a free [Resend](https://resend.com) account and an API key. In Vercel > Settings > Environment Variables add:
   - `RESEND_API_KEY`: the key
   - `CONTACT_TO_EMAIL`: where form notes should go (until the domain is verified in Resend, this must be the email you signed up to Resend with)
   - `CONTACT_FROM_EMAIL` (optional, after verifying pixelandtally.com in Resend): e.g. `Pixel & Tally <hello@pixelandtally.com>`

   Then redeploy. Until these are set the form shows a "didn't send" message instead of losing notes silently.
3. **Cal.com:** create an event (e.g. "Intro call", 20 min), then set `calLink` in `src/site.ts` to the part after `cal.com/`, like `pixelandtally/intro-call`.
4. **Domain:** Vercel > Settings > Domains > add `pixelandtally.com`, then add the DNS records Vercel shows at your registrar. HTTPS is automatic.
