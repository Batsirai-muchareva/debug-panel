import { createContext, type PropsWithChildren, useContext, useState } from 'react';

import { useEventBus } from '@debug-panel/events';
import { usePath } from '@debug-panel/path';
import { store } from '@debug-panel/storage';

type BrowseContextValue = {
    browsePath: string | null;
    setBrowsePath: ( key: string ) => void;
    goBack: () => void;

};

const BrowseContext = createContext<BrowseContextValue | null>( null );

// TODO make it package later
export const BrowseProvider = ( { children }: PropsWithChildren ) => {
    const [ _, setBrowsePath ] = useState<BrowseContextValue[ 'browsePath' ]>();
    const { setPath } = usePath();

    useEventBus( 'browse:key:clear', () => {
        store.setBrowseKey( null );
        setBrowsePath( null );
        setPath( '' );
    } );

    return (
        <BrowseContext.Provider
            value={ {
                browsePath: store.getBrowseKey(),
                setBrowsePath: ( key ) => {
                    setBrowsePath( key );
                    store.setBrowseKey( key );
                },
                goBack: () => setBrowsePath( null ),
            } }
        >
            {children}
        </BrowseContext.Provider>
    );
};

export const useBrowsePath = () => {
    const context = useContext( BrowseContext );

    if ( ! context ) {
        throw new Error( 'useBrowsePath must be used within a BrowseProvider' );
    }

    return context;
};
