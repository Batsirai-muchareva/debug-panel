/**
 * Joins a current path with a new segment.
 * If no current path, returns the segment as the root.
 *
 * @example
 * buildCandidatePath( 'settings', 'title' ) // → 'settings.title'
 * buildCandidatePath( null, 'settings' )     // → 'settings'
 */
export const buildPath = (
    path: string | null,
    segment: string,
): string => {
    return path ? `${ path }.${ segment }` : segment;
};

/**
 * const matchExact = ( query: string ): boolean => {
 *
 *     const candidate = buildCandidate( path, query);
 *
 *     if ( ! pathIndex22.exists( candidate ) ) {
 *         return false;
 *     }
 *
 *     setPath( candidate );
 *     setQuery( query );
 *
 *     return true;
 * };
 *
 * import { useCallback } from "@wordpress/element";
 * import { usePath } from "@libs/path";
 * import { pathIndex } from "@libs/path-index";
 *
 * export const usePathQuery = (setQuery: (q: string) => void) => {
 *
 *     const { path, setPath } = usePath();
 *
 *     const buildCandidate = (segment: string) =>
 *         path ? `${path}.${segment}` : segment;
 *
 *     const commitSegment = useCallback((segment: string) => {
 *
 *         const candidate = buildCandidate(segment);
 *
 *         if (!pathIndex.exists(candidate)) {
 *             setQuery(segment);
 *             return;
 *         }
 *
 *         setPath(candidate);
 *         setQuery('');
 *
 *     }, [path]);
 *
 *     const matchExact = useCallback((query: string) => {
 *
 *         const candidate = buildCandidate(query);
 *
 *         if (!pathIndex.exists(candidate)) return false;
 *
 *         setPath(candidate);
 *         setQuery(query);
 *
 *         return true;
 *
 *     }, [path]);
 *
 *     const handlePathDiverged = useCallback((query: string) => {
 *
 *         if (!path) return;
 *
 *         const parts = path.split('.');
 *         const tail = parts.at(-1) ?? '';
 *
 *         const stillMatching =
 *             tail.toLowerCase().startsWith(query.toLowerCase());
 *
 *         if (!stillMatching) {
 *
 *             const parent = parts.slice(0, -1).join('.');
 *
 *             setPath(parent || null);
 *         }
 *
 *     }, [path]);
 *
 *     const setPathQuery = useCallback((query: string) => {
 *
 *         if (query.endsWith('.')) {
 *             commitSegment(query.slice(0, -1));
 *             return;
 *         }
 *
 *         if (matchExact(query)) return;
 *
 *         handlePathDiverged(query);
 *
 *         setQuery(query);
 *
 *     }, [commitSegment, matchExact, handlePathDiverged]);
 *
 *     const handleBackSpace = useCallback(() => {
 *
 *         if (!path) return;
 *
 *         const parts = path.split('.');
 *         const last = parts.pop();
 *
 *         setPath(parts.join('.'));
 *         setQuery(last ?? '');
 *
 *     }, [path]);
 *
 *     return { setPathQuery, handleBackSpace };
 * };
 */
