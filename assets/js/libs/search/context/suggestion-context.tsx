import React, { PropsWithChildren } from "react"
import { createContext, useContext, useMemo, useState } from "@wordpress/element";

import { pathIndex, usePath } from "@libs/path";

// import { debugStorage, store } from "@libs/storage";
import { useSearch } from "./search-context";

type State = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    /** Flat filtered + deduped list for keyboard navigation */
    suggestions: string[];
    /** Same paths split into Keys / Paths groups for rendering */
    categories: Category[];
};

const SuggestionsContext = createContext<State | undefined>( undefined );


/**
 * Given the full list of indexed paths and the current path prefix,
 * return only the paths that start with that prefix.
 *
 * e.g. prefix = "settings" → ["settings.general", "settings.advanced", ...]
 *      prefix = ""          → all paths (unfiltered)
 */

export type Category = {
    label: string;
    items: string[];
};

/**
 * Returns the next drill-down segment for a given path under a scope.
 *
 * scope = "settings", path = "settings.general.theme"  →  "general"
 * scope = "",         path = "settings.general.theme"  →  "settings"
 */
function getNextSegment( fullPath: string, scope: string ): string {
    const remainder = scope ? fullPath.slice( scope.length + 1 ) : fullPath;
    return remainder.split( '.' )[ 0 ];
}

/** Keeps only paths that are descendants of the active scope. */
function scopeToPaths( paths: string[], scope: string ): string[] {
    if ( ! scope ) return paths;
    const prefix = scope.toLowerCase() + '.';
    return paths.filter( p => p.toLowerCase().startsWith( prefix ) );
}

/** Keeps only paths whose next segment contains the query string. */
function filterByQuery( paths: string[], scope: string, query: string ): string[] {
    if ( ! query ) return paths;
    const q = query.toLowerCase();
    return paths.filter( p =>
        p.toLowerCase().includes( q )
    ); // getNextSegment( p, scope )
}

/**
 * Removes duplicates that share the same next segment.
 * e.g. "settings.theme.dark" and "settings.theme.light" both resolve
 * to "theme" — only the first is kept.
 */
function dedupeByNextSegment( paths: string[], scope: string ): string[] {
    const seen = new Set<string>();
    return paths.filter( p => {
        const segment = getNextSegment( p, scope );
        if ( seen.has( segment ) ) return false;
        seen.add( segment );
        return true;
    } );
}

const PATHS_LIMIT = 10;

/**
 * Keys  = matched paths that exist as direct entries in the index.
 * Paths = all descendants of those matched keys, flattened and deduped,
 *         capped at PATHS_LIMIT. Excludes the matched key itself.
 *
 * e.g. query="sett", scope="", matched key="settings"
 *   → settings.classes
 *   → settings.classes.$$type
 *   → settings.classes.value
 *   → settings.title
 *   → settings.title.$$type
 *   → settings.title.value
 *   → settings.title.value.content
 *   → ... (up to PATHS_LIMIT)
 */
function groupIntoCategories( paths: string[], allPaths: string[], scope: string ): Category[] {
    const allPathsLower = new Set( allPaths.map( p => p.toLowerCase() ) );

    // Keys: matched paths that exist directly in the index
    const keys = paths.filter( p => {
        const segment    = getNextSegment( p, scope );
        const scopedPath = scope ? `${ scope }.${ segment }` : segment;
        return allPathsLower.has( scopedPath.toLowerCase() );
    } );

    // Paths: all descendants of matched keys, flattened, deduped, capped
    const nestedSeen = new Set<string>();
    const nested: string[] = [];

    for ( const keyPath of keys ) {
        if ( nested.length >= PATHS_LIMIT ) break;

        const segment   = getNextSegment( keyPath, scope );
        const scopedKey = scope ? `${ scope }.${ segment }` : segment;
        const prefix    = scopedKey.toLowerCase() + '.';

        for ( const ap of allPaths ) {
            if ( nested.length >= PATHS_LIMIT ) break;
            if ( ! ap.toLowerCase().startsWith( prefix ) ) continue;
            if ( nestedSeen.has( ap.toLowerCase() ) ) continue;

            nestedSeen.add( ap.toLowerCase() );
            nested.push( ap );
        }
    }

    return [
        { label: 'Keys',  items: keys   },
        { label: 'Paths', items: nested },
    ].filter( cat => cat.items.length > 0 );
}

