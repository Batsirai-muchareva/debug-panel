// export interface LocatorState {
//     pathStack: ( string | number )[];
//     arrayStack: number[];
//     openStack: {
//         path: string;
//         indent: number;
//         isArray: boolean;
//     }[];
// }
//
// export interface SourceRange {
//     start: number;
//     end: number;
// }
//
// export type SourceMap = Record<string, SourceRange>;


// ─── Locator state ──────────────────────────────────────────────────────────

export interface OpenScopeEntry {
    path    : string
    indent  : number
    isArray : boolean
}

export interface LocatorState {
    pathStack  : ( string | number )[]
    arrayStack : number[]
    openStack  : OpenScopeEntry[]
}

// ─── Source map ─────────────────────────────────────────────────────────────

export interface SourceRange {
    start : number
    end   : number
}

export type SourceMap   = Record<string, SourceRange>
export type LinePathMap = Record<number, string>

// ─── Parser ─────────────────────────────────────────────────────────────────

export interface ParsedLineAction {
    apply( map: SourceMap, lineNo: number ): void
}

// ─── Location ───────────────────────────────────────────────────────────────

export interface SourceLocation {
    path   : string
    lineNo : number
}

// ─── Filter ─────────────────────────────────────────────────────────────────

export interface FilterResult {
    lines       : string[]
    matchLineNo : number
    path        : string
}
