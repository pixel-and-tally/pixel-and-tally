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
| Business details, prices, shared copy, call hours | `src/site.ts` |
| A page | `src/pages/*.astro` |

## Going live (one-time setup)

1. **Cloudflare (free plan):** Workers & Pages > Create > Import a repository > `pixel-and-tally/pixel-and-tally`. Build command `npm run build`, deploy command `npx wrangler deploy` (the defaults). `wrangler.jsonc` holds the rest.
2. **Contact form email:** make a free [Resend](https://resend.com) account and an API key. In Cloudflare > Workers & Pages > pixel-and-tally > Settings > Variables and Secrets add (type Secret):
   - `RESEND_API_KEY`: the key
   - `CONTACT_TO_EMAIL`: where form notes should go (until the domain is verified in Resend, this must be the email you signed up to Resend with)
   - `CONTACT_FROM_EMAIL` (optional, after verifying pixelandtally.com in Resend): e.g. `Pixel & Tally <hello@pixelandtally.com>`

   Then redeploy. Until these are set the form shows a "didn't send" message instead of losing notes silently.
3. **Call hours:** set `availability.weekly` in `src/site.ts` to the times you can take calls (Eastern). Requests arrive by email with a calendar file; reply to confirm.
4. **Domain:** add `pixelandtally.com` to Cloudflare (free plan) and switch the nameservers at Squarespace to Cloudflare's, after checking every email record (MX, SPF, DKIM, DMARC, Resend) came across. Then the Worker > Settings > Domains & Routes > add `pixelandtally.com` and `www.pixelandtally.com`. HTTPS is automatic.
