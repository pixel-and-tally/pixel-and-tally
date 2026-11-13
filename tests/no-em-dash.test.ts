import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Style rule: no em dashes (or en dashes used as em dashes) anywhere a visitor can read.
const roots = ["src", "public"];
const exts = [".astro", ".ts", ".css", ".md", ".html", ".svg", ".txt"];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return exts.some((e) => path.endsWith(e)) ? [path] : [];
  });
}

describe("copy style", () => {
  it.each(roots.flatMap(files))("%s has no em dashes", (path) => {
    const lines = readFileSync(path, "utf8").split("\n");
    const hits = lines.flatMap((line, i) => (/[\u2014\u2013]/.test(line) ? [`${path}:${i + 1}: ${line.trim()}`] : []));
    expect(hits).toEqual([]);
  });
});
