import { MarionetteElement } from "@debug-panel/adapters";
import { createSource } from '@debug-panel/dev-panel-sdk';
import { eventBus } from '@debug-panel/events';
import { elementorAdapter } from '@debug-panel/adapters';

type Unsubscribe = () => void;

type ElementSourceOptions<T> = {
    onSelect: ( element: MarionetteElement, notify: ( data: T | null ) => void ) => Unsubscribe | null;
};

export const createElementSource = <T>( { onSelect }: ElementSourceOptions<T> ) => {
    return createSource<T>( ( { notify } ) => {
        let unsubscribeSelect: Unsubscribe | null = null;
        let unsubscribeDeselect: Unsubscribe | null = null;
        let modelCleanup: Unsubscribe | null = null;

        const handleSelect = () => {
            modelCleanup?.();
            modelCleanup = null;

            const element = elementorAdapter.getSelectedElement();

            if ( ! element ) {
                notify( null );
                return;
            }

            modelCleanup = onSelect( element, notify );

        };

        const handleDeselect = () => {
            modelCleanup?.();
            modelCleanup = null;
            notify( null );
        };

        return {
            setup() {
                unsubscribeSelect = eventBus.on( 'element:selected', handleSelect );
                unsubscribeDeselect = eventBus.on( 'element:deselected', handleDeselect );
                handleSelect();
            },

            teardown() {
                unsubscribeSelect?.();
                unsubscribeDeselect?.();
                modelCleanup?.();

                unsubscribeSelect = null;
                unsubscribeDeselect = null;
                modelCleanup = null;
            },
        };
    } );
};
