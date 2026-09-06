export function trackWork(value) {
    try {
        return RUN_WORK(value);
    } catch (e) {
        return { error: e.message };
    }
}

