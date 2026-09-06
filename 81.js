export function trackAxiomFlow(value, axiom) {
    return {
        axiom,
        flow: value * (axiom.length || 1),
        pulse: value % axiom.length,
        vector: axiom[0] || "O"
    };
}


export function trackRIR(x, y, z) {
    return {
        input: { x, y, z },
        invert: { x: -x, y: -y, z: -z },
        sum: x + y + z,
        product: x * y * z,
        parity: (x + y + z) % 2
    };
}


export function trackBlitz(value) {
    return {
        impulse: value % 3,
        charge: value * 3,
        decay: Math.floor(value / 3)
    };
}


export function trackWork(value) {
    return {
        raw: value,
        load: value % 9,
        cycle: Math.floor(value / 9),
        active: value % 2 === 0
    };
}

export function classifyAxiom(axiom) {
    const map = {
        D: "flow",
        E: "energy",
        I: "input",
        N: "node",
        O: "origin",
        R: "route",
        S: "stream",
        U: "under",
        W: "wind"
    };
    return map[axiom] || "unknown";
}


export function axiomDepth(axiom) {
    const depth = {
        D: 9,
        E: 81,
        I: 3,
        N: 81,
        O: 0,
        R: 27,
        S: 81,
        U: 243,
        W: 27
    };
    return depth[axiom] || 0;
}


export function axiomZone(axiom) {
    const zone = {
        D: "PE",
        E: "PE",
        I: "HY",
        N: "PER",
        O: "NC",
        R: "KANAL",
        S: "TMP-beta",
        U: "WARB",
        W: "TMP-gamma"
    };
    return zone[axiom] || "NC";
}


export function trackAll(value, axiom, x, y, z) {

    return {
        kernel: trackKernelDrift(value),
        axiom: trackAxiomFlow(value, axiom),
        rir: trackRIR(x, y, z),
        blitz: trackBlitz(value),
        work: trackWork(value),

        axiomTag: {
            input: axiom,
            class: classifyAxiom(axiom),
            depth: axiomDepth(axiom),
            zone: axiomZone(axiom)
        },

        meta: {
            value,
            xyz: { x, y, z },
            timestamp: new Date().toISOString(),
            version: "cub-axiom+"
        }
    };
}
