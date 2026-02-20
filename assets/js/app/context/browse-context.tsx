import React from "react";
import { useState, PropsWithChildren } from "react";
import { createContext, useContext, useCallback } from "@wordpress/element";
import { useTabs } from "@app/context/tabs/tabs-context";
import { usePath } from "@app/context/path-context";
import { sourceManager } from "@app/source-manager/source-manager";

type BrowseContextState = {
    selectedKey: string | null;
    setSelectedKey: ( key: string | null ) => void;
    isBrowsing: boolean;
    back: () => void;
};

const BrowseContext = createContext< BrowseContextState | undefined >( undefined );

export const BrowseProvider = ( { children }: PropsWithChildren ) => {
    const { activeProvider, activeVariant } = useTabs();
    const { setPath } = usePath();
    const [ selections, setSelections ] = useState< Record< string, string | null > >( {} );

    const selectedKey = selections[ activeVariant ] ?? null;
    const supportsBrowsing = sourceManager.find( activeProvider )?.supportsBrowsing ?? false;

    const isBrowsing = supportsBrowsing && selectedKey === null;

    const setSelectedKey = useCallback( ( key: string | null ) => {
        setSelections( prev => ( {
            ...prev,
            [ activeVariant ]: key,
        } ) );
    }, [ activeVariant ] );

    const back = useCallback( () => {
        setSelectedKey( null );
        setPath( '' );
    }, [ setSelectedKey ] );

    return (
        <BrowseContext.Provider value={ {
            selectedKey,
            setSelectedKey,
            isBrowsing,
            back,
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
