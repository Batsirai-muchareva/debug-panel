import type { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

export function setupCommands(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
    activateSearch: ( status: boolean ) => void,
) {
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
        () => activateSearch( true ),
    );

    editor.addCommand(
        monaco.KeyCode.Escape,
        () => activateSearch( false ),
    );
}
