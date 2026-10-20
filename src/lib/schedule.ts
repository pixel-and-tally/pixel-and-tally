// Call scheduling, ported from Mint Coupe's booking calendar (weekly availability
// windows, slot math, advance notice, DST-safe Eastern time, .ics file). No
// database: a visitor requests a slot and the owner confirms it by email.
// Runs in the browser (to fill the time picker) and on the server (to re-check).

export type TimeRange = readonly [start: string, end: string]; // "HH:MM", 24h

export type Availability = {
  timeZone: string;
  callMinutes: number;
  /** Minutes between possible start times. */
  stepMinutes: number;
  /** Earliest a call can be requested, in hours from now. */
  noticeHours: number;
  /** How far ahead the date picker goes. */
  daysAhead: number;
  /** 0 = Sunday ... 6 = Saturday. Missing days are closed. */
  weekly: Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, readonly TimeRange[]>>;
};

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fromMinutes = (n: number) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

/** "YYYY-MM-DD" for `date` as observed in `timeZone`. */
export function localDateString(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(date);
}

/** DST-safe conversion of a wall-clock time in `timeZone` to the equivalent UTC Date. */
export function zonedWallTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(utcGuess).map((p) => [p.type, p.value]));
  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) === 24 ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return new Date(utcGuess.getTime() - (asIfUtc - utcGuess.getTime()));
}

export function slotStartUtc(date: string, time: string, timeZone: string): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  return zonedWallTimeToUtc(y, mo, d, h, mi, timeZone);
}

/** Start times on `date` (local to the availability's time zone) that fit a whole call and meet the notice. */
export function availableTimes(date: string, cfg: Availability, now: Date): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay() as keyof Availability["weekly"];
  const earliest = now.getTime() + cfg.noticeHours * 3_600_000;
  return (cfg.weekly[weekday] ?? []).flatMap(([start, end]) => {
    const times: string[] = [];
    for (let t = toMinutes(start); t + cfg.callMinutes <= toMinutes(end); t += cfg.stepMinutes) {
      const time = fromMinutes(t);
      if (slotStartUtc(date, time, cfg.timeZone).getTime() >= earliest) times.push(time);
    }
    return times;
  });
}

/** Dates in the picker window that have at least one open time. */
export function bookableDates(cfg: Availability, now: Date): string[] {
  const [y, m, d] = localDateString(now, cfg.timeZone).split("-").map(Number);
  const dates: string[] = [];
  for (let i = 0; i <= cfg.daysAhead; i++) {
    const date = new Date(Date.UTC(y, m - 1, d + i)).toISOString().slice(0, 10);
    if (availableTimes(date, cfg, now).length) dates.push(date);
  }
  return dates;
}

export function isBookable(date: string, time: string, cfg: Availability, now: Date): boolean {
  return availableTimes(date, cfg, now).includes(time);
}

/** "18:30" -> "6:30 PM", "12:00" -> "12 PM". */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
}

/** "2026-10-22" -> "Thursday, October 22". */
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`),
  );
}

const toIcsUtc = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
const escapeIcsText = (text: string) =>
  text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** A minimal RFC 5545 calendar file for the requested call, so it can be added in one tap. */
export function buildCallIcs(
  input: { uid: string; date: string; time: string; summary: string; description: string },
  cfg: Availability,
  now: Date,
): string {
  const start = slotStartUtc(input.date, input.time, cfg.timeZone);
  const end = new Date(start.getTime() + cfg.callMinutes * 60_000);
  return (
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Pixel & Tally//Call request//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${input.uid}`,
      `DTSTAMP:${toIcsUtc(now)}`,
      `DTSTART:${toIcsUtc(start)}`,
      `DTEND:${toIcsUtc(end)}`,
      `SUMMARY:${escapeIcsText(input.summary)}`,
      `DESCRIPTION:${escapeIcsText(input.description)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n") + "\r\n"
  );
}
