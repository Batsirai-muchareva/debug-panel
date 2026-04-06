import { createStorage } from './create-storage';

type DebugStorage = {
    path: string;
    'recent-searches': string[];
    'browse-key': string;
    [ key: `toolbar:${ string }` ]: boolean;
};

const storage = createStorage<DebugStorage>( 'debug-panel' );

export const createDomainStore = () => {
    let scopedStore: ReturnType<typeof storage.scope>;

    return {
        scope: ( scopeKey: string ) => {
            scopedStore = storage.scope( scopeKey )
        },
        getPath: () => {
            return scopedStore.get( 'path' )
        },

        setPath: ( value: string ): void => {
            scopedStore.set( 'path', value )
        },

        getBrowseKey: () => {
            return scopedStore.get( 'browse-key' )
        },

        setBrowseKey: ( value: string  | null  ): void =>{
            if ( ! value ) {
                scopedStore.remove( 'browse-key' );

                return;
            }

            scopedStore.set( 'browse-key', value )
        },

        getRecentSearches: (): string[] => {
            return scopedStore.get( 'recent-searches' ) ?? [];
        },

        setRecentSearches: ( paths: string [] ): void => {
            scopedStore.set( 'recent-searches', paths );
        },

        //     // setRecentSearches( prev => {
//     //     const next = [ path, ...prev.filter( p => p !== path ) ].slice( 0, 5 );
//
//         // TODO expose fxns atleast than the strings
//         debugStorage.set( `recent-searches:${ variantId }`, next );
//
//         return next;
//     // } );

        getToolbarState: ( key: string ): boolean | null => {
            return storage.unscoped.get( `toolbar:${ key }` );
        },

        setToolbarState: ( key: string, value: boolean ): void =>{
            storage.unscoped.set( `toolbar:${ key }`, value );
        }
    }
}