// ─── Pipeline ─────────────────────────────────────────────────────────────────

function buildCategories( allPaths: string[], scope: string, query: string ): Category[] {
    const scoped   = scopeToPaths( allPaths, scope );
    const filtered = filterByQuery( scoped, scope, query );

    const grouped = groupIntoCategories( filtered, allPaths, scope );

    // Dedupe Keys by next segment — Paths are already deduped inside groupIntoCategories
    return grouped.map( cat => ( {
        ...cat,
        items: cat.label === 'Keys'
            ? dedupeByNextSegment( cat.items, scope )
            : cat.items,
    } ) ).filter( cat => cat.items.length > 0 );
}


export const SuggestionsProvider = ( { children }: PropsWithChildren ) => {
    const [ isOpen, setIsOpen ] = useState( false );

    const { path } = usePath();

    // The search query typed by the user (last path segment / free text)
    const { query } = useSearch();

    const categories = useMemo( () => {
        const allPaths = pathIndex.get() as string[];
        return buildCategories( allPaths, path ?? '', query );

        // return filterSuggestions( allPaths, filterPrefix );
    }, [ path, query ] );
    // }, [ filterPrefix ] );

    const suggestions = useMemo(
        () => categories.flatMap( cat => cat.items ),
        [ categories ]
    );

    return (
        <SuggestionsContext.Provider
            value={ {
                isOpen,
                open: () => setIsOpen( true ),
                close: () => setIsOpen( false ),
                suggestions,
                categories
            } }
        >
            { children }
        </SuggestionsContext.Provider>
    )
};

