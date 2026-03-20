import { Provider } from "@libs/types";

import { globalClassesSource } from "@app/providers/editor/sources/global-classes-source";
import { localSource } from "@app/providers/editor/sources/local-source";
import { EditorData } from "@app/providers/editor/types";

export const editorProvider =
    (): Provider< EditorData, { onIdle?: () => void } > => {

    return {
        id: 'editor',
        title: 'Editor',
        order: 1,
        emptyMessage: 'Please select element to see live snapshots of data',
        variants: [
            {
                id: 'local',
                label: 'Local',
                order: 1,
                sourceConfig: {},
                createSource: localSource
            },
            {
                id: 'global_classes',
                label: 'Classes',
                order: 2,
                sourceConfig: {
                    onIdle: () => {
                        // event to switch to editor
                    }
                },
                createSource: globalClassesSource,
                emptyMessage: 'No Global classes assigned to this element',
            }
        ],
    }
}
