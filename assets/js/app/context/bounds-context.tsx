import * as React from "react";
import { PropsWithChildren, Dispatch, SetStateAction, useState } from "react";
import { createContext, useContext } from "@wordpress/element";

const INITIAL_HEIGHT = 550;
const INITIAL_WIDTH = 400;

type Position = {
    x: number;
    y: number
};

type Size = {
    height: number;
    width: number;
}

type SetState<T> = Dispatch< SetStateAction< T > >;

type BoundsContextValue = {
    position: Position;
    setPosition: SetState<Position>;
    size: Size;
    setSize: SetState<Size>;
};

const BoundsContext = createContext< BoundsContextValue | undefined >( undefined );

const sizes = {
    header: 37,
    tabs: 32,
    variants: 26,
    toolbar: 79,
    padding: 16
};

export const subtract = Object.values(sizes).reduce((sum, value) => sum + value, 0);

export const BoundsProvider = ( { children }: PropsWithChildren ) => {
    const [ position, setPosition ] = useState<Position>( { x: 0, y: 0 } );
    const [ size, setSize ] = useState<Size>( { width: INITIAL_WIDTH, height: INITIAL_HEIGHT } );

    return (
        <BoundsContext.Provider value={ { position, setPosition, size, setSize } }>
            { children }
        </BoundsContext.Provider>
    );
};

export const useBounds = () => {
    const context = useContext( BoundsContext );

    if ( ! context ) {
        throw new Error("useBounds must be used within a BoundsProvider");
    }

    return context;
};
