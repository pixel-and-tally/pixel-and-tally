// Contact form: field checks shared by the browser script and the server
// endpoint, and the email sent to the owner through Resend.

export const contactFields = ["name", "email", "business", "location", "interest", "details"] as const;
export type ContactField = (typeof contactFields)[number];
export type ContactMessage = Record<ContactField, string>;

/** Hidden field that only bots fill in. */
export const honeypotField = "company-website";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ParseResult =
  | { ok: true; message: ContactMessage }
  | { ok: false; spam: true }
  | { ok: false; spam: false; invalid: ContactField[] };

export function parseContact(form: FormData): ParseResult {
  if (String(form.get(honeypotField) ?? "").trim()) return { ok: false, spam: true };

  const message = Object.fromEntries(
    contactFields.map((f) => [f, String(form.get(f) ?? "").trim().slice(0, 5000)]),
  ) as ContactMessage;

  const invalid = contactFields.filter((f) => {
    const value = message[f];
    if (!value) return true;
    if (f === "email") return !EMAIL.test(value);
    if (f === "details") return value.length < 10;
    return false;
  });

  return invalid.length ? { ok: false, spam: false, invalid } : { ok: true, message };
}

export function contactEmailText(m: ContactMessage): string {
  return [
    `Name: ${m.name}`,
    `Email: ${m.email}`,
    `Business: ${m.business}`,
    `Location: ${m.location}`,
    `Needs help with: ${m.interest}`,
    "",
    m.details,
  ].join("\n");
}

type SendConfig = { apiKey: string; to: string; from: string };

/** Sends the note to the owner. Reply-To is the visitor, so hitting Reply answers them. */
export async function sendContactEmail(m: ContactMessage, cfg: SendConfig, fetcher: typeof fetch = fetch) {
  const res = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: [cfg.to],
      reply_to: m.email,
      subject: `New inquiry: ${m.business} (${m.interest})`,
      text: contactEmailText(m),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}
