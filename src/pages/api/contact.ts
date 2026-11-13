import type { APIRoute } from "astro";
import { parseContact, sendContactEmail } from "../../lib/contact";
import { availability } from "../../site";

// Runs as a Netlify function; every other page is static HTML.
export const prerender = false;

// Set these in Netlify > Site configuration > Environment variables.
// CONTACT_FROM_EMAIL can stay unset until the domain is verified in Resend.
// Read at request time, so changing a value only needs a redeploy, not a code change.
const config = () => ({
  apiKey: process.env.RESEND_API_KEY ?? "",
  to: process.env.CONTACT_TO_EMAIL ?? "",
  from: process.env.CONTACT_FROM_EMAIL || "Pixel & Tally website <onboarding@resend.dev>",
});

// Browser script sends Accept: application/json and gets JSON back;
// a plain form post (no JavaScript) gets a redirect instead.
const wantsJson = (request: Request) => request.headers.get("accept")?.includes("application/json") ?? false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const json = wantsJson(request);
  const reply = (status: number, body: Record<string, unknown>, to: string) =>
    json ? Response.json(body, { status }) : redirect(to, 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { ok: false, error: "bad_request" }, "/contact/?error=1#message");
  }

  const now = new Date();
  const result = parseContact(form, availability, now);
  // Pretend success to bots so they don't retry.
  if (!result.ok && result.spam) return reply(200, { ok: true }, "/thanks/");
  if (!result.ok) return reply(422, { ok: false, invalid: result.invalid }, "/contact/?error=1#message");

  const cfg = config();
  if (!cfg.apiKey || !cfg.to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return reply(503, { ok: false, error: "not_configured" }, "/contact/?error=1#message");
  }

  try {
    await sendContactEmail(result.message, cfg, availability, now);
  } catch (err) {
    console.error("Contact form: send failed", err);
    return reply(502, { ok: false, error: "send_failed" }, "/contact/?error=1#message");
  }
  return reply(200, { ok: true }, "/thanks/");
};
