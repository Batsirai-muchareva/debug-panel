import type { JsonObject } from "../../types";
import { jsonDiffs } from "../json-diffs";

describe("jsonDiffs", () => {
    it("returns empty array when prev is null", () => {
        const next: JsonObject = { a: 1 };
        expect(jsonDiffs(next, null)).toEqual([]);
    });

    it("returns empty array when next is not an object", () => {
        const prev: JsonObject = { a: 1 };
        expect(jsonDiffs(null as unknown as JsonObject, prev)).toEqual([]);
        expect(jsonDiffs(undefined as unknown as JsonObject, prev)).toEqual([]);
        expect(jsonDiffs(1 as unknown as JsonObject, prev)).toEqual([]);
    });

    it("returns empty array when prev is not an object", () => {
        const next: JsonObject = { a: 1 };
        expect(jsonDiffs(next, undefined as unknown as JsonObject)).toEqual([]);
        expect(jsonDiffs(next, 1 as unknown as JsonObject)).toEqual([]);
    });

    it("detects added keys at root", () => {
        const prev: JsonObject = { a: 1 };
        const next: JsonObject = { a: 1, b: 2 };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "added",
            path: "b",
            newValue: 2,
        });
        expect(changes).toHaveLength(1);
    });

    it("detects multiple added keys", () => {
        const prev: JsonObject = {};
        const next: JsonObject = { x: 1, y: 2 };
        const changes = jsonDiffs(next, prev);
        expect(changes).toEqual(
            expect.arrayContaining([
                { type: "added", path: "x", newValue: 1 },
                { type: "added", path: "y", newValue: 2 },
            ])
        );
        expect(changes).toHaveLength(2);
    });

    it("detects modified values at root", () => {
        const prev: JsonObject = { a: 1, b: "old" };
        const next: JsonObject = { a: 1, b: "new" };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "modified",
            path: "b",
            oldValue: "old",
            newValue: "new",
        });
        expect(changes).toHaveLength(1);
    });

    it("detects removed keys at root", () => {
        const prev: JsonObject = { a: 1, b: 2 };
        const next: JsonObject = { a: 1 };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "removed",
            path: "b",
            oldValue: 2,
        });
        expect(changes).toHaveLength(1);
    });

    it("returns empty array when objects are equal", () => {
        const obj: JsonObject = { a: 1, b: { c: 2 } };
        expect(jsonDiffs(obj, obj)).toEqual([]);
        expect(jsonDiffs({ a: 1 }, { a: 1 })).toEqual([]);
    });

    it("recurses into nested objects for modifications", () => {
        const prev: JsonObject = { user: { name: "Alice", age: 30 } };
        const next: JsonObject = { user: { name: "Bob", age: 30 } };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "modified",
            path: "user.name",
            oldValue: "Alice",
            newValue: "Bob",
        });
        expect(changes).toHaveLength(1);
    });

    it("detects added keys in nested objects", () => {
        const prev: JsonObject = { user: { name: "Alice" } };
        const next: JsonObject = { user: { name: "Alice", email: "a@b.com" } };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "added",
            path: "user.email",
            newValue: "a@b.com",
        });
        expect(changes).toHaveLength(1);
    });

    it("detects removed keys in nested objects", () => {
        const prev: JsonObject = { user: { name: "Alice", email: "a@b.com" } };
        const next: JsonObject = { user: { name: "Alice" } };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "removed",
            path: "user.email",
            oldValue: "a@b.com",
        });
        expect(changes).toHaveLength(1);
    });

    it("uses custom base path when provided", () => {
        const prev: JsonObject = { foo: 1 };
        const next: JsonObject = { foo: 2 };
        const changes = jsonDiffs(next, prev, "prefix");
        expect(changes).toContainEqual({
            type: "modified",
            path: "prefix.foo",
            oldValue: 1,
            newValue: 2,
        });
    });

    it("treats array as non-object and reports as modified", () => {
        const prev: JsonObject = { items: { count: 1 } };
        const next: JsonObject = { items: [1, 2, 3] };
        const changes = jsonDiffs(next, prev);
        expect(changes).toContainEqual({
            type: "modified",
            path: "items",
            oldValue: { count: 1 },
            newValue: [1, 2, 3],
        });
    });
});
