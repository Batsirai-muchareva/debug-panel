import { isObject } from "../is-object";

describe("isObject", () => {
    it("returns true for plain objects", () => {
        expect( isObject({}) ).toBe( true );
        expect( isObject({ a: 1 }) ).toBe( true );
        expect( isObject({ nested: { b: 2 } }) ).toBe( true );
    });

    it("returns false for null", () => {
        expect( isObject(null) ).toBe(false);
    });

    it("returns false for arrays", () => {
        expect(isObject([])).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
        expect(isObject([{ a: 1 }])).toBe(false);
    });

    it("returns false for primitives", () => {
        expect(isObject(undefined)).toBe(false);
        expect(isObject(0)).toBe(false);
        expect(isObject("")).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(Symbol("x"))).toBe(false);
    });

    it("returns false for functions", () => {
        expect(isObject(() => {})).toBe(false);
        expect(isObject(function () {})).toBe(false);
    });

    it("returns true for Object.create(null)", () => {
        expect(isObject(Object.create(null))).toBe(true);
    });
});
