export function trackAll(value, axiom, x, y, z) {
    return {
        kernel: trackKernelDrift(value),
        axiom: trackAxiomFlow(value, axiom),
        rir: trackRIR(x, y, z),
        blitz: trackBlitz(value),
        work: trackWork(value),
        timestamp: new Date().toISOString()
    };
}
