import { createSourceLocator } from '../source-locator-factory';

describe('createSourceLocator', () => {
    describe('factory', () => {
        it('should create a source locator instance', () => {
            const locator = createSourceLocator();

            expect(locator).toBeDefined();
            expect(locator.indexSource).toBeInstanceOf(Function);
            expect(locator.locatePathAtLine).toBeInstanceOf(Function);
            expect(locator.getSourceMap).toBeInstanceOf(Function);
        });

        it('should create independent instances', () => {
            const locator1 = createSourceLocator();
            const locator2 = createSourceLocator();

            locator1.indexSource({ foo: 'bar' });

            expect(Object.keys(locator1.getSourceMap()).length).toBeGreaterThan(0);
            expect(Object.keys(locator2.getSourceMap()).length).toBe(0);
        });
    });

    describe('indexSource', () => {
        it('should index a simple flat object', () => {
            const locator = createSourceLocator();
            const json = {
                name: 'John',
                age: 30,
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            expect(sourceMap).toHaveProperty('name');
            expect(sourceMap).toHaveProperty('age');
        });

        it('should index nested objects', () => {
            const locator = createSourceLocator();
            const json = {
                user: {
                    name: 'John',
                    profile: {
                        email: 'john@example.com',
                    },
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // Use bracket notation since keys contain dots
            expect('user' in sourceMap).toBe(true);
            expect('user.name' in sourceMap).toBe(true);
            expect('user.profile' in sourceMap).toBe(true);
            expect('user.profile.email' in sourceMap).toBe(true);
        });

        it('should index arrays with objects', () => {
            const locator = createSourceLocator();
            const json = {
                users: [
                    { id: 1, name: 'John' },
                    { id: 2, name: 'Jane' },
                ],
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            expect('users' in sourceMap).toBe(true);
            expect('users.0' in sourceMap).toBe(true);
            expect('users.0.id' in sourceMap).toBe(true);
            expect('users.0.name' in sourceMap).toBe(true);
            expect('users.1' in sourceMap).toBe(true);
            expect('users.1.id' in sourceMap).toBe(true);
            expect('users.1.name' in sourceMap).toBe(true);
        });

        it('should index arrays with primitives', () => {
            const locator = createSourceLocator();
            const json = {
                numbers: [1, 2, 3],
                strings: ['a', 'b', 'c'],
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            expect('numbers' in sourceMap).toBe(true);
            expect('numbers.0' in sourceMap).toBe(true);
            expect('numbers.1' in sourceMap).toBe(true);
            expect('numbers.2' in sourceMap).toBe(true);
            expect('strings' in sourceMap).toBe(true);
            expect('strings.0' in sourceMap).toBe(true);
            expect('strings.1' in sourceMap).toBe(true);
            expect('strings.2' in sourceMap).toBe(true);
        });

        it('should track correct line ranges for nested objects', () => {
            const locator = createSourceLocator();
            const json = {
                outer: {
                    inner: {
                        value: 'test',
                    },
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // Outer should span more lines than inner
            expect(sourceMap['outer'].end - sourceMap['outer'].start)
                .toBeGreaterThan(sourceMap['outer.inner'].end - sourceMap['outer.inner'].start);
        });

        it('should reset source map on each indexSource call', () => {
            const locator = createSourceLocator();

            locator.indexSource({ first: 'value' });
            expect(locator.getSourceMap()).toHaveProperty('first');

            locator.indexSource({ second: 'value' });
            expect(locator.getSourceMap()).not.toHaveProperty('first');
            expect(locator.getSourceMap()).toHaveProperty('second');
        });

        it('should handle empty objects', () => {
            const locator = createSourceLocator();

            locator.indexSource({});

            expect(locator.getSourceMap()).toEqual({});
        });

        it('should handle deeply nested structures', () => {
            const locator = createSourceLocator();
            const json = {
                level1: {
                    level2: {
                        level3: {
                            level4: {
                                value: 'deep',
                            },
                        },
                    },
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            expect('level1' in sourceMap).toBe(true);
            expect('level1.level2' in sourceMap).toBe(true);
            expect('level1.level2.level3' in sourceMap).toBe(true);
            expect('level1.level2.level3.level4' in sourceMap).toBe(true);
            expect('level1.level2.level3.level4.value' in sourceMap).toBe(true);
        });
    });

    describe('locatePathAtLine', () => {
        it('should return undefined for line outside of any path', () => {
            const locator = createSourceLocator();
            const json = { name: 'John' };

            locator.indexSource(json);

            // Line 0 or very large line numbers should not match
            expect(locator.locatePathAtLine(0)).toBeUndefined();
            expect(locator.locatePathAtLine(1000)).toBeUndefined();
        });

        it('should locate path at specific line for simple object', () => {
            const locator = createSourceLocator();
            const json = {
                name: 'John',
                age: 30,
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // Find the line where 'name' is defined
            const nameLine = sourceMap['name'].start;
            expect(locator.locatePathAtLine(nameLine)).toBe('name');

            const ageLine = sourceMap['age'].start;
            expect(locator.locatePathAtLine(ageLine)).toBe('age');
        });

        it('should return most specific path for nested structures', () => {
            const locator = createSourceLocator();
            const json = {
                user: {
                    profile: {
                        email: 'test@example.com',
                    },
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // Line with email should return the most specific path
            const emailLine = sourceMap['user.profile.email'].start;
            expect(locator.locatePathAtLine(emailLine)).toBe('user.profile.email');
        });

        it('should return parent path for lines within object braces', () => {
            const locator = createSourceLocator();
            const json = {
                user: {
                    name: 'John',
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // The closing brace of user should still return 'user'
            const userEnd = sourceMap['user'].end;
            expect(locator.locatePathAtLine(userEnd)).toBe('user');
        });

        it('should handle array item paths', () => {
            const locator = createSourceLocator();
            const json = {
                items: [
                    { id: 1 },
                    { id: 2 },
                ],
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            const item0Line = sourceMap['items.0'].start;
            expect(locator.locatePathAtLine(item0Line)).toBe('items.0');

            const item1Line = sourceMap['items.1'].start;
            expect(locator.locatePathAtLine(item1Line)).toBe('items.1');
        });

        it('should normalize paths ending with .value', () => {
            const locator = createSourceLocator();
            const json = {
                setting: {
                    value: 'test',
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // When clicking on a .value line, it should return the parent path
            const valueLine = sourceMap['setting.value'].start;
            expect(locator.locatePathAtLine(valueLine)).toBe('setting');
        });

        it('should normalize paths ending with .$$type', () => {
            const locator = createSourceLocator();
            const json = {
                widget: {
                    $$type: 'button',
                    label: 'Click me',
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            // When clicking on a $$type line, it should return the parent path
            const typeLine = sourceMap['widget.$$type'].start;
            expect(locator.locatePathAtLine(typeLine)).toBe('widget');
        });

        it('should handle deeply nested .value paths', () => {
            const locator = createSourceLocator();
            const json = {
                settings: {
                    theme: {
                        color: {
                            value: '#000000',
                        },
                    },
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            const valueLine = sourceMap['settings.theme.color.value'].start;
            expect(locator.locatePathAtLine(valueLine)).toBe('settings.theme.color');
        });
    });

    describe('getSourceMap', () => {
        it('should return empty object before indexing', () => {
            const locator = createSourceLocator();

            expect(locator.getSourceMap()).toEqual({});
        });

        it('should return the current source map', () => {
            const locator = createSourceLocator();
            const json = { key: 'value' };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            expect(sourceMap).toHaveProperty('key');
            expect(sourceMap['key']).toHaveProperty('start');
            expect(sourceMap['key']).toHaveProperty('end');
        });

        it('should return source ranges with start and end', () => {
            const locator = createSourceLocator();
            const json = {
                wrapper: {
                    content: 'text',
                },
            };

            locator.indexSource(json);

            const sourceMap = locator.getSourceMap();

            expect(typeof sourceMap['wrapper'].start).toBe('number');
            expect(typeof sourceMap['wrapper'].end).toBe('number');
            expect(sourceMap['wrapper'].start).toBeLessThanOrEqual(sourceMap['wrapper'].end);
        });
    });
});
