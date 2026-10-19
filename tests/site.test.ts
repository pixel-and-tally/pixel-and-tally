import { describe, expect, it } from "vitest";
import { bookingUrl, offers, plans, work } from "../src/site";

describe("bookingUrl", () => {
  it("is empty until a Cal.com link is set", () => {
    expect(bookingUrl("")).toBe("");
    expect(bookingUrl("   ")).toBe("");
  });

  it("accepts a bare path or a full Cal.com URL", () => {
    expect(bookingUrl("pixelandtally/intro")).toBe("https://cal.com/pixelandtally/intro");
    expect(bookingUrl("https://cal.com/pixelandtally/intro")).toBe("https://cal.com/pixelandtally/intro");
    expect(bookingUrl("https://app.cal.com/pixelandtally/intro")).toBe("https://cal.com/pixelandtally/intro");
  });
});

describe("price sheet", () => {
  it("matches the agreed prices", () => {
    const prices = Object.fromEntries([...offers, ...plans].map((o) => [o.name, o.price]));
    expect(prices).toEqual({
      "Starter Site": "$1,800",
      "Booking Site": "$3,200",
      "Data Checkup": "$300",
      "Owner Dashboard": "$1,500",
      Care: "$95",
      "Care Plus": "$195",
      "Dashboard Care": "$150",
    });
  });
});

describe("honest content", () => {
  it("lists only the real case studies", () => {
    expect(work.map((w) => w.name)).toEqual(["Mint Coupe", "Visu Kitchen"]);
  });
});
