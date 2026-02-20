import { getElementorCommands } from "@app/adapters/elementor/sync/get-elementor-commands";
import { ElementData, getSelectedElement, StyleDefinition } from "@app/adapters/elementor/sync/get-selected-element";
import { getPostId } from "@app/adapters/elementor/sync/post-id";
import {
    createElementEventSubscriber,
} from "@app/adapters/elementor/marionette-element/create-element-event-subscriber";
import { dataExtractor } from "@app/adapters/elementor/marionette-element/data-extractor";
import { getUsedGlobalClassesSnapshot } from "@app/adapters/elementor/get-used-global-classes-snapshot";
import { eventBus } from "@app/events";
import { getInteractionsSchema } from "@app/adapters/elementor/sync/get-interactions-schema";
import { getAtomicElementsSchema } from "@app/adapters/elementor/sync/get-atomic-elements-schema";
import { getAtomicStyleSchema } from "@app/adapters/elementor/sync/get-atomic-style-schema";

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

export type GlobalClasses = Array<StyleDefinition>;

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
        elementDataExtractor: dataExtractor,
        getUsedGlobalClassesSnapshot: getUsedGlobalClassesSnapshot,
        toolbarHeight: () => {
            const toolbar = document.getElementById( 'elementor-editor-wrapper-v2' );

            return toolbar?.offsetHeight ?? null
        },
        schemaTypes: {
            style: getAtomicStyleSchema,
            interaction: getInteractionsSchema,
            elements: getAtomicElementsSchema
        }
    }
}

const elementorAdapter = createElementorAdapter();


console.log( elementorAdapter.schemaTypes.elements() )
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

export { elementorAdapter };
