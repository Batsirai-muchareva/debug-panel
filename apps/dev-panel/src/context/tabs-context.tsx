import {
    createContext,
    type PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from 'react';

import {
    useProvidersConfigs,
} from '../hooks/use-providers-configs';
import type { Tab } from '../types';
import { providerRegistry } from "@debug-panel/providers";
import { store } from "@debug-panel/storage";

type ContextValue = {
    provider: {
        tabs: Tab[];
        id: string;
        setId: ( id: string ) => void;
    };
    variant: {
        tabs: Tab[];
        id: string;
        setId: ( id: string ) => void;
    };
};

const Context = createContext< ContextValue | null >( null );

export const TabsProvider = ( { children }: PropsWithChildren ) => {
    const providers = useProvidersConfigs();
    const [ providerId, setProviderId ] = useState( providers.firstOrThrow().id );

    const [ variantIds, setVariantIds ] = useState<Record<string, string>>( () =>
        providers.toRecord(
            ( { id } ) => id,
            ( { variants } ) => variants[0]?.id ?? '',
        )
    );

    const variantId = variantIds[ providerId ];

    const variants = providers.findBy( 'id', providerId )?.variants;

    if ( ! variants ) {
        throw Error( `Variants not found for ${ providerId }` )
    }

    const setVariantId = ( id: string ) => {
        setVariantIds( prev => ( { ...prev, [ providerId ]: id } ) );
    };

    //TODO We need a synchonous effect
    store.scope( variantId )

    return (
        <Context.Provider value={ {
            provider: {
                tabs: providers.pick( 'id', 'label' ),
                setId: setProviderId,
                id: providerId,
            },
            variant: {
                tabs: variants.pick( 'id', 'label' ),
                setId: setVariantId,
                id: variantId,
            },
        } }>
            { children }
        </Context.Provider>
    );
}

export const useTabs = () => {
    const ctx = useContext( Context );

    if ( ! ctx ) {
        throw new Error( 'useTabs must be used within TabsProvider' );
    }

    return ctx
};
