import {
    closeScope,
    createLocatorState,
    enterArrayItem,
    enterObjectKey,
    exitArrayItem,
    isInArrayScope,
    isPrimitive,
    openScope,
} from '../locator-state';

describe('locator-state', () => {
    describe('createLocatorState', () => {
        it('should create initial state with empty stacks', () => {
            const state = createLocatorState();

            expect(state.pathStack).toEqual([]);
            expect(state.arrayStack).toEqual([]);
            expect(state.openStack).toEqual([]);
        });
    });

    describe('enterObjectKey', () => {
        it('should add key to path stack', () => {
            const state = createLocatorState();

            const path = enterObjectKey( state, 'user', 1 );

            expect(path).toBe( 'user' );
            expect( state.pathStack ).toEqual(['user']);
        });

        it('should build nested paths', () => {
            const state = createLocatorState();

            enterObjectKey(state, 'user', 1);
            const path = enterObjectKey(state, 'profile', 2);

            expect(path).toBe('user.profile');
        });

        it('should truncate path stack based on depth', () => {
            const state = createLocatorState();

            enterObjectKey(state, 'first', 1);
            enterObjectKey(state, 'second', 2);
            enterObjectKey(state, 'third', 3);

            // Going back to depth 2 should truncate to depth 1
            const path = enterObjectKey(state, 'sibling', 2);

            expect(path).toBe('first.sibling');
        });

        it('should handle root level keys (depth 1)', () => {
            const state = createLocatorState();

            const path1 = enterObjectKey(state, 'key1', 1);
            const path2 = enterObjectKey(state, 'key2', 1);

            expect(path1).toBe('key1');
            expect(path2).toBe('key2');
        });
    });

    describe('enterArrayItem', () => {
        it('should increment array index and build path', () => {
            const state = createLocatorState();

            enterObjectKey(state, 'items', 1);
            openScope(state, 'items', 2, true);

            const path0 = enterArrayItem(state, 2);
            expect(path0).toBe('items.0');

            exitArrayItem(state);
            const path1 = enterArrayItem(state, 2);
            expect(path1).toBe('items.1');
        });

        it('should handle nested arrays', () => {
            const state = createLocatorState();

            enterObjectKey(state, 'matrix', 1);
            openScope(state, 'matrix', 2, true);

            const outerPath = enterArrayItem(state, 2);
            expect(outerPath).toBe('matrix.0');

            openScope(state, 'matrix.0', 4, true);

            const innerPath = enterArrayItem(state, 3);
            expect(innerPath).toBe('matrix.0.0');
        });
    });

    describe('exitArrayItem', () => {
        it('should pop numeric index from path stack', () => {
            const state = createLocatorState();

            enterObjectKey(state, 'items', 1);
            openScope(state, 'items', 2, true);
            enterArrayItem(state, 2);

            expect(state.pathStack[state.pathStack.length - 1]).toBe(0);

            exitArrayItem(state);

            expect(typeof state.pathStack[state.pathStack.length - 1]).not.toBe('number');
        });

        it('should not pop if last item is not a number', () => {
            const state = createLocatorState();

            enterObjectKey(state, 'items', 1);

            const lengthBefore = state.pathStack.length;
            exitArrayItem(state);

            expect(state.pathStack.length).toBe(lengthBefore);
        });
    });

    describe('openScope', () => {
        it('should add entry to open stack for objects', () => {
            const state = createLocatorState();

            openScope(state, 'user', 2, false);

            expect(state.openStack).toHaveLength(1);
            expect(state.openStack[0]).toEqual({
                path: 'user',
                indent: 2,
                isArray: false,
            });
        });

        it('should add entry to open stack and array stack for arrays', () => {
            const state = createLocatorState();

            openScope(state, 'items', 2, true);

            expect(state.openStack).toHaveLength(1);
            expect(state.openStack[0].isArray).toBe(true);
            expect(state.arrayStack).toEqual([-1]);
        });

        it('should handle multiple nested scopes', () => {
            const state = createLocatorState();

            openScope(state, 'level1', 2, false);
            openScope(state, 'level2', 4, false);
            openScope(state, 'level3', 6, true);

            expect(state.openStack).toHaveLength(3);
            expect(state.arrayStack).toHaveLength(1);
        });
    });

    describe('closeScope', () => {
        it('should remove and return the matching scope', () => {
            const state = createLocatorState();

            openScope(state, 'user', 2, false);

            const closedPath = closeScope(state, 2);

            expect(closedPath).toBe('user');
            expect(state.openStack).toHaveLength(0);
        });

        it('should pop from array stack when closing an array scope', () => {
            const state = createLocatorState();

            openScope(state, 'items', 2, true);
            expect(state.arrayStack).toHaveLength(1);

            closeScope(state, 2);

            expect(state.arrayStack).toHaveLength(0);
        });

        it('should return null if no matching indent found', () => {
            const state = createLocatorState();

            openScope(state, 'user', 2, false);

            const result = closeScope(state, 10);

            expect(result).toBeNull();
        });

        it('should close correct scope when multiple scopes exist', () => {
            const state = createLocatorState();

            openScope(state, 'outer', 2, false);
            openScope(state, 'inner', 4, false);

            const innerClosed = closeScope(state, 4);
            expect(innerClosed).toBe('inner');
            expect(state.openStack).toHaveLength(1);

            const outerClosed = closeScope(state, 2);
            expect(outerClosed).toBe('outer');
            expect(state.openStack).toHaveLength(0);
        });
    });

    describe('isInArrayScope', () => {
        it('should return false when not in array scope', () => {
            const state = createLocatorState();

            expect(isInArrayScope(state)).toBe(false);
        });

        it('should return true when in array scope', () => {
            const state = createLocatorState();

            openScope(state, 'items', 2, true);

            expect(isInArrayScope(state)).toBe(true);
        });

        it('should return false after closing array scope', () => {
            const state = createLocatorState();

            openScope(state, 'items', 2, true);
            closeScope(state, 2);

            expect(isInArrayScope(state)).toBe(false);
        });
    });

    describe('isPrimitive', () => {
        it('should return true for string values', () => {
            expect(isPrimitive('"hello"')).toBe(true);
            expect(isPrimitive('"hello",')).toBe(true);
        });

        it('should return true for number values', () => {
            expect(isPrimitive('42')).toBe(true);
            expect(isPrimitive('42,')).toBe(true);
            expect(isPrimitive('3.14')).toBe(true);
        });

        it('should return true for boolean values', () => {
            expect(isPrimitive('true')).toBe(true);
            expect(isPrimitive('false')).toBe(true);
            expect(isPrimitive('true,')).toBe(true);
        });

        it('should return true for null', () => {
            expect(isPrimitive('null')).toBe(true);
            expect(isPrimitive('null,')).toBe(true);
        });

        it('should return false for object start', () => {
            expect(isPrimitive('{')).toBe(false);
            expect(isPrimitive('{}')).toBe(false);
        });

        it('should return false for object end', () => {
            expect(isPrimitive('}')).toBe(false);
            expect(isPrimitive('},')).toBe(false);
        });

        it('should return false for array end', () => {
            expect(isPrimitive(']')).toBe(false);
            expect(isPrimitive('],')).toBe(false);
        });
    });
});
