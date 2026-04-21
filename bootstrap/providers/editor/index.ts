import { registerProvider } from '@debug-panel/dev-panel-sdk';

import { localSource } from './sources/local-source';
import { globalClassesSource } from './sources/global-classes-source';

export const registerEditorProvider = () => {
    registerProvider( {
        id: 'editor',
        label: 'Editor',
        order: 1,
        emptyMessage: 'Please select element to see live snapshots of data',
        variants: [
            {
                id: 'local',
                label: 'Local',
                order: 1,
                source: localSource
            },
            {
                id: 'classes',
                label: 'Classes',
                order: 2,
                source: globalClassesSource,
                emptyMessage: 'No Global classes assigned to this element',
            }
        ]
    } );
}
