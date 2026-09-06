export function classifyError(e) {
    if (e.message.includes("undefined")) return "axiom-undefined";
    if (e.message.includes("NaN")) return "axiom-nan";
    if (e.message.includes("range")) return "axiom-range";
    return "axiom-generic";
}


export function axiomImpact(value) {
    if (value < 3) return "low";
    if (value < 27) return "medium";
    if (value < 81) return "high";
    return "critical";
}


export function RUN_WORK(value) {
    return {
        cycle: Math.floor(value / 9),
        load: value % 9,
        active: value % 2 === 0,
        vector: value % 3,
        drift: trackKernelDrift(value)
    };
}


export function trackWork(value) {

    const result = {
        input: value,
        axiom: classifyAxiom(value),
        depth: axiomDepth(value),
        zone: axiomZone(value),
        drift: trackKernelDrift(value),
        timestamp: new Date().toISOString()
    };

    try {
        result.work = RUN_WORK(value);
    } catch (e) {
        result.error = {
            message: e.message,
            type: classifyError(e),
            axiomImpact: axiomImpact(value)
        };
    }

    return result;
}
