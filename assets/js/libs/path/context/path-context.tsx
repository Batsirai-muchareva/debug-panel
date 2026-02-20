import React, { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "@wordpress/element";

import { useTabs } from "@app/context/tabs/tabs-context";

type State = {
    path: string;
    isSearching: boolean;
    setPath: ( newPath: string ) => void;
};

const PathContext = createContext<State | undefined >( undefined );

export const PathProvider = ( { children }: PropsWithChildren ) => {
    const [ paths, setPaths ] = useState<Record<string, Record<string, string>>>({});
    const { activeProvider, activeVariant } = useTabs();
    const [ isSearching, setIsSearching ] = useState<boolean>( false );

    const setPath = ( newPath: string ) => {
        setIsSearching( true );

        setPaths( prev  => ( {
            ...prev,
            [ activeProvider ]: {
                ...prev[ activeProvider ],
                [ activeVariant ]: newPath
            }
        } ) );

        setTimeout( () => {
            setIsSearching( false );
        }, 2000 )
    };

    return (
        <PathContext.Provider
            value={ {
                path: paths[ activeProvider ]?.[activeVariant] ?? "",
                setPath,
                isSearching
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
