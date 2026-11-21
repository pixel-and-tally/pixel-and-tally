import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buyout, offers, plans, priceAmount, work } from "../src/site";

describe("price sheet", () => {
  it("matches the agreed prices", () => {
    const prices = Object.fromEntries([...offers, ...plans].map((o) => [o.name, o.price]));
    expect(prices).toEqual({
      "Starter Site": "$1,800",
      "Booking Site": "$3,200",
      "Base Site": "$900",
      "Extra Page": "$225",
      "Booking Calendar": "$350",
      "Deposits or Payments": "$400",
      "Extra Form": "$150",
      "Signature Piece": "$500",
      "Data Checkup": "$300",
      "Owner Dashboard": "$1,500",
      "Workflow Setup": "$450",
      "API Connection": "From $800",
      Care: "$95",
      "Care Plus": "$195",
      "Dashboard Care": "$150",
      "Automation Care": "$75",
    });
  });
});

describe("buyout", () => {
  it("matches the agreed terms", () => {
    expect(buyout).toEqual({ percent: 50, minimum: "$500" });
  });
});

describe("by the piece", () => {
  it("keeps the Starter Site no pricier than base plus 4 pages", () => {
    const price = (n: string) => priceAmount(offers.find((o) => o.name === n)!.price);
    expect(price("Base Site") + 4 * price("Extra Page")).toBe(price("Starter Site"));
  });
});

describe("honest content", () => {
  it("lists only the real case studies", () => {
    expect(work.map((w) => w.name)).toEqual(["Mint Coupe", "Oogum Vending", "Resume Pro NC"]);
  });
  it("has a screenshot on disk for every case study", () => {
    for (const w of work) if (w.image) expect(existsSync(`public${w.image}`), w.image).toBe(true);
  });
});
