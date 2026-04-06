import React, { useEffect } from "react";

import TestRenderer from "react-test-renderer";

import { PathProvider, usePath } from "../path-context";

describe( "path-context", () => {
    describe( "PathProvider", () => {
        it( "should provide initial empty path for single key when no path set", () => {
            let pathValue = "";
            const Consumer = () => {
                const { path } = usePath();
                pathValue = path;

                return null;
            };

            TestRenderer.create(
                <PathProvider variantId="variantId">
                    <Consumer />
                </PathProvider>
            );

            expect( pathValue ).toBe("");
        } );

        it( "should provide path that updates when setPath is called", () => {
            const results: string[] = [];

            const Consumer = () => {
                const { path, setPath } = usePath();

                results.push( path );

                useEffect( () => {
                    if ( results.length === 1 ) {
                        setPath( "my-path" );
                    }
                }, [ setPath ] );

                return null;
            };

            TestRenderer.act( () => {
                TestRenderer.create(
                    <PathProvider variantId="variantId">
                        <Consumer />
                    </PathProvider>
                );
            } );

            expect( results[0] ).toBe("");
            expect( results[1] ).toBe("my-path");
        } );

        it( "should support nested keys and set path at that key", () => {
            const results: string[] = [];

            const Consumer = () => {
                const { path, setPath } = usePath();
                results.push( path );

                useEffect( () => {
                    if ( results.length === 1 ) {
                        setPath( "nested-value" );
                    }
                }, [ setPath ] );

                return null;
            };

            TestRenderer.act( () => {
                TestRenderer.create(
                    <PathProvider variantId="level2">
                        <Consumer />
                    </PathProvider>
                );
            } );

            expect( results[0] ).toBe("");
            expect( results[1] ).toBe("nested-value");
        } );
    } );

    describe( "usePath", () => {
        it( "should throw when used outside PathProvider", () => {
            const Consumer = () => {
                usePath();
                return null;
            };

            const spy = jest.spyOn( console, "error" ).mockImplementation( () => {} );

            expect( () => {
                TestRenderer.create( <Consumer /> );
            } ).toThrow( "usePath must be used within a PathProvider" );

            spy.mockRestore();
        } );

        it( "should return path and setPath when used inside PathProvider", () => {
            let contextValue: ReturnType<typeof usePath> | null = null;

            const Consumer = () => {
                contextValue = usePath();
                return null;
            };

            TestRenderer.create(
                <PathProvider  variantId="variantId">
                    <Consumer />
                </PathProvider>
            );

            expect( contextValue ).not.toBeNull();
            expect( contextValue ).toHaveProperty("path", "");
            expect( typeof contextValue!.setPath ).toBe("function");
        } );
    } );
} );
