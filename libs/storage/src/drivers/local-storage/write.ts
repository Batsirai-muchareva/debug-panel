export function writeToLocalStorage( namespace: string, data: Record<string, unknown> ): void {
    try {
        localStorage.setItem( namespace, JSON.stringify( data ) );
    } catch {
        console.error( `[storage] Failed to write namespace "${ namespace }" to localStorage.` );
    }
}
