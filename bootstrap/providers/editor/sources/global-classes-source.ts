import { elementorAdapter } from '@debug-panel/adapters';
import { createElementSource } from './create-element-source';

export const globalClassesSource = createElementSource<any>( {
    onSelect: ( element, notify ) => {
        notify( elementorAdapter.globalClasses.get() );

        const unsubscribeClasses = elementorAdapter.globalClasses.subscribe( notify );

        let prevClasses = elementorAdapter.elementDataExtractor( element ).settings?.classes?.value;

        const unsubscribeElement = elementorAdapter.elementSubscriber.subscribe(
            element,
            ( el ) => {
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
// import { createSource } from '@debug-panel/dev-panel-sdk';
// import { Unsubscribe } from '@reduxjs/toolkit';
// import { elementorAdapter } from "@debug-panel/adapters";
// import { eventBus } from "@debug-panel/events";
//
// export const globalClassesSource = createSource<any>( ( { notify } ) => {
//     let unsubscribeSelect: Unsubscribe | null = null;
//     let unsubscribeDeselect: Unsubscribe | null = null;
//     let modelCleanup: Unsubscribe | null = null;
//     let modelCleanup2: Unsubscribe | null = null;
//
//     const handleSelect = () => {
//         modelCleanup?.();
//         modelCleanup = null;
//         modelCleanup2 = null;
//
//         const element = elementorAdapter.getSelectedElement();
//
//         if ( ! element ) {
//             notify?.( null );
//
//             return;
//         }
//
//         modelCleanup = elementorAdapter.globalClasses.subscribe( notify )
//
//         let addedOrRemoved;
//
//         modelCleanup2 = elementorAdapter.elementSubscriber.subscribe( element,
//             ( element ) => {
//             if ( addedOrRemoved !== getData( element ).settings.classes.value ) {
//                 console.log('changed', getData( element ) )
//
//                 notify?.( elementorAdapter.globalClasses.get() );
//             }
//
//                 // Make sure it does not fire twice with subscribe
//                 // elementorAdapter.globalClasses.get()
//             },
//         );
//
//         /** initial call **/
//         notify?.( elementorAdapter.globalClasses.get() );
//     };
//
//     const handleDeselect = () => {
//         modelCleanup?.();
//         modelCleanup2?.();
//         modelCleanup = null;
//         modelCleanup2 = null;
//         notify?.(null);
//     };
//
//     return {
//         setup: () => {
//             unsubscribeSelect = eventBus.on('element:selected', handleSelect);
//
//             unsubscribeDeselect = eventBus.on( 'element:deselected', handleDeselect );
//
//             handleSelect();
//         },
//         teardown: () => {
//             unsubscribeSelect?.();
//             unsubscribeDeselect?.();
//             modelCleanup2?.();
//             modelCleanup?.();
//
//             unsubscribeSelect = null;
//             unsubscribeDeselect = null;
//             modelCleanup = null;
//             modelCleanup2 = null;
//         },
//     };
// } );
//
// const getData = ( element: MarionetteElement ) => {
//     return elementorAdapter.elementDataExtractor( element );
// };
