import { createContext, type PropsWithChildren, useContext, useState } from "react";

import { store } from '@debug-panel/storage';
import { useVariantId } from '@debug-panel/variants';

type NestedPaths = {
    [key: string]: string;
};

type ContextValue = {
    path: string;
    setPath: ( newPath: string ) => void;
};

const PathContext = createContext<ContextValue | null >( null );

export const PathProvider = ( { children }: PropsWithChildren ) => {
    const id = useVariantId();
    const [ paths, setPaths ] = useState<NestedPaths>( () => {
        const storedPath = store.getPath()

        if ( storedPath ) {
            return { [ id ]: storedPath }
        }

        return {};
    } );

    const setPath = ( newPath: string ) => {
        setPaths( prev => ( { ...prev, [ id ]: newPath } ) );

        store.setPath( newPath )
    };

    return (
        <PathContext.Provider
            value={ {
                path: paths[ id ],
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
        throw new Error( "usePath must be used within a PathProvider" );
    }

    return context;
};
