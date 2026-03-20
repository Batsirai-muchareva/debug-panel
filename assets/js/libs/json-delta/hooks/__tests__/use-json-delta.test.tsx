import React from "react";
import TestRenderer from "react-test-renderer";

import type { Data } from "@libs/types";

import { useJsonDelta } from "../use-json-delta";

const mockCommit = jest.fn();
const mockReset = jest.fn();

jest.mock("../../state/json-delta", () => ({
    jsonDelta: {
        commit: (...args: unknown[]) => mockCommit(...args),
        reset: (...args: unknown[]) => mockReset(...args),
    },
}));

const defaultCommitReturn = {
    changes: [] as const,
    lineRanges: [] as const,
    lines: [2, 3] as number[],
    scrollTarget: 2 as number | null,
};

describe("useJsonDelta", () => {
    beforeEach(() => {
        mockCommit.mockReset();
        mockReset.mockReset();
        mockCommit.mockReturnValue(defaultCommitReturn);
    });

    it("returns EMPTY when data is null", () => {
        let result: ReturnType<typeof useJsonDelta> | null = null;
        const Consumer = () => {
            result = useJsonDelta(null);
            return null;
        };
        TestRenderer.create(<Consumer />);
        expect(result).toEqual({
            highlightLines: [],
            scrollToLine: null,
            lines: [],
            scrollTarget: null,
        });
        expect(mockCommit).not.toHaveBeenCalled();
    });

    it("returns EMPTY when data is undefined", () => {
        let result: ReturnType<typeof useJsonDelta> | null = null;
        const Consumer = () => {
            result = useJsonDelta(undefined as unknown as Data);
            return null;
        };
        TestRenderer.create(<Consumer />);
        expect(result).toEqual({
            highlightLines: [],
            scrollToLine: null,
            lines: [],
            scrollTarget: null,
        });
    });

    it("calls jsonDelta.commit when data is provided and returns result", () => {
        mockCommit.mockReturnValue({
            changes: [],
            lineRanges: [],
            lines: [2, 3],
            scrollTarget: 2,
        });
        let result: ReturnType<typeof useJsonDelta> | null = null;
        const data = { a: 1, __brand: "Data" } as Data;
        const Consumer = () => {
            result = useJsonDelta(data);
            return null;
        };
        TestRenderer.act(() => {
            TestRenderer.create(<Consumer />);
        });
        expect(mockCommit).toHaveBeenCalledWith({ a: 1, __brand: "Data" });
        expect(result).toEqual({
            highlightLines: [2, 3],
            scrollToLine: 2,
            lines: [2, 3],
            scrollTarget: 2,
        });
    });

    it("updates when data changes", () => {
        mockCommit
            .mockReturnValueOnce({ lines: [1], scrollTarget: 1, changes: [], lineRanges: [] })
            .mockReturnValueOnce({ lines: [5, 6], scrollTarget: 5, changes: [], lineRanges: [] });
        const results: ReturnType<typeof useJsonDelta>[] = [];
        const Consumer = ({ data }: { data: Data }) => {
            const result = useJsonDelta(data);
            results.push(result);
            return null;
        };
        let renderer: TestRenderer.ReactTestRenderer;
        TestRenderer.act(() => {
            renderer = TestRenderer.create(
                <Consumer data={{ v: 1, __brand: "Data" } as Data} />
            );
        });
        expect(results[results.length - 1]).toMatchObject({
            highlightLines: [1],
            scrollToLine: 1,
            lines: [1],
            scrollTarget: 1,
        });
        TestRenderer.act(() => {
            renderer!.update(
                <Consumer data={{ v: 2, __brand: "Data" } as Data} />
            );
        });
        expect(results[results.length - 1]).toMatchObject({
            highlightLines: [5, 6],
            scrollToLine: 5,
            lines: [5, 6],
            scrollTarget: 5,
        });
        expect(mockCommit).toHaveBeenCalledTimes(2);
    });

    it("resets to EMPTY when data changes from object to null", () => {
        mockCommit.mockReturnValue({
            lines: [1],
            scrollTarget: 1,
            changes: [],
            lineRanges: [],
        });
        const results: ReturnType<typeof useJsonDelta>[] = [];
        const Consumer = ({ data }: { data: Data }) => {
            const result = useJsonDelta(data);
            results.push(result);
            return null;
        };
        let renderer: TestRenderer.ReactTestRenderer;
        TestRenderer.act(() => {
            renderer = TestRenderer.create(
                <Consumer data={{ x: 1, __brand: "Data" } as Data} />
            );
        });
        expect(results[results.length - 1].scrollToLine).toBe(1);
        TestRenderer.act(() => {
            renderer!.update(<Consumer data={null} />);
        });
        expect(results[results.length - 1]).toEqual({
            highlightLines: [],
            scrollToLine: null,
            lines: [],
            scrollTarget: null,
        });
    });
});
