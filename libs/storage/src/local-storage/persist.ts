export const persist = ( namespace: string, data: Record<string, unknown> ): void => {
    try {
        localStorage.setItem( namespace, JSON.stringify( data ) );
    } catch {
        console.error( `[${namespace}] Failed to write to localStorage` );
    }
};
