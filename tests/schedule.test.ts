import { describe, expect, it } from "vitest";
import { availableTimes, bookableDates, buildCallIcs, formatTime, isBookable, slotStartUtc, type Availability } from "../src/lib/schedule";

const cfg: Availability = {
  timeZone: "America/New_York",
  callMinutes: 20,
  stepMinutes: 30,
  noticeHours: 18,
  daysAhead: 7,
  weekly: { 1: [["12:00", "13:00"], ["17:30", "19:30"]], 6: [["10:00", "11:00"]] },
};

// Sunday Oct 18 2026, 9:00 AM Eastern (EDT, UTC-4).
const sundayMorning = new Date("2026-10-18T13:00:00Z");

describe("availableTimes", () => {
  it("lists start times that fit a whole call", () => {
    // Monday Oct 19 is more than 18 hours out at 12:00.
    expect(availableTimes("2026-10-19", cfg, sundayMorning)).toEqual(["12:00", "12:30", "17:30", "18:00", "18:30", "19:00"]);
  });

  it("drops times inside the notice window", () => {
    // Monday 1:00 AM Eastern: 12:00 and 12:30 are under 18 hours away.
    const lateNight = new Date("2026-10-19T05:00:00Z");
    expect(availableTimes("2026-10-19", cfg, lateNight)).toEqual(["19:00"]);
  });

  it("is empty on closed days and bad input", () => {
    expect(availableTimes("2026-10-20", cfg, sundayMorning)).toEqual([]);
    expect(availableTimes("not-a-date", cfg, sundayMorning)).toEqual([]);
  });
});

describe("bookableDates", () => {
  it("lists only open days inside the window", () => {
    expect(bookableDates(cfg, sundayMorning)).toEqual(["2026-10-19", "2026-10-24"]);
  });
});

describe("isBookable", () => {
  it("rejects a time that isn't offered", () => {
    expect(isBookable("2026-10-19", "12:00", cfg, sundayMorning)).toBe(true);
    expect(isBookable("2026-10-19", "15:00", cfg, sundayMorning)).toBe(false);
  });
});

describe("time zones", () => {
  it("handles the switch off daylight time", () => {
    expect(slotStartUtc("2026-10-31", "10:00", cfg.timeZone).toISOString()).toBe("2026-10-31T14:00:00.000Z");
    expect(slotStartUtc("2026-11-02", "12:00", cfg.timeZone).toISOString()).toBe("2026-11-02T17:00:00.000Z");
  });

  it("formats times for people", () => {
    expect(formatTime("12:00")).toBe("12 PM");
    expect(formatTime("17:30")).toBe("5:30 PM");
    expect(formatTime("09:00")).toBe("9 AM");
  });
});

describe("buildCallIcs", () => {
  it("writes a calendar event for the call", () => {
    const ics = buildCallIcs(
      { uid: "u1", date: "2026-10-19", time: "18:00", summary: "Call with Sam, Sam's Tacos", description: "hi" },
      cfg,
      sundayMorning,
    );
    expect(ics).toContain("DTSTART:20261019T220000Z");
    expect(ics).toContain("DTEND:20261019T222000Z");
    expect(ics).toContain("SUMMARY:Call with Sam\\, Sam's Tacos");
    expect(ics.endsWith("\r\n")).toBe(true);
  });
});
