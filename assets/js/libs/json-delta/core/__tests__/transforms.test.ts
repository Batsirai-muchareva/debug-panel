import type { Change, LineRange } from "../../types";
import {
    applyPolicy,
    changesToLineRanges,
    findScrollTarget,
    lineRangesToLines,
} from "../transforms";

jest.mock("@libs/source-locator", () => ({
    sourceLocator: {
        getSourceMap: jest.fn(),
    },
}));

const getSourceLocator = () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@libs/source-locator").sourceLocator;

describe("applyPolicy", () => {
    it("returns all changes when count is 3 or less", () => {
        const changes: Change[] = [
            { type: "added", path: "a", newValue: 1 },
            { type: "modified", path: "b", oldValue: 0, newValue: 1 },
        ];
        expect(applyPolicy(changes)).toEqual(changes);
        expect(applyPolicy([])).toEqual([]);
    });

    it("returns empty array when more than 3 changes", () => {
        const changes: Change[] = [
            { type: "added", path: "a", newValue: 1 },
            { type: "added", path: "b", newValue: 2 },
            { type: "added", path: "c", newValue: 3 },
            { type: "added", path: "d", newValue: 4 },
        ];
        expect(applyPolicy(changes)).toEqual([]);
    });

    it("returns exactly 3 changes when given 3", () => {
        const changes: Change[] = [
            { type: "added", path: "a", newValue: 1 },
            { type: "added", path: "b", newValue: 2 },
            { type: "added", path: "c", newValue: 3 },
        ];
        expect(applyPolicy(changes)).toHaveLength(3);
    });
});

describe("changesToLineRanges", () => {
    beforeEach(() => {
        getSourceLocator().getSourceMap.mockReturnValue({});
    });

    it("returns line ranges from source map for matching paths", () => {
        getSourceLocator().getSourceMap.mockReturnValue({
            foo: { start: 2, end: 4 },
            bar: { start: 10, end: 12 },
        });
        const changes: Change[] = [
            { type: "modified", path: "foo", oldValue: 1, newValue: 2 },
            { type: "modified", path: "bar", oldValue: 3, newValue: 4 },
        ];
        const ranges = changesToLineRanges(changes);
        expect(ranges).toEqual([
            { startLine: 2, endLine: 4 },
            { startLine: 10, endLine: 12 },
        ]);
    });

    it("drops changes whose path is not in source map", () => {
        getSourceLocator().getSourceMap.mockReturnValue({
            known: { start: 1, end: 2 },
        });
        const changes: Change[] = [
            { type: "modified", path: "known", oldValue: 0, newValue: 1 },
            { type: "modified", path: "unknown", oldValue: 0, newValue: 1 },
        ];
        const ranges = changesToLineRanges(changes);
        expect(ranges).toEqual([{ startLine: 1, endLine: 2 }]);
    });

    it("returns empty array when source map is empty", () => {
        const changes: Change[] = [
            { type: "added", path: "a", newValue: 1 },
        ];
        expect(changesToLineRanges(changes)).toEqual([]);
    });

    it("returns empty array when no changes", () => {
        getSourceLocator().getSourceMap.mockReturnValue({ a: { start: 1, end: 1 } });
        expect(changesToLineRanges([])).toEqual([]);
    });
});

describe("lineRangesToLines", () => {
    it("expands a single range into line numbers", () => {
        const ranges: LineRange[] = [{ startLine: 5, endLine: 7 }];
        expect(lineRangesToLines(ranges)).toEqual([5, 6, 7]);
    });

    it("returns single line when startLine equals endLine", () => {
        const ranges: LineRange[] = [{ startLine: 3, endLine: 3 }];
        expect(lineRangesToLines(ranges)).toEqual([3]);
    });

    it("uses startLine as end when endLine is undefined", () => {
        const ranges: LineRange[] = [{ startLine: 2 }];
        expect(lineRangesToLines(ranges)).toEqual([2]);
    });

    it("skips ranges with undefined startLine", () => {
        const ranges: LineRange[] = [
            { endLine: 5 },
            { startLine: 1, endLine: 2 },
        ] as LineRange[];
        expect(lineRangesToLines(ranges)).toEqual([1, 2]);
    });

    it("flattens multiple ranges", () => {
        const ranges: LineRange[] = [
            { startLine: 1, endLine: 2 },
            { startLine: 5, endLine: 6 },
        ];
        expect(lineRangesToLines(ranges)).toEqual([1, 2, 5, 6]);
    });

    it("returns empty array for empty ranges", () => {
        expect(lineRangesToLines([])).toEqual([]);
    });
});

describe("findScrollTarget", () => {
    it("returns null when no ranges", () => {
        expect(findScrollTarget([])).toBe(null);
    });

    it("returns midpoint of single range", () => {
        const ranges: LineRange[] = [{ startLine: 10, endLine: 14 }];
        expect(findScrollTarget(ranges)).toBe(12);
    });

    it("returns the line for single-line range", () => {
        const ranges: LineRange[] = [{ startLine: 5, endLine: 5 }];
        expect(findScrollTarget(ranges)).toBe(5);
    });

    it("returns midpoint of largest range when multiple ranges", () => {
        const ranges: LineRange[] = [
            { startLine: 1, endLine: 2 },
            { startLine: 10, endLine: 16 },
            { startLine: 20, endLine: 22 },
        ];
        expect(findScrollTarget(ranges)).toBe(13);
    });

    it("uses startLine as end when endLine is undefined", () => {
        const ranges: LineRange[] = [{ startLine: 7 }];
        expect(findScrollTarget(ranges)).toBe(7);
    });

    it("ignores ranges with undefined startLine", () => {
        const ranges: LineRange[] = [
            { startLine: 1, endLine: 10 },
            { endLine: 5 } as LineRange,
        ];
        expect(findScrollTarget(ranges)).toBe(5);
    });
});
