import { useRef } from 'react';

import { Editor, type Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

import { usePath } from '@debug-panel/path';
import { useToolbar } from '@debug-panel/toolbar';

import { editorOptions } from './config/editor-options';
import { registerTheme } from './config/register-theme';
import { useEditorEvents } from './hooks/use-editor-events';
import { useEditorHighlight } from './hooks/use-editor-highlight';
import { useEditorValue } from './hooks/use-editor-value';
import { applyInitialFold } from './setup/apply-initial-folding';
import { setupActions } from './setup/setup-actions';
import { setupCommands } from './setup/setup-commands';
import { setupInitialValue } from './setup/setup-initial-value';

export const MonacoEditor = ( { data }: { data: unknown } ) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>( null );
    const { setSearchActive, isHighlightActive } = useToolbar();
    const { path, setPath } = usePath();

    // We might want to use ref to avoid stale data of path
    useEditorValue( editorRef, data );
    useEditorHighlight( { editorRef, data, isHighlightActive } );
    useEditorEvents( editorRef )

    const handleMount = ( editor: editor.IStandaloneCodeEditor, monaco: Monaco ) => {
        editorRef.current = editor;

        setupInitialValue( editor, data );
        applyInitialFold( editor );
        setupCommands( editor, monaco, setSearchActive );
        setupActions( editor, setPath, path );
        registerTheme( monaco )
    }

    return (
        <Editor
            language="json"
            theme="panel-dark"
            options={ editorOptions }
            onMount={ handleMount }
        />
    );
}




// useEventBus( 'json:fold:all', () => {
//     editorRef.current?.getAction( 'editor.foldAll' )?.run();
//     editorRef.current?.getAction( 'editor.unfold' )?.run();
// } );
//
// useEventBus( 'json:expand:all', () => {
//     editorRef.current?.getAction( 'editor.unfoldAll' )?.run();
// } );
