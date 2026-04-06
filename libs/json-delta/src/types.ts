export type LineRange = {
    startLine?: number;
    endLine?: number;
};

export type ChangeType = "added" | "removed" | "modified";

export type Change = LineRange & {
    type: ChangeType;
    path: string;
    oldValue?: unknown;
    newValue?: unknown;
};

export type JsonObject = Record<string, unknown>;

export type CommitResult = {
    changes: Change[];
    lineRanges: LineRange[];
    lines: number[];
    scrollTarget: number | null;
};
