// import { elementorAdapter } from "@debug-panel/adapters";
import { MarionetteElement } from "@debug-panel/adapters";
// import { LocalElementData } from "@debug-panel/adapters";
import { eventBus } from "@debug-panel/events";
import { createSource } from '@debug-panel/dev-panel-sdk';

// type Unsubscribe = () => void;

// local-source.ts
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

// export const localSource = createSource<LocalElementData>( ( { notify }) => {
//     let unsubscribeSelect: Unsubscribe | null = null;
//     let unsubscribeDeselect: Unsubscribe | null = null;
//     let modelCleanup: Unsubscribe | null = null;
//
//     const handleSelect = () => {
//         modelCleanup?.();
//         modelCleanup = null;
//
//         const element = elementorAdapter.getSelectedElement();
//
//         if ( ! element ) {
//             notify?.( null );
//
//             return;
//         }
//
//         modelCleanup = elementorAdapter.elementSubscriber.subscribe( element,
//             ( element ) => notify?.( getData( element ) ),
//         );
//
//         /** initial call **/
//         notify?.( getData( element ) );
//     };
//
//     const handleDeselect = () => {
//         modelCleanup?.();
//         modelCleanup = null;
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
//             modelCleanup?.();
//
//             unsubscribeSelect = null;
//             unsubscribeDeselect = null;
//             modelCleanup = null;
//         },
//     };
// });
//
// const getData = ( element: MarionetteElement ) => {
//     return elementorAdapter.elementDataExtractor( element );
// };



/**
 * The best approach is dispathc an event and we do the validate closer to higher level
 *
 *  const data = getData( element );
 *     eventBus.emit( 'element:data:changed', { data } ); // ← emit on initial select
 *     notify?.( data );
 *
 *     // path-validator.ts — call once at app init
 * export const initPathValidator = () => {
 *     eventBus.on( 'element:data:changed', ( { data } ) => {
 *         // get all active path stores and validate
 *         pathStores.forEach( ( store, variantId ) => {
 *             const currentPath = store.readState();
 *             if ( ! currentPath ) return;
 *
 *             const getter = createPathValueGetter( data );
 *             const isValid = getter( currentPath ) !== undefined;
 *
 *             if ( isValid ) return;
 *
 *             const parts = currentPath.split( '.' );
 *             let validPath = '';
 *
 *             for ( let i = parts.length - 1; i >= 0; i-- ) {
 *                 const candidate = parts.slice( 0, i ).join( '.' );
 *                 if ( ! candidate ) break;
 *                 if ( getter( candidate ) !== undefined ) {
 *                     validPath = candidate;
 *                     break;
 *                 }
 *             }
 *
 *             store.writeState( validPath );
 *         } );
 *     } );
 * };
 *
 * // app/init.ts or wherever you bootstrap the debug panel
 *
 * import { registerToolbarActions } from "@app/toolbar/register-toolbar-actions";
 * import { initPathValidator } from "@app/path/path-validator";
 *
 * export const initApp = () => {
 *     registerToolbarActions();
 *     initPathValidator();   // ← same level
 * };
 *
 *
 */
