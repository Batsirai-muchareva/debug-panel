import type { JsonObject } from "../../types";
import { jsonDelta } from "../json-delta";

jest.mock("@libs/source-locator", () => ({
    sourceLocator: {
        getSourceMap: jest.fn(() => ({})),
    },
}));

const getSourceLocator = () =>

    require("@libs/source-locator").sourceLocator;

describe("jsonDelta", () => {
    beforeEach(() => {
        jsonDelta.reset();
        getSourceLocator().getSourceMap.mockReturnValue({});
    });

    describe("commit", () => {
        it("returns empty changes on first commit (no previous state)", () => {
            const result = jsonDelta.commit({ a: 1, b: 2 } as JsonObject);
            expect(result.changes).toEqual([]);
            expect(result.lineRanges).toEqual([]);
            expect(result.lines).toEqual([]);
            expect(result.scrollTarget).toBe(null);
        });

        it("returns changes when data differs from previous commit", () => {
            jsonDelta.commit( { a: 1, b: 2 } );
            getSourceLocator().getSourceMap.mockReturnValue({
                b: { start: 2, end: 2 },
            });
            const result = jsonDelta.commit( { a: 1, b: 99 } );
            expect(result.changes).toContainEqual({
                type: "modified",
                path: "b",
                oldValue: 2,
                newValue: 99,
            });
            expect(result.lineRanges).toEqual([{ startLine: 2, endLine: 2 }]);
            expect(result.lines).toEqual([2]);
            expect(result.scrollTarget).toBe(2);
        });

        it("returns empty changes when commit data is equal to previous", () => {
            const data: JsonObject = { x: 1, y: 2 };
            jsonDelta.commit(data);
            const result = jsonDelta.commit(data);
            expect(result.changes).toEqual([]);
            expect(result.lineRanges).toEqual([]);
            expect(result.lines).toEqual([]);
            expect(result.scrollTarget).toBe(null);
        });

        it("applies policy: more than 3 changes yields no highlights", () => {
            jsonDelta.commit({} as JsonObject);
            getSourceLocator().getSourceMap.mockReturnValue({
                a: { start: 1, end: 1 },
                b: { start: 2, end: 2 },
                c: { start: 3, end: 3 },
                d: { start: 4, end: 4 },
            });
            const result = jsonDelta.commit({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
            } as JsonObject);
            expect(result.changes).toEqual([]);
            expect(result.lineRanges).toEqual([]);
            expect(result.lines).toEqual([]);
            expect(result.scrollTarget).toBe(null);
        });

        it("updates previous state for next commit", () => {
            jsonDelta.commit({ v: 1 } as JsonObject);
            getSourceLocator().getSourceMap.mockReturnValue({ v: { start: 1, end: 1 } });

            const first = jsonDelta.commit({ v: 2 } as JsonObject);
            expect(first.changes).toHaveLength(1);

            getSourceLocator().getSourceMap.mockReturnValue({ v: { start: 1, end: 1 } });

            const second = jsonDelta.commit({ v: 2 } as JsonObject);
            expect(second.changes).toHaveLength(0);

            const third = jsonDelta.commit( { x: 1, y: 2 } as JsonObject);
            expect(third.changes).toEqual( [
                {
                    "type": "added",
                    "path": "x",
                    "newValue": 1
                },
                {
                    "type": "added",
                    "path": "y",
                    "newValue": 2
                },
                {
                    "type": "removed",
                    "path": "v",
                    "oldValue": 2
                }
            ] );
        });
    });

    describe("reset", () => {
        it("clears previous state so next commit has no changes", () => {
            jsonDelta.commit({ a: 1 } as JsonObject);
            jsonDelta.reset();
            const result = jsonDelta.commit({ a: 2 } as JsonObject);
            expect(result.changes).toEqual([]);
        });

        it("allows detecting changes again after reset and two commits", () => {
            jsonDelta.reset();
            jsonDelta.commit({ x: 1 } as JsonObject);
            getSourceLocator().getSourceMap.mockReturnValue({ x: { start: 1, end: 1 } });
            const result = jsonDelta.commit({ x: 2 } as JsonObject);
            expect(result.changes).toHaveLength(1);
        });
    });
});
