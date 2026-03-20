import { createLocatorState } from '../locator-state';
import { parseSourceLine } from '../source-parser';
import { SourceMap } from '../types';

describe('parseSourceLine', () => {
    describe('object key parsing', () => {
        it('should parse a simple key-value pair', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            const result = parseSourceLine('  "name": "John",', state);

            expect(result).not.toBeNull();
            result?.apply(map, 1);

            expect(map).toHaveProperty('name');
            expect(map['name']).toEqual({ start: 1, end: 1 });
        });

        it('should parse key with object value', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            const result = parseSourceLine('  "user": {', state);

            expect(result).not.toBeNull();
            result?.apply(map, 1);

            expect(map).toHaveProperty('user');
            expect(state.openStack).toHaveLength(1);
            expect(state.openStack[0].isArray).toBe(false);
        });

        it('should parse key with array value', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            const result = parseSourceLine('  "items": [', state);

            expect(result).not.toBeNull();
            result?.apply(map, 1);

            expect(map).toHaveProperty('items');
            expect(state.openStack).toHaveLength(1);
            expect(state.openStack[0].isArray).toBe(true);
            expect(state.arrayStack).toHaveLength(1);
        });

        it('should build nested paths', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "user": {', state)?.apply(map, 1);
            parseSourceLine('    "profile": {', state)?.apply(map, 2);
            parseSourceLine('      "email": "test@example.com"', state)?.apply(map, 3);

            expect('user' in map).toBe(true);
            expect('user.profile' in map).toBe(true);
            expect('user.profile.email' in map).toBe(true);
        });
    });

    describe('object close parsing', () => {
        it('should close object scope', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "user": {', state)?.apply(map, 1);
            parseSourceLine('  }', state)?.apply(map, 2);

            expect(map['user'].end).toBe(2);
        });

        it('should close object scope with trailing comma', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "user": {', state)?.apply(map, 1);
            parseSourceLine('  },', state)?.apply(map, 2);

            expect(map['user'].end).toBe(2);
        });
    });

    describe('array close parsing', () => {
        it('should close array scope', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "items": [', state)?.apply(map, 1);
            parseSourceLine('  ]', state)?.apply(map, 2);

            expect(map['items'].end).toBe(2);
        });

        it('should close array scope with trailing comma', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "items": [', state)?.apply(map, 1);
            parseSourceLine('  ],', state)?.apply(map, 2);

            expect(map['items'].end).toBe(2);
        });
    });

    describe('array item parsing', () => {
        it('should parse object inside array', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "items": [', state)?.apply(map, 1);
            parseSourceLine('    {', state)?.apply(map, 2);

            expect('items.0' in map).toBe(true);
            expect(map['items.0']).toEqual({ start: 2, end: 2 });
        });

        it('should parse multiple objects in array', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "items": [', state)?.apply(map, 1);
            parseSourceLine('    {', state)?.apply(map, 2);
            parseSourceLine('      "id": 1', state)?.apply(map, 3);
            parseSourceLine('    },', state)?.apply(map, 4);
            parseSourceLine('    {', state)?.apply(map, 5);

            expect('items.0' in map).toBe(true);
            expect('items.1' in map).toBe(true);
            expect(map['items.1'].start).toBe(5);
        });

        it('should parse primitives in array', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "numbers": [', state)?.apply(map, 1);
            parseSourceLine('    1,', state)?.apply(map, 2);
            parseSourceLine('    2,', state)?.apply(map, 3);
            parseSourceLine('    3', state)?.apply(map, 4);

            expect('numbers.0' in map).toBe(true);
            expect('numbers.1' in map).toBe(true);
            expect('numbers.2' in map).toBe(true);
        });

        it('should parse string primitives in array', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "strings": [', state)?.apply(map, 1);
            parseSourceLine('    "a",', state)?.apply(map, 2);
            parseSourceLine('    "b"', state)?.apply(map, 3);

            expect('strings.0' in map).toBe(true);
            expect('strings.1' in map).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('should return null for empty line', () => {
            const state = createLocatorState();

            const result = parseSourceLine('', state);

            expect(result).toBeNull();
        });

        it('should return null for whitespace only line', () => {
            const state = createLocatorState();

            const result = parseSourceLine('    ', state);

            expect(result).toBeNull();
        });

        it('should return null for opening brace outside array', () => {
            const state = createLocatorState();

            const result = parseSourceLine('{', state);

            expect(result).toBeNull();
        });

        it('should handle keys with special characters', () => {
            const state = createLocatorState();
            const map: SourceMap = {};

            parseSourceLine('  "key-with-dashes": "value",', state)?.apply(map, 1);
            parseSourceLine('  "key_with_underscores": "value",', state)?.apply(map, 2);
            parseSourceLine('  "key.with.dots": "value"', state)?.apply(map, 3);

            expect('key-with-dashes' in map).toBe(true);
            expect('key_with_underscores' in map).toBe(true);
            expect('key.with.dots' in map).toBe(true);
        });
    });
});
