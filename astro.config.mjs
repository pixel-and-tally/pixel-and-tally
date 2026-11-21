// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import { site } from "./src/site.ts";

// Pages are prerendered to static HTML. Only routes that set `prerender = false`
// (the contact form endpoint) run in the Cloudflare Worker (see wrangler.jsonc).
export default defineConfig({
  site: site.url,
  output: "static",
  adapter: cloudflare({ platformProxy: { enabled: false } }),
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
