import { describe, expect, it } from "vitest";
import { offers, plans, work } from "../src/site";

describe("price sheet", () => {
  it("matches the agreed prices", () => {
    const prices = Object.fromEntries([...offers, ...plans].map((o) => [o.name, o.price]));
    expect(prices).toEqual({
      "Starter Site": "$1,800",
      "Booking Site": "$3,200",
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

describe("honest content", () => {
  it("lists only the real case studies", () => {
    expect(work.map((w) => w.name)).toEqual(["Mint Coupe", "Visu Kitchen"]);
  });
});
