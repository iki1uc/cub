export function trackKernelDrift(value) {
    const etagen = [3, 9, 27, 81, 729];
    const drift = [];

    etagen.forEach(e => {
        const geteilt = value / e;
        const mod = value % e;
        const quotient = Math.floor(value / e);
        const rest = value - quotient * e;

        drift.push({
            etage: e,
            geteilt,
            mod,
            quotient,
            rest,
            drift: geteilt - quotient
        });
    });

    return drift;
}

