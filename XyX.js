export function XyX(x, y, z) {

  const sum = x + y + z;

  // AIR = gerade Summe / AIV = ungerade Summe
  const mode = sum % 2 === 0 ? "AIR" : "AIV";

  // 9‑Symbol‑Zone
  const symbols = {
    AIR: "◉",
    AIV: "◎",
    lift: "△",
    down: "◆",
    loop: "▣"
  };

  // Segment‑Matrix (HY / PE / PER / TRANS / WARB / KANAL / TMP)
  const segment = (() => {
    if (sum < 10) return "HY";
    if (sum < 30) return "PE";
    if (sum < 60) return "PER";
    if (sum < 100) return "TRANS";
    if (sum < 200) return "WARB";
    if (sum < 400) return "KANAL";
    if (sum % 3 === 0) return "TMP-alpha";
    if (sum % 9 === 0) return "TMP-beta";
    return "TMP-gamma";
  })();

  // Timing (3 → 9 → 81 → 27 → 3↺)
  const timing = {
    t3: sum % 3,
    t9: sum % 9,
    t81: sum % 81,
    t27: sum % 27,
    loop: sum % 3 === 0 ? "3↺" : null
  };

  return {
    mode,                       // AIR / AIV
    symbol: symbols[mode],      // ◉ / ◎
    lift: mode === "AIR" ? sum * 1.5 : 0,
    down: mode === "AIV" ? sum * 2.1 : 0,
    segment,                    // HY / PE / PER / TRANS / WARB / KANAL / TMP
    timing,                     // 3‑9‑81‑27‑Loop
    D: `DimX(${x * y * z})`,
    Q: (x + y + z) % 7,
    F: `Fxy-${x}-${y}-${z}`
  };
}
