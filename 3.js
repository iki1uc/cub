export function trackKernelDrift(value) {

    const axioms = {
        cub:    [3, 9, 27, 81, 729],
        slide:  [6, 36, 216, 1296],
        space:  [8, 64, 512, 4096],
        hdf:    [9, 81, 729, 6561],
        rom:    [1, 2, 4, 8, 16, 32, 64] // generisch, wird überschrieben
    };

    const driftMatrix = [];

    Object.entries(axioms).forEach(([axiomName, etagen]) => {

        etagen.forEach(e => {

            const geteilt   = value / e;
            const quotient  = Math.floor(value / e);
            const rest      = value - quotient * e;
            const mod       = value % e;

            driftMatrix.push({
                axiom: axiomName,
                etage: e,
                geteilt,
                quotient,
                rest,
                mod,
                drift_linear: geteilt - quotient,
                drift_modular: mod,
                drift_ratio: value / (e || 1)
            });
        });
    });

    return driftMatrix;
}
