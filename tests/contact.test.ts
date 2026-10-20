import { describe, expect, it, vi } from "vitest";
import { contactEmailText, honeypotField, parseContact, sendContactEmail } from "../src/lib/contact";
import type { Availability } from "../src/lib/schedule";

const cfg: Availability = {
  timeZone: "America/New_York",
  callMinutes: 20,
  stepMinutes: 30,
  noticeHours: 18,
  daysAhead: 7,
  weekly: { 1: [["17:30", "19:30"]] },
};
const now = new Date("2026-10-18T13:00:00Z");

const valid = {
  name: "Sam Lee",
  email: "sam@example.com",
  business: "Sam's Tacos",
  location: "Charlotte, NC",
  interest: "A new website or booking",
  details: "People keep calling to book and I miss half of them.",
  callDate: "",
  callTime: "",
};

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => f.set(k, v));
  return f;
};

describe("parseContact", () => {
  it("accepts a complete note", () => {
    expect(parseContact(form(valid), cfg, now)).toEqual({ ok: true, message: valid });
  });

  it("accepts an open call time", () => {
    const withCall = { ...valid, callDate: "2026-10-19", callTime: "18:00" };
    expect(parseContact(form(withCall), cfg, now)).toEqual({ ok: true, message: withCall });
  });

  it("rejects a day without a time, or a closed time", () => {
    expect(parseContact(form({ ...valid, callDate: "2026-10-19" }), cfg, now)).toMatchObject({ invalid: ["callTime"] });
    expect(parseContact(form({ ...valid, callDate: "2026-10-19", callTime: "09:00" }), cfg, now)).toMatchObject({
      invalid: ["callTime"],
    });
  });

  it("lists every missing or bad field", () => {
    const result = parseContact(form({ ...valid, name: " ", email: "not-an-email", details: "short" }), cfg, now);
    expect(result).toEqual({ ok: false, spam: false, invalid: ["name", "email", "details"] });
  });

  it("flags the honeypot as spam", () => {
    expect(parseContact(form({ ...valid, [honeypotField]: "http://spam.example" }), cfg, now)).toEqual({ ok: false, spam: true });
  });
});

describe("sendContactEmail", () => {
  it("sends to the owner with the visitor as Reply-To", async () => {
    const fetcher = vi.fn(async () => new Response("{}", { status: 200 }));
    await sendContactEmail(valid, { apiKey: "k", to: "blake@example.com", from: "Site <a@b.c>" }, cfg, now, fetcher);
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init.body))).toMatchObject({
      to: ["blake@example.com"],
      reply_to: "sam@example.com",
      text: contactEmailText(valid),
    });
    expect(JSON.parse(String(init.body)).attachments).toBeUndefined();
  });

  it("attaches a calendar file when a call was picked", async () => {
    const fetcher = vi.fn(async () => new Response("{}", { status: 200 }));
    const withCall = { ...valid, callDate: "2026-10-19", callTime: "18:00" };
    await sendContactEmail(withCall, { apiKey: "k", to: "t", from: "f" }, cfg, now, fetcher);
    const body = JSON.parse(String((fetcher.mock.calls[0] as unknown as [string, RequestInit])[1].body));
    expect(body.subject).toBe("Call request: Sam's Tacos, Monday, October 19 at 6 PM Eastern");
    expect(Buffer.from(body.attachments[0].content, "base64").toString()).toContain("DTSTART:20261019T220000Z");
  });

  it("throws when Resend refuses", async () => {
    const fetcher = vi.fn(async () => new Response("nope", { status: 403 }));
    await expect(sendContactEmail(valid, { apiKey: "k", to: "t", from: "f" }, cfg, now, fetcher)).rejects.toThrow("403");
  });
});
