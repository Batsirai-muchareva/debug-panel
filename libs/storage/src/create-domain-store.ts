import { createStorage } from './create-storage';

type DebugStorage = {
    path: string;
    'pin-popover': boolean;
    'recent-searches': string[];
    'browse-key': string;
    'layout': { height: number; width: number };
    [ key: `toolbar:${ string }` ]: boolean;
};

const storage = createStorage<DebugStorage>( 'debug-panel' );

export const createDomainStore = () => {
    let scopedStore: ReturnType<typeof storage.scope>;

    return {
        scope: (scopeKey: string) => {
            scopedStore = storage.scope(scopeKey);
        },
        getPath: () => {
            return scopedStore.get('path');
        },

        setPath: (value: string): void => {
            scopedStore.set('path', value);
        },

        getBrowseKey: () => {
            return scopedStore.get('browse-key');
        },

        setBrowseKey: (value: string | null): void => {
            if (!value) {
                scopedStore.remove('browse-key');

                return;
            }

            scopedStore.set('browse-key', value);
        },

        getRecentSearches: (): string[] => {
            return scopedStore.get('recent-searches') ?? [];
        },

        setRecentSearches: (paths: string[]): void => {
            scopedStore.set('recent-searches', paths);
        },

        togglePopoverPin: () => {
            const status = storage.unscoped.get('pin-popover') ?? false;

            storage.unscoped.set('pin-popover', !status);
        },

        getPopoverPin: () => {
            return storage.unscoped.get('pin-popover');
        },

        getToolbarState: (key: string): boolean | null => {
            return storage.unscoped.get(`toolbar:${key}`);
        },

        setToolbarState: (key: string, value: boolean): void => {
            storage.unscoped.set(`toolbar:${key}`, value);
        },

        getLayout: () => {
            return storage.unscoped.get('layout');
        },

        setLayout: ( { height, width }: { height: number; width: number } ): void => {
            storage.unscoped.set( 'layout', { height, width } );
        },
    };
}
