import React, { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "@wordpress/element";

import { jsonDelta } from "@libs/json-delta";
import { store } from "@libs/storage";
import { Variant } from "@libs/types";

import { buildTabs } from "@app/context/tabs/build-tabs";
import { createIndexResolver } from "@app/context/tabs/create-index-resolver";
import { ContextState, Tab } from "@app/context/tabs/types";

const TabsContext = createContext< ContextState | undefined >( undefined );

export const TabsProvider = ( { children }: PropsWithChildren ) => {
    const { tabs, initialState } = useMemo( () => getTabState( buildTabs() ), [] );

    const [ activeProvider, setActiveProvider ] = useState< Tab['id'] >( initialState.activeProvider );
    const [ activeVariants, setActiveVariants ] = useState< Record<Tab['id'], Variant['id']> >( () => {
        store.setVariantId( initialState.activeVariant[ initialState.activeProvider ] );

        return initialState.activeVariant
    } );

    const setProvider = ( tabId: Tab["id"] ) => {
        jsonDelta.reset();

        setActiveProvider( tabId );
    }

    const setVariant = ( variantId: Variant["id"] ) => {
        jsonDelta.reset();

        setActiveVariants( prev => ( {
            ...prev,
            [ activeProvider ]: variantId,
        } ) );
    };

    const activeVariant = activeVariants[ activeProvider ];

    useEffect( () => {
        store.setVariantId( activeVariant );
    }, [ activeVariant ] )

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
