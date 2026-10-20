// Contact form: field checks shared by the browser script and the server
// endpoint, and the email sent to the owner through Resend.
import { buildCallIcs, formatDate, formatTime, isBookable, type Availability } from "./schedule";

export const contactFields = ["name", "email", "business", "location", "interest", "details"] as const;
export type ContactField = (typeof contactFields)[number];
export type CallField = "callDate" | "callTime";
export type ContactMessage = Record<ContactField | CallField, string>;

/** Hidden field that only bots fill in. */
export const honeypotField = "company-website";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ParseResult =
  | { ok: true; message: ContactMessage }
  | { ok: false; spam: true }
  | { ok: false; spam: false; invalid: (ContactField | CallField)[] };

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim().slice(0, 5000);

export function parseContact(form: FormData, availability: Availability, now: Date): ParseResult {
  if (text(form, honeypotField)) return { ok: false, spam: true };

  const message = Object.fromEntries(
    [...contactFields, "callDate", "callTime"].map((f) => [f, text(form, f)]),
  ) as ContactMessage;

  const invalid: (ContactField | CallField)[] = contactFields.filter((f) => {
    const value = message[f];
    if (!value) return true;
    if (f === "email") return !EMAIL.test(value);
    if (f === "details") return value.length < 10;
    return false;
  });

  // A call is optional, but a picked day needs a time that is still open.
  if (message.callDate || message.callTime) {
    if (!isBookable(message.callDate, message.callTime, availability, now)) invalid.push("callTime");
  }

  return invalid.length ? { ok: false, spam: false, invalid } : { ok: true, message };
}

export function callLabel(m: ContactMessage): string {
  return m.callDate ? `${formatDate(m.callDate)} at ${formatTime(m.callTime)} Eastern` : "";
}

export function contactEmailText(m: ContactMessage): string {
  return [
    `Name: ${m.name}`,
    `Email: ${m.email}`,
    `Business: ${m.business}`,
    `Location: ${m.location}`,
    `Looking at: ${m.interest}`,
    `Call: ${callLabel(m) || "None requested, reply by email"}`,
    "",
    m.details,
    ...(m.callDate ? ["", "The call isn't confirmed until you reply. The attached file adds it to your calendar."] : []),
  ].join("\n");
}

type SendConfig = { apiKey: string; to: string; from: string };

/** Sends the note to the owner. Reply-To is the visitor, so hitting Reply answers them. */
export async function sendContactEmail(
  m: ContactMessage,
  cfg: SendConfig,
  availability: Availability,
  now: Date,
  fetcher: typeof fetch = fetch,
) {
  const attachments = m.callDate
    ? [
        {
          filename: "call.ics",
          content: Buffer.from(
            buildCallIcs(
              {
                uid: `${now.getTime()}-${m.email}@pixelandtally.com`,
                date: m.callDate,
                time: m.callTime,
                summary: `Call with ${m.name} (${m.business})`,
                description: `${m.email}\n\n${m.details}`,
              },
              availability,
              now,
            ),
          ).toString("base64"),
        },
      ]
    : undefined;

  const res = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: [cfg.to],
      reply_to: m.email,
      subject: m.callDate ? `Call request: ${m.business}, ${callLabel(m)}` : `New note: ${m.business} (${m.interest})`,
      text: contactEmailText(m),
      attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}
