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
