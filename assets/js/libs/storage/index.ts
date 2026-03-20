import { createStorage } from './create-storage';

type DebugStorage = {
    path: string;
    'recent-searches': string[];
    [ key: `toolbar:${ string }` ]: boolean;
};

const storage = createStorage<DebugStorage>('dev-debug');

export const store = {
    setVariantId: ( variantId: string ) => {
        storage.setId( variantId )
    },

    getRecent: () => {
        return storage.get( `recent-searches` );
    },

    setRecent: ( path: string ) => {
        const searches = store.getRecent();

        const next = [ path, ...( searches ?? [] ).filter( p => p !== path ) ];

        storage.set( `recent-searches`, next );
    },

    getPath: () => {
        return storage.get( 'path' );
    },

    setPath: ( value: string ) => {
        storage.set( 'path', value );
    },

    getToolbarActionStatus: ( key: string ) => {
        return storage.unscoped.get( `toolbar:${ key }` )
    },
    setToolbarActionStatus: ( key: string, value: boolean ) => {
        storage.unscoped.set( `toolbar:${ key }`, value )
    },
};
