import { elementorAdapter } from "@app/adapters";
import { Unsubscribe } from "@app/types";
import { MarionetteElement } from "@app/adapters/elementor/sync/get-selected-element";
import { LocalElementData } from "@app/adapters/elementor/elementor-adapter";
import { eventBus } from "@app/events";
import { createSource } from "@app/source-manager/create-source";

export const localSource = createSource<LocalElementData, { onIdle?: () => void }>( ( notify ) => {
    let unsubscribeSelect: Unsubscribe | null = null;
    let unsubscribeDeselect: Unsubscribe | null = null;
    let modelCleanup: Unsubscribe | null = null;

    const getData = ( element: MarionetteElement ) => {
        return elementorAdapter.elementDataExtractor( element ) as LocalElementData
    };

    const handleSelect = () => {
        modelCleanup?.();
        modelCleanup = null;

        const element = elementorAdapter.getSelectedElement();

        if ( ! element ) {
            notify?.( null );

            return;
        }

        modelCleanup = elementorAdapter.elementSubscriber.subscribe( element, ( element ) =>
            notify?.( getData( element ) )
        )

        // initial call
        notify?.( getData( element ) );
    }

    const handleDeselect = () => {
        modelCleanup?.();
        modelCleanup = null;
        notify?.(null);
    }

    return {
        setup: () => {
            unsubscribeSelect = eventBus.on( 'element:selected', handleSelect );
            unsubscribeDeselect = eventBus.on( 'element:deselected', handleDeselect );

            handleSelect();
        },
        teardown: () => {
            unsubscribeSelect?.();
            unsubscribeDeselect?.();
            modelCleanup?.();

            unsubscribeSelect = null;
            unsubscribeDeselect = null;
            modelCleanup = null;
        },
    }
} );
