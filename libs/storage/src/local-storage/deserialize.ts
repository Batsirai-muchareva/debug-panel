export const deserialize = ( namespace: string ): Record<string, unknown> => {
    try {
        const stored = localStorage.getItem( namespace );

        return stored ? JSON.parse( stored ) : {};
    } catch {
        return {};
    }
};
