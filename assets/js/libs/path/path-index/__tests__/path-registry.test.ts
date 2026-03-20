/**
 * Note: The path-registry module uses a module-level array (pathIndexes)
 * which makes testing stateful. Each test should be aware that the state
 * persists between calls to build().
 *
 * A proper implementation would either:
 * 1. Return the built indexes from build()
 * 2. Provide a clear() function
 * 3. Use a factory pattern
 */

import { pathIndex } from '../../';

describe('path-registry (build function)', () => {
    beforeEach( ()=>{
        pathIndex.reset();
    } );

    describe('integration with traverseData', () => {
        it('should build paths from data', () => {
            pathIndex.build( {
                user: {
                    name: 'John',
                    profile: {
                        age: 30,
                    },
                },
                __brand: "RawData"
            } )

            expect( pathIndex.get() ).toEqual( [
                'user',
                'user.profile',
            ] );
        });

        it('should build paths complex nested structures', () => {
            pathIndex.build( {
                settings: {
                    theme: {
                        colors: {
                            primary: '#000',
                        },
                    },
                },
                items: [
                    {
                        id: 1,
                        metadata: {
                            created: '2024-01-01',
                        },
                    },
                ],
                __brand: "RawData"
            } );


            expect( pathIndex.get() ).toEqual( [
                'settings',
                'items',
                'items[0]',
                'items[0].metadata',
                'settings.theme',
                'settings.theme.colors',
            ] );
        } );

        it('should handle empty data', () => {
            pathIndex.build( {
                __brand: "RawData"
            } );

            expect( pathIndex.get() ).toEqual([]);
        });

        it('should handle null data', () => {
            pathIndex.build( null );

            expect( pathIndex.get() ).toEqual([]);
        });
    });

    describe('includePrimitivesPath flag', () => {
        it('should include primitive paths when flag is true', () => {
            pathIndex.build( {
                name: 'John',
                age: 30,
                profile: {
                    email: 'john@example.com',
                },
                __brand: "RawData"
            }, true );

            expect( pathIndex.get() ).toEqual( [
                'profile',
                'name',
                'age',
                "__brand",
                'profile.email',
            ] );
        });

        it('should include all paths with complex nested data', () => {
            pathIndex.build( {
                settings: {
                    theme: 'dark',
                    colors: {
                        primary: '#000',
                    },
                },
                users: [
                    {
                        id: 1,
                        name: 'John',
                    },
                    {
                        id: 2,
                        name: 'Doe',
                    },
                ],
                __brand: "RawData"
            }, true );

            const paths = pathIndex.get();

            expect( paths ).toEqual( [
                'settings',
                'users',
                "__brand",
                'users.0',
                "users.1",
                "users.1.id",
                "users.1.name",
                'users.0.id',
                'users.0.name',
                'settings.colors',
                'settings.theme',
                'settings.colors.primary',
            ] );
        });
    });
});
