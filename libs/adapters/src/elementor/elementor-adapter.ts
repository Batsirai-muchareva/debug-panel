import { eventBus } from "@debug-panel/events";

import { windowAdapter } from '../window/window-adapter';
import { globalClasses } from './global-classes';
import { createElementEventSubscriber } from "./marionette-element/create-element-event-subscriber";
import { elementDataExtractor } from "./marionette-element/element-data-extractor";
import { getAtomicElementsSchema } from "./sync/get-atomic-elements-schema";
import { getAtomicStyleSchema } from "./sync/get-atomic-style-schema";
import { getElementorCommands } from "./sync/get-elementor-commands";
import { getInteractionsSchema } from "./sync/get-interactions-schema";
import { type ElementData, getSelectedElement } from "./sync/get-selected-element";
import { getSettings } from "./sync/get-settings";
import { getPostId } from "./sync/post-id";
import { toggleEditorPointerEvents } from './utils/editor-pointer-events';

export type ElementorCommand =
    | 'document/elements/select'
    | 'document/elements/deselect'
    | 'document/elements/deselect-all'
    | 'document/elements/delete'
    | 'document/elements/create'
    | 'document/save/update'
    | 'document/save/default'
    | 'panel/exit'
    | 'panel/open'
    | 'panel/close';

type Unsubscribe = () => void;

type Callback<T = void> = ( data: T ) => void;

const LOG_PREFIX = '[DevDebugTool:ElementorAdapter]';

export type LocalElementData = ElementData;

const createElementorAdapter = () => {
    return {
        onCommand: (
            commandList: ElementorCommand | ElementorCommand[],
            handler: Callback
        ): Unsubscribe => {
            const commands = getElementorCommands();

            const toWatch = Array.isArray( commandList ) ? commandList : [ commandList ];

            const internalHandler = ( _: unknown, command: string ) => {
                if ( toWatch.includes( command as ElementorCommand ) ) {

                    try {
                        handler();
                    } catch ( error ) {
                        console.error( `${LOG_PREFIX} Error in command handler:`, error );
                    }
                }
            };

            commands.on( 'run:after', internalHandler );

            return () => {
                commands.off( 'run:after', internalHandler );
            }
        },
        getSelectedElement,
        postId: getPostId(),
        elementSubscriber: createElementEventSubscriber(),
        elementDataExtractor: elementDataExtractor,
        globalClasses,
        schemaTypes: {
            style: getAtomicStyleSchema,
            interaction: getInteractionsSchema,
            elements: getAtomicElementsSchema
        },
        settings: getSettings()
    }
}

const elementorAdapter = createElementorAdapter();

elementorAdapter.onCommand(
    'document/elements/select',
    () => {
        eventBus.emit( 'element:selected' );
    }
);

elementorAdapter.onCommand(
    [
        'document/elements/deselect',
        'document/elements/deselect-all',
        'document/elements/delete',
        'panel/exit',
    ],
    () => {
        eventBus.emit( 'element:deselected' );
    }
);

elementorAdapter.onCommand(
    'document/save/update',
    () => {
        eventBus.emit( 'document:published' )
    }
);

eventBus.on( [ 'drag:start', 'resize:start' ], () => {
    windowAdapter.attachMouseEvents();

    toggleEditorPointerEvents( true )
} );

eventBus.on( [ 'drag:end', 'resize:end' ], () => {
    toggleEditorPointerEvents( false )
} );

export { elementorAdapter };
