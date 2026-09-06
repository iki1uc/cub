export function XyX(x, y, z) {
  const sum = x + y + z;
  const mode = sum % 2 === 0 ? "AIR" : "AIV";

  return {
    mode,
    lift: mode === "AIR" ? sum * 1.5 : 0,
    down: mode === "AIV" ? sum * 2.1 : 0,
    D: `DimX(${x * y * z})`,
    Q: (x + y + z) % 7,
    F: `Fxy-${x}-${y}-${z}`
  };
}
