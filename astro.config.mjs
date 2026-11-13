// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import { site } from "./src/site.ts";

// Pages are prerendered to static HTML. Only routes that set `prerender = false`
// (the contact form endpoint) run as Vercel functions.
export default defineConfig({
  site: site.url,
  output: "static",
  adapter: vercel(),
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
