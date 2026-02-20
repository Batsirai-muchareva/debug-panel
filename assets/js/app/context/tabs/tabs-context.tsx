import React, { useMemo } from "react";
import { useState, PropsWithChildren } from "react";
import { createContext, useContext } from "@wordpress/element";
import { ContextState, Tab } from "@app/context/tabs/types";
import { createIndexResolver } from "@app/context/tabs/create-index-resolver";
import { buildTabs } from "@app/context/tabs/build-tabs";
import { Variant } from "@app/types";

const TabsContext = createContext< ContextState | undefined >( undefined );

export const TabsProvider = ( { children }: PropsWithChildren ) => {
    const { tabs, initialState } = useMemo( () => getTabState( buildTabs() ), [] );

    const [ activeProvider, setActiveProvider ] = useState< Tab['id'] >( initialState.activeProvider );
    const [ activeVariants, setActiveVariants ] = useState< Record<Tab['id'], Variant['id']> >( initialState.activeVariant );

    const setProvider = ( tabId: Tab["id"] ) => {
        setActiveProvider( tabId );
    }

    const setVariant = ( variantId: Variant["id"] ) => {
        setActiveVariants( prev => ( {
            ...prev,
            [ activeProvider ]: variantId,
        } ) );
    };

    const activeVariant = activeVariants[ activeProvider ];

    return (
        <TabsContext.Provider value={ {
            activeProvider,
            activeVariant,
            setProvider,
            setVariant,
            tabs,
            getActiveIndex: createIndexResolver( tabs, activeProvider, activeVariant )
        } }>
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = () => {
    const context = useContext( TabsContext );

    if ( ! context ) {
        throw new Error("useTabs must be used within a TabsProvider");
    }

    return context;
};

const getTabState = ( tabs: Tab[] ) => ( {
    tabs,
    initialState:{
        activeProvider: tabs[0]?.id,
        activeVariant: Object.fromEntries(
            tabs.map( ( tab ) => ( [ tab.id, tab.variants[0]?.id ] ) )
        )
    },
} );