export const useSuggestions = () => {
    const context = useContext( SuggestionsContext );

    if ( ! context ) {
        throw new Error( 'useSuggestion must be used within SuggestionProvider' );
    }

    return context;
}
// const addRecent = ( path: string ) => {
//
//     // setRecentSearches( prev => {
//     //     const next = [ path, ...prev.filter( p => p !== path ) ].slice( 0, 5 );
//
//         // TODO expose fxns atleast than the strings
//         debugStorage.set( `recent-searches:${ variantId }`, next );
//
//         return next;
//     // } );
// };// const filterPrefix = useMemo( () => {
//     if ( path && query ) {
//         // Combine so we narrow inside the active path section
//         return `${ path }.${ query }`;
//     }
//     return path || query || "";
// }, [ path, query ] );
// /**
//  * Returns the next drill-down segment for a given path under a scope.
//  *
//  * scope = "settings", path = "settings.general.theme"  →  "general"
//  * scope = "",         path = "settings.general.theme"  →  "settings"
//  */
// function getNextSegment( fullPath: string, scope: string ): string {
//     const remainder = scope ? fullPath.slice( scope.length + 1 ) : fullPath;
//     return remainder.split( '.' )[ 0 ];
// }
//
// /** Keeps only paths that are descendants of the active scope. */
// function scopeToPaths( paths: string[], scope: string ): string[] {
//     if ( ! scope ) return paths;
//     const prefix = scope.toLowerCase() + '.';
//     return paths.filter( p => p.toLowerCase().startsWith( prefix ) );
// }
//
// /** Keeps only paths whose next segment contains the query string. */
// function filterByQuery( paths: string[], scope: string, query: string ): string[] {
//     if ( ! query ) return paths;
//     const q = query.toLowerCase();
//     return paths.filter( p =>
//         getNextSegment( p, scope ).toLowerCase().includes( q )
//     );
// }
//
// /**
//  * Removes duplicates that share the same next segment.
//  * e.g. "settings.theme.dark" and "settings.theme.light" both resolve
//  * to "theme" — only the first is kept.
//  */
// function dedupeByNextSegment( paths: string[], scope: string ): string[] {
//     const seen = new Set<string>();
//     return paths.filter( p => {
//         const segment = getNextSegment( p, scope );
//         if ( seen.has( segment ) ) return false;
//         seen.add( segment );
//         return true;
//     } );
// }
//
// /**
//  * Keys  = matched paths that exist as direct entries in the index.
//  * Paths = the immediate children of those matched keys that also have children
//  *         (i.e. the drillable paths beneath each matched key).
//  *
//  * e.g. query="sett", scope=""
//  *   matched keys  → ["settings", "editor_settings"]
//  *   children of "settings" that are themselves parents:
//  *                 → ["settings.title", "settings.classes", ...]  → Paths
//  */
// function groupIntoCategories( paths: string[], allPaths: string[], scope: string ): Category[] {
//     const allPathsLower = new Set( allPaths.map( p => p.toLowerCase() ) );
//
//     // Keys: matched paths that exist directly in the index
//     const keys = paths.filter( p => {
//         const segment    = getNextSegment( p, scope );
//         const scopedPath = scope ? `${ scope }.${ segment }` : segment;
//         return allPathsLower.has( scopedPath.toLowerCase() );
//     } );
//
//     // Paths: immediate children of each matched key, deduplicated by next segment
//     const nestedSeen = new Set<string>();
//     const nested: string[] = [];
//
//     for ( const keyPath of keys ) {
//         const segment    = getNextSegment( keyPath, scope );
//         const scopedKey  = scope ? `${ scope }.${ segment }` : segment;
//         const prefix     = scopedKey.toLowerCase() + '.';
//
//         for ( const ap of allPaths ) {
//             if ( ! ap.toLowerCase().startsWith( prefix ) ) continue;
//
//             // next segment after the matched key
//             const childSegment = ap.slice( scopedKey.length + 1 ).split( '.' )[ 0 ];
//             const childPath    = `${ scopedKey }.${ childSegment }`;
//
//             if ( nestedSeen.has( childPath.toLowerCase() ) ) continue;
//             nestedSeen.add( childPath.toLowerCase() );
//             nested.push( childPath );
//         }
//     }
//
//     return [
//         { label: 'Keys',  items: keys   },
//         { label: 'Paths', items: nested },
//     ].filter( cat => cat.items.length > 0 );
// }
//
// // ─── Pipeline ─────────────────────────────────────────────────────────────────
//
// function buildCategories( allPaths: string[], scope: string, query: string ): Category[] {
//     const scoped   = scopeToPaths( allPaths, scope );
//     const filtered = filterByQuery( scoped, scope, query );
//
//     const grouped = groupIntoCategories( filtered, allPaths, scope );
//
//     // Dedupe Keys by next segment — Paths are already deduped inside groupIntoCategories
//     return grouped.map( cat => ( {
//         ...cat,
//         items: cat.label === 'Keys'
//             ? dedupeByNextSegment( cat.items, scope )
//             : cat.items,
//     } ) ).filter( cat => cat.items.length > 0 );
// }
//
// /**
//  * Returns the next drill-down segment for a given path under a scope.
//  *
//  * scope = "settings", path = "settings.general.theme"  →  "general"
//  * scope = "",         path = "settings.general.theme"  →  "settings"
//  */
// function getNextSegment( fullPath: string, scope: string ): string {
//     const remainder = scope ? fullPath.slice( scope.length + 1 ) : fullPath;
//     return remainder.split( '.' )[ 0 ];
// }
//
// /** Keeps only paths that are descendants of the active scope. */
// function scopeToPaths( paths: string[], scope: string ): string[] {
//     if ( ! scope ) return paths;
//     const prefix = scope.toLowerCase() + '.';
//     return paths.filter( p => p.toLowerCase().startsWith( prefix ) );
// }
//
// /** Keeps only paths whose next segment contains the query string. */
// function filterByQuery( paths: string[], scope: string, query: string ): string[] {
//     if ( ! query ) return paths;
//     const q = query.toLowerCase();
//     return paths.filter( p =>
//         getNextSegment( p, scope ).toLowerCase().includes( q )
//     );
// }
//
// /**
//  * Removes duplicates that share the same next segment.
//  * e.g. "settings.theme.dark" and "settings.theme.light" both resolve
//  * to "theme" — only the first is kept.
//  */
// function dedupeByNextSegment( paths: string[], scope: string ): string[] {
//     const seen = new Set<string>();
//     return paths.filter( p => {
//         const segment = getNextSegment( p, scope );
//         if ( seen.has( segment ) ) return false;
//         seen.add( segment );
//         return true;
//     } );
// }
//
// /** Splits paths into flat Keys (no dot) and nested Paths (has dot). */
// function groupIntoCategories( paths: string[] ): Category[] {
//     const keys   = paths.filter( p => ! p.includes( '.' ) );
//     const nested = paths.filter( p =>   p.includes( '.' ) );
//
//     return [
//         { label: 'Keys',  items: keys   },
//         { label: 'Paths', items: nested },
//     ].filter( cat => cat.items.length > 0 );
// }
//
// function buildCategories( allPaths: string[], scope: string, query: string ): Category[] {
//     // const categories = useMemo( (): Category[] => {
//         const q = query.toLowerCase();
//         const path = scope;
//         const paths = allPaths;
//
//         // When path is set, only show paths that start with it
//         const scoped = path
//             ? paths.filter( p => p.toLowerCase().startsWith( path.toLowerCase() + '.' ) )
//             : paths;
//
//         const filtered = scoped.filter( p => {
//             // Match against the next segment after the current path, not the full string
//             const remainder = path
//                 ? p.slice( path.length + 1 ) // strip "path." prefix
//                 : p;
//             const nextSegment = remainder?.split( '.' )[ 0 ];
//             return nextSegment.toLowerCase().includes( q );
//         } );
//
//         // Dedupe by next segment — multiple deep paths can share the same next segment
//         const seen = new Set<string>();
//         const uniqued = filtered.filter( p => {
//             const remainder = path ? p.slice( path.length + 1 ) : p;
//             const nextSegment = remainder?.split( '.' )[ 0 ];
//             if ( seen.has( nextSegment ) ) return false;
//             seen.add( nextSegment );
//             return true;
//         } );
//
//         const keys   = uniqued.filter( p => ! p.includes( '.' ) );
//         const nested = uniqued.filter( p =>   p.includes( '.' ) );
//
//         return [
//             { label: 'Keys',  items: keys   },
//             { label: 'Paths', items: nested },
//         ].filter( cat => cat.items.length > 0 );
//     // }, [ paths, query, path ] );
// // You're right. Right now EmptyState only shows when categories is empty,
// // but categories can be empty for two reasons — no query typed yet (panel just opened)
// // OR query typed but nothing matched. It should only show when there's an active query that returned nothing.
//
//     // const scoped   = scopeToPaths( allPaths, scope );
//     // const filtered = filterByQuery( scoped, scope, query );
//     // const uniqued  = dedupeByNextSegment( filtered, scope );
//     // return groupIntoCategories( uniqued );
// }
// /**
//  * Returns the next drill-down segment for a given path under a scope.
//  *
//  * scope = "settings", path = "settings.general.theme"  →  "general"
//  * scope = "",         path = "settings.general.theme"  →  "settings"
//  */
// function getNextSegment( fullPath: string, scope: string ): string {
//     const remainder = scope ? fullPath.slice( scope.length + 1 ) : fullPath;
//     return remainder.split( '.' )[ 0 ];
// }
//
// /** Keeps only paths that are descendants of the active scope. */
// function scopeToPaths( paths: string[], scope: string ): string[] {
//     if ( ! scope ) return paths;
//     const prefix = scope.toLowerCase() + '.';
//     return paths.filter( p => p.toLowerCase().startsWith( prefix ) );
// }
//
// /** Keeps only paths whose next segment contains the query string. */
// function filterByQuery( paths: string[], scope: string, query: string ): string[] {
//     if ( ! query ) return paths;
//     const q = query.toLowerCase();
//     return paths.filter( p =>
//         getNextSegment( p, scope ).toLowerCase().includes( q )
//     );
// }
//
// /**
//  * Removes duplicates that share the same next segment.
//  * e.g. "settings.theme.dark" and "settings.theme.light" both resolve
//  * to "theme" — only the first is kept.
//  */
// function dedupeByNextSegment( paths: string[], scope: string ): string[] {
//     const seen = new Set<string>();
//     return paths.filter( p => {
//         const segment = getNextSegment( p, scope );
//         if ( seen.has( segment ) ) return false;
//         seen.add( segment );
//         return true;
//     } );
// }
//
// /**
//  * A path is a Key if its next segment has no children in the full index.
//  * A path is a nested Path if there are deeper entries beneath that segment.
//  *
//  * e.g. allPaths = ["settings", "settings.title", "settings.title.value"]
//  *      scope    = ""
//  *
//  *  "settings"  → next segment "settings" has children → Path
//  *  (after scoping to "settings"):
//  *  "settings.title" → next segment "title" has children → Path
//  *  "settings.title.value" → next segment "value", no children → Key
//  */
// function groupIntoCategories( paths: string[], allPaths: string[], scope: string ): Category[] {
//     const keys: string[]   = [];
//     const nested: string[] = [];
//
//     for ( const p of paths ) {
//         const segment    = getNextSegment( p, scope );
//         const scopedPath = scope ? `${ scope }.${ segment }` : segment;
//         const hasChildren = allPaths.some( ap =>
//             ap.toLowerCase().startsWith( scopedPath.toLowerCase() + '.' )
//         );
//
//         if ( hasChildren ) {
//             nested.push( p );
//         } else {
//             keys.push( p );
//         }
//     }
//
//     return [
//         { label: 'Keys',  items: keys   },
//         { label: 'Paths', items: nested },
//     ].filter( cat => cat.items.length > 0 );
// }
//
//
// function buildCategories( allPaths: string[], scope: string, query: string ): Category[] {
//     const scoped   = scopeToPaths( allPaths, scope );
//     const filtered = filterByQuery( scoped, scope, query );
//     const uniqued  = dedupeByNextSegment( filtered, scope );
//     return groupIntoCategories( uniqued, allPaths, scope );
// }
//
// /**
//  * Returns the next drill-down segment for a given path under a scope.
//  *
//  * scope = "settings", path = "settings.general.theme"  →  "general"
//  * scope = "",         path = "settings.general.theme"  →  "settings"
//  */
// function getNextSegment( fullPath: string, scope: string ): string {
//     const remainder = scope ? fullPath.slice( scope.length + 1 ) : fullPath;
//     return remainder.split( '.' )[ 0 ];
// }
//
// /** Keeps only paths that are descendants of the active scope. */
// function scopeToPaths( paths: string[], scope: string ): string[] {
//     if ( ! scope ) return paths;
//     const prefix = scope.toLowerCase() + '.';
//     return paths.filter( p => p.toLowerCase().startsWith( prefix ) );
// }
//
// /** Keeps only paths whose next segment contains the query string. */
// function filterByQuery( paths: string[], scope: string, query: string ): string[] {
//     if ( ! query ) return paths;
//     const q = query.toLowerCase();
//     return paths.filter( p =>
//         getNextSegment( p, scope ).toLowerCase().includes( q )
//     );
// }
//
// /**
//  * Removes duplicates that share the same next segment.
//  * e.g. "settings.theme.dark" and "settings.theme.light" both resolve
//  * to "theme" — only the first is kept.
//  */
// function dedupeByNextSegment( paths: string[], scope: string ): string[] {
//     const seen = new Set<string>();
//     return paths.filter( p => {
//         const segment = getNextSegment( p, scope );
//         if ( seen.has( segment ) ) return false;
//         seen.add( segment );
//         return true;
//     } );
// }
//
// /**
//  * A path is a Key if its next segment exists as a direct entry in the index.
//  * A path is a nested Path if the next segment only exists as a parent (not a
//  * direct entry itself) — meaning you can only reach it by drilling deeper.
//  *
//  * e.g. allPaths = ["settings", "settings.title", "settings.title.value"]
//  *      scope    = ""
//  *
//  *  "settings"       → "settings" exists directly in index     → Key
//  *  "settings.title" → "settings.title" exists directly        → Key
//  *  (but if "settings.title" were NOT in index, only its children were → Path)
//  */
// function groupIntoCategories( paths: string[], allPaths: string[], scope: string ): Category[] {
//     const allPathsLower = new Set( allPaths.map( p => p.toLowerCase() ) );
//     const keys: string[]   = [];
//     const nested: string[] = [];
//
//     for ( const p of paths ) {
//         const segment    = getNextSegment( p, scope );
//         const scopedPath = scope ? `${ scope }.${ segment }` : segment;
//         const isDirectKey = allPathsLower.has( scopedPath.toLowerCase() );
//
//         if ( isDirectKey ) {
//             keys.push( p );
//         } else {
//             nested.push( p );
//         }
//     }
//
//     return [
//         { label: 'Keys',  items: keys   },
//         { label: 'Paths', items: nested },
//     ].filter( cat => cat.items.length > 0 );
// }
//
// // ─── Pipeline ─────────────────────────────────────────────────────────────────
//
// function buildCategories( allPaths: string[], scope: string, query: string ): Category[] {
//     const scoped   = scopeToPaths( allPaths, scope );
//     const filtered = filterByQuery( scoped, scope, query );
//     const uniqued  = dedupeByNextSegment( filtered, scope );
//     return groupIntoCategories( uniqued, allPaths, scope );
// }
//
// /**
//  * Returns the next drill-down segment for a given path under a scope.
//  *
//  * scope = "settings", path = "settings.general.theme"  →  "general"
//  * scope = "",         path = "settings.general.theme"  →  "settings"
//  */
// function getNextSegment( fullPath: string, scope: string ): string {
//     const remainder = scope ? fullPath.slice( scope.length + 1 ) : fullPath;
//     return remainder.split( '.' )[ 0 ];
// }
//
// /** Keeps only paths that are descendants of the active scope. */
// function scopeToPaths( paths: string[], scope: string ): string[] {
//     if ( ! scope ) return paths;
//     const prefix = scope.toLowerCase() + '.';
//     return paths.filter( p => p.toLowerCase().startsWith( prefix ) );
// }
//
// /** Keeps only paths whose next segment contains the query string. */
// function filterByQuery( paths: string[], scope: string, query: string ): string[] {
//     if ( ! query ) return paths;
//     const q = query.toLowerCase();
//     return paths.filter( p =>
//         getNextSegment( p, scope ).toLowerCase().includes( q )
//     );
// }
//
// /**
//  * Removes duplicates that share the same next segment.
//  * e.g. "settings.theme.dark" and "settings.theme.light" both resolve
//  * to "theme" — only the first is kept.
//  */
// function dedupeByNextSegment( paths: string[], scope: string ): string[] {
//     const seen = new Set<string>();
//     return paths.filter( p => {
//         const segment = getNextSegment( p, scope );
//         if ( seen.has( segment ) ) return false;
//         seen.add( segment );
//         return true;
//     } );
// }
//
// /**
//  * A path is a Key if its next segment exists as a direct entry in the index.
//  * A path is a nested Path if the next segment only exists as a parent (not a
//  * direct entry itself) — meaning you can only reach it by drilling deeper.
//  *
//  * e.g. allPaths = ["settings", "settings.title", "settings.title.value"]
//  *      scope    = ""
//  *
//  *  "settings"       → "settings" exists directly in index     → Key
//  *  "settings.title" → "settings.title" exists directly        → Key
//  *  (but if "settings.title" were NOT in index, only its children were → Path)
//  */
// function groupIntoCategories( paths: string[], allPaths: string[], scope: string ): Category[] {
//     const allPathsLower = new Set( allPaths.map( p => p.toLowerCase() ) );
//     const keys: string[]   = [];
//     const nested: string[] = [];
//
//     for ( const p of paths ) {
//         const segment    = getNextSegment( p, scope );
//         const scopedPath = scope ? `${ scope }.${ segment }` : segment;
//         const isDirectKey = allPathsLower.has( scopedPath.toLowerCase() );
//
//         if ( isDirectKey ) {
//             keys.push( p );
//         } else {
//             nested.push( p );
//         }
//     }
//
//     return [
//         { label: 'Keys',  items: keys   },
//         { label: 'Paths', items: nested },
//     ].filter( cat => cat.items.length > 0 );
// }
//
// // ─── Pipeline ─────────────────────────────────────────────────────────────────
//
// function buildCategories( allPaths: string[], scope: string, query: string ): Category[] {
//     const scoped   = scopeToPaths( allPaths, scope );
//     const filtered = filterByQuery( scoped, scope, query );
//
//     // Group first so Keys and Paths are separated before deduping.
//     // Deduping before grouping would drop e.g. "settings.title" because
//     // "settings" already claimed the "settings" next-segment slot.
//     const grouped  = groupIntoCategories( filtered, allPaths, scope );
//
//     return grouped.map( cat => ( {
//         ...cat,
//         items: dedupeByNextSegment( cat.items, scope ),
//     } ) ).filter( cat => cat.items.length > 0 );
// }
// function filterSuggestions( allPaths: string[], pathPrefix: string ): string[] {
//     if ( ! pathPrefix ) {
//         return allPaths;
//     }
//
//     const normalised = pathPrefix.toLowerCase();
//
//     return allPaths.filter( ( p ) =>
//         p.toLowerCase().startsWith( normalised )
//     );
// }
