import { registerProvider } from '@debug-panel/dev-panel-sdk';

import { localSource } from './sources/local-source';
import { globalClassesSource } from './sources/global-classes-source';

export const registerEditorProvider = () => {
    registerProvider( {
        id: 'editor',
        label: 'Editor',
        order: 1,
        variants: [
            {
                id: 'local',
                label: 'Local',
                order: 1,
                source: localSource,
                empty: {
                    title: 'No element selected',
                    message: 'Select element to see live Element state',
                },
            },
            {
                id: 'classes',
                label: 'Classes',
                order: 2,
                source: globalClassesSource,
                empty: {
                    title: 'No global classes',
                    message: 'Assign global classes to selected element to see their state on element',
                },
            },
        ],
    } );
}
