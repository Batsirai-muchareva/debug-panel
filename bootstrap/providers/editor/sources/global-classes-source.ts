import { elementorAdapter } from '@debug-panel/adapters';

import { createElementSource } from './create-element-source';

export const globalClassesSource = createElementSource<any>( {
    onSelect: ( element, notify ) => {
        notify( elementorAdapter.globalClasses.get() );

        const unsubscribeClasses = elementorAdapter.globalClasses.subscribe( notify );

        let prevClasses = elementorAdapter.elementDataExtractor( element ).settings?.classes?.value;

        const unsubscribeElement = elementorAdapter.elementSubscriber.subscribe( element, ( el ) => {
                const nextClasses = elementorAdapter.elementDataExtractor( el ).settings?.classes?.value;

                if ( prevClasses !== nextClasses ) {
                    prevClasses = nextClasses;
                    notify( elementorAdapter.globalClasses.get() );
                }
            },
        );

        return () => {
            unsubscribeClasses?.();
            unsubscribeElement?.();
        };
    },
} );
