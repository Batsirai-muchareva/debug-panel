import type { editor } from 'monaco-editor';
import type { RefObject } from 'react';

import { useEventBus } from "@debug-panel/events";

export const useEditorEvents = ( editorRef: RefObject<editor.IStandaloneCodeEditor> ) => {
    useEventBus( "json:fold:all", () => {
        editorRef.current?.getAction( "editor.foldAll" )?.run();
        editorRef.current?.getAction( "editor.unfold" )?.run();
    } );

    useEventBus( "json:expand:all", () => {
        editorRef.current?.getAction( "editor.unfoldAll" )?.run();
    } );
};
