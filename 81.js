export function trackAll(value, axiom, x, y, z) {

    return {
        kernel: trackKernelDrift(value),          // 3‑, 6‑, 8‑, 9‑Axiom Drift
        axiom: trackAxiomFlow(value, axiom),      // Axiom‑Flow (3/6/8/9)
        rir: trackRIR(x, y, z),                   // Raum‑Inversions‑Raster
        blitz: trackBlitz(value),                 // Blitz‑Impulse (3‑Axiom)
        work: trackWork(value),                   // Work‑State (cub‑tauglich)
        axiomTag: {
            input: axiom,
            class: classifyAxiom(axiom),          // neue Funktion
            depth: axiomDepth(axiom),             // neue Funktion
            zone: axiomZone(axiom)                // neue Funktion
        },
        meta: {
            value,
            xyz: { x, y, z },
            timestamp: new Date().toISOString(),
            version: "cub-axiom+"
        }
    };
}
