import { describe, expect, it, vi } from "vitest";
import { contactEmailText, honeypotField, parseContact, sendContactEmail } from "../src/lib/contact";

const valid = {
  name: "Sam Lee",
  email: "sam@example.com",
  business: "Sam's Tacos",
  location: "Charlotte, NC",
  interest: "A new website or booking",
  details: "People keep calling to book and I miss half of them.",
};

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => f.set(k, v));
  return f;
};

describe("parseContact", () => {
  it("accepts a complete note", () => {
    expect(parseContact(form(valid))).toEqual({ ok: true, message: valid });
  });

  it("lists every missing or bad field", () => {
    const result = parseContact(form({ ...valid, name: " ", email: "not-an-email", details: "short" }));
    expect(result).toEqual({ ok: false, spam: false, invalid: ["name", "email", "details"] });
  });

  it("flags the honeypot as spam", () => {
    expect(parseContact(form({ ...valid, [honeypotField]: "http://spam.example" }))).toEqual({ ok: false, spam: true });
  });
});

describe("sendContactEmail", () => {
  it("sends to the owner with the visitor as Reply-To", async () => {
    const fetcher = vi.fn(async () => new Response("{}", { status: 200 }));
    await sendContactEmail(valid, { apiKey: "k", to: "blake@example.com", from: "Site <a@b.c>" }, fetcher);
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init.body))).toMatchObject({
      to: ["blake@example.com"],
      reply_to: "sam@example.com",
      text: contactEmailText(valid),
    });
  });

  it("throws when Resend refuses", async () => {
    const fetcher = vi.fn(async () => new Response("nope", { status: 403 }));
    await expect(sendContactEmail(valid, { apiKey: "k", to: "t", from: "f" }, fetcher)).rejects.toThrow("403");
  });
});
