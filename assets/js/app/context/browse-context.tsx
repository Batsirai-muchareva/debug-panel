import React, { PropsWithChildren } from "react";
import { createContext, useCallback,useContext, useState } from "@wordpress/element";

import { usePath } from "@libs/path";

import { useFilteredData } from "@app/context/filtered-data-context";
import { useTabs } from "@app/context/tabs/tabs-context";
import { useProvider } from "@app/hooks/use-provider";

type BrowseContextState = {
    selectedKey: string | null;
    setSelectedKey: ( key: string | null ) => void;
    isBrowsing: boolean;
    back: () => void;
    data: string[];
};

const BrowseContext = createContext< BrowseContextState | undefined >( undefined );

export const BrowseProvider = ( { children }: PropsWithChildren ) => {
    const { config } = useProvider();
    const { data } = useFilteredData();
    const { path, setPath } = usePath();
    const { activeProvider } = useTabs();

    const [ selections, setSelections ] = useState< Record< string, string | null > >( {} );

    const selectedKey = selections[ activeProvider ] ?? null;
    const isBrowsing = !! config?.supportsBrowsing && selectedKey === null;

    const setSelectedKey = useCallback( ( key: string | null ) => {
        setSelections( prev => ( {
            ...prev,
            [ activeProvider ]: key,
        } ) );

        setPath( '' );
    }, [ activeProvider ] );

    const back = useCallback( () => {
        setSelectedKey( null );
        setPath( '' );
    }, [ setSelectedKey ] );

    const getData = useCallback( () => {
        return Object.keys( data as Record<string, unknown> ?? {} )
            .filter( (key) =>  key.includes( path ) )
    }, [ data ] )

    return (
        <BrowseContext.Provider value={ {
            selectedKey,
            setSelectedKey,
            isBrowsing,
            back,
            data: getData()
        } }>
            { children }
        </BrowseContext.Provider>
    );
};

export const useBrowse = () => {
    const context = useContext( BrowseContext );

    if ( ! context ) {
        throw new Error( "useBrowse must be used within a BrowseProvider" );
    }

    return context;
};
