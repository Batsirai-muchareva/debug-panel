export const resolveDataAtPath = (
    path: string,
    getValueAtPath: (path: string) => unknown
): unknown | null => {
    const segments = path.split(".");

    while (segments.length > 0) {
        const candidatePath = segments.join(".");
        const value = getValueAtPath(candidatePath);

        if (value !== undefined) {
            return value;
        }

        segments.pop();
    }

    return null;
};
