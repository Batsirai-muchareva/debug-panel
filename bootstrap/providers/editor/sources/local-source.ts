import { elementorAdapter, LocalElementData } from '@debug-panel/adapters';

import { createElementSource } from './create-element-source';

export const localSource = createElementSource<LocalElementData>( {
    onSelect: ( element, notify ) => {
        notify( elementorAdapter.elementDataExtractor( element ) );

        return elementorAdapter.elementSubscriber.subscribe( element,
            ( el ) => notify( elementorAdapter.elementDataExtractor( el ) ),
        );
    },
} );
