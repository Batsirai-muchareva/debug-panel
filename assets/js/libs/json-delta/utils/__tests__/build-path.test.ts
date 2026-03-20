import { buildPath } from "../build-path";

describe("buildPath", () => {
    it("returns key when basePath is empty string", () => {
        expect( buildPath("", "foo") ).toBe("foo");
    });

    it("joins basePath and key with a dot", () => {
        expect( buildPath("root", "child") ).toBe("root.child");
    });

    it("handles nested paths", () => {
        expect( buildPath("a.b.c", "d") ).toBe("a.b.c.d");
    });

    it("handles single-segment base", () => {
        expect( buildPath("user", "name") ).toBe("user.name");
    });

    it("handles key with special characters", () => {
        expect( buildPath("data", "key-with-dash") ).toBe("data.key-with-dash");
    });
});
