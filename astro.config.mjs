// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import { site } from "./src/site.ts";

// Pages are prerendered to static HTML. Only routes that set `prerender = false`
// (the contact form endpoint) run as Netlify functions.
export default defineConfig({
  site: site.url,
  output: "static",
  adapter: netlify(),
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
