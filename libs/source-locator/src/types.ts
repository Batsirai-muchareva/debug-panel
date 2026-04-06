export interface LocatorState {
    pathStack: ( string | number )[];
    arrayStack: number[];
    openStack: {
        path: string;
        indent: number;
        isArray: boolean;
    }[];
}

export interface SourceRange {
    start: number;
    end: number;
}

export type SourceMap = Record<string, SourceRange>;
