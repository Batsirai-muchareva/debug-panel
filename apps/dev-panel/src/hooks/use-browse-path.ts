import { useEventBus } from '@debug-panel/events';
import { usePath } from '@debug-panel/path';
import { store } from '@debug-panel/storage';

export const useBrowsePath = () => {
    const { setPath } = usePath();

    useEventBus( 'browse:key:clear', () => {
        store.setBrowseKey( null );
        setPath( '' );
    } );

    return {
        browsePath: store.getBrowseKey(),
        setBrowsePath: ( key ) => {
            store.setBrowseKey( key );
        }
    }
}
