import React, { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "@wordpress/element";

import { store } from "@libs/storage";

type NestedPaths = {
    [key: string]: string;
};

type State = {
    path: string;
    setPath: ( newPath: string ) => void;
};

const PathContext = createContext<State | undefined >( undefined );

// TODO key here is confusing lets choose a diff name I could not understand what is key when I came back later it took me time to understand
// We also need to indicate that path will set path of nested selectors
export const PathProvider = ( { children, variantId }: PropsWithChildren< { variantId: string; } > ) => {
    const [ paths, setPaths ] = useState<NestedPaths>( () => {
        // how times triggered
        const storedPath = store.getPath()

        if ( storedPath ) {
            return { [ variantId ]: storedPath }
        }

        return {};
    } );

    const setPath = ( newPath: string ) => {
        setPaths( prev => ( { ...prev, [ variantId ]: newPath } ) );

        store.setPath( newPath )
    };

    return (
        <PathContext.Provider
            value={ {
                path: paths[ variantId ],
                setPath,
            } }
        >
            { children }
        </PathContext.Provider>
    );
};

export const usePath = () => {

    const context = useContext( PathContext );

    if ( ! context ) {
        throw new Error("usePath must be used within a PathProvider");
    }

    return context;
};
