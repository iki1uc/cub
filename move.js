function renderGlobalOrbit() {
  const orbitIndex = Aufzug.getSharedValue('orbitIndex');
  if (orbitIndex === undefined) return "– kein Orbit –";

  const drift = trackKernelDrift(orbitIndex);

  return `
    Orbit-Index: ${orbitIndex}
    Drift-linear: ${drift[0].drift_linear}
    Drift-modular: ${drift[0].drift_modular}
    Ratio: ${drift[0].drift_ratio}
    Zone: ${axiomZone(orbitIndex)}
    Depth: ${axiomDepth(orbitIndex)}
  `;
}
