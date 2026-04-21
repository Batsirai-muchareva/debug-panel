export function readFromLocalStorage( namespace: string ): Record<string, unknown> {
    try {
        const raw = localStorage.getItem( namespace );

        return raw ? ( JSON.parse( raw ) as Record<string, unknown> ) : {};
    } catch {
        return {};
    }
}
