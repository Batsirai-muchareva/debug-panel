import type { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

import { eventBus } from '@debug-panel/events';

export function setupCommands(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
    activateSearch: ( status: boolean ) => void,
) {
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
        () => {
            activateSearch( true );

            eventBus.emit( 'text-field:focus', { id: 'search' } )
        },
    );

    editor.addCommand(
        monaco.KeyCode.Escape,
        () => activateSearch( false ),
    );
}
