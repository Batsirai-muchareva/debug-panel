"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementorAdapter = void 0;
const events_1 = require("@debug-panel/events");
const get_used_global_classes_snapshot_1 = require("./get-used-global-classes-snapshot");
const create_element_event_subscriber_1 = require("./marionette-element/create-element-event-subscriber");
const data_extractor_1 = require("./marionette-element/data-extractor");
const get_atomic_elements_schema_1 = require("./sync/get-atomic-elements-schema");
const get_atomic_style_schema_1 = require("./sync/get-atomic-style-schema");
const get_elementor_commands_1 = require("./sync/get-elementor-commands");
const get_interactions_schema_1 = require("./sync/get-interactions-schema");
const get_selected_element_1 = require("./sync/get-selected-element");
const get_settings_1 = require("./sync/get-settings");
const post_id_1 = require("./sync/post-id");
const editor_pointer_events_1 = require("./utils/editor-pointer-events");
const LOG_PREFIX = '[DevDebugTool:ElementorAdapter]';
const createElementorAdapter = () => {
    return {
        onCommand: (commandList, handler) => {
            const commands = (0, get_elementor_commands_1.getElementorCommands)();
            const toWatch = Array.isArray(commandList) ? commandList : [commandList];
            const internalHandler = (_, command) => {
                if (toWatch.includes(command)) {
                    try {
                        handler();
                    }
                    catch (error) {
                        console.error(`${LOG_PREFIX} Error in command handler:`, error);
                    }
                }
            };
            commands.on('run:after', internalHandler);
            return () => {
                commands.off('run:after', internalHandler);
            };
        },
        getSelectedElement: get_selected_element_1.getSelectedElement,
        postId: (0, post_id_1.getPostId)(),
        elementSubscriber: (0, create_element_event_subscriber_1.createElementEventSubscriber)(),
        elementDataExtractor: data_extractor_1.dataExtractor,
        getUsedGlobalClassesSnapshot: get_used_global_classes_snapshot_1.getUsedGlobalClassesSnapshot,
        toolbarHeight: () => {
            var _a;
            const toolbar = document.getElementById('elementor-editor-wrapper-v2');
            return (_a = toolbar === null || toolbar === void 0 ? void 0 : toolbar.offsetHeight) !== null && _a !== void 0 ? _a : null;
        },
        schemaTypes: {
            style: get_atomic_style_schema_1.getAtomicStyleSchema,
            interaction: get_interactions_schema_1.getInteractionsSchema,
            elements: get_atomic_elements_schema_1.getAtomicElementsSchema
        },
        settings: (0, get_settings_1.getSettings)()
    };
};
const elementorAdapter = createElementorAdapter();
exports.elementorAdapter = elementorAdapter;
elementorAdapter.onCommand('document/elements/select', () => {
    events_1.eventBus.emit('element:selected');
});
elementorAdapter.onCommand([
    'document/elements/deselect',
    'document/elements/deselect-all',
    'document/elements/delete',
    'panel/exit',
], () => {
    events_1.eventBus.emit('element:deselected');
});
elementorAdapter.onCommand('document/save/update', () => {
    events_1.eventBus.emit('document:published');
});
events_1.eventBus.on('popover:before:dragging', () => {
    (0, editor_pointer_events_1.toggleEditorPointerEvents)(true);
});
events_1.eventBus.on('popover:after:dragging', () => {
    (0, editor_pointer_events_1.toggleEditorPointerEvents)(false);
});
