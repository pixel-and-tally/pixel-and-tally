import type { APIRoute } from "astro";

// Every public page. Thanks, 404 and the form endpoint stay out.
const pages = import.meta.glob("./**/*.astro", { eager: false });
const hidden = ["/thanks/", "/404/"];

export const GET: APIRoute = ({ site }) => {
  const paths = Object.keys(pages)
    .map((file) => file.replace(/^\.\//, "/").replace(/\.astro$/, "/").replace(/\/index\/$/, "/"))
    .filter((path) => !hidden.includes(path) && !path.includes("["))
    .sort();
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
