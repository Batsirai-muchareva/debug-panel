import { useEffect, useRef, useState } from 'react';

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

export const MonacoEditor = ( { data, variantId }: { data: unknown; variantId: string } ) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>( null );
    const { setSearchActive, isHighlightActive } = useToolbar();
    const { path, setPath } = usePath();
    // const [ready, setReady] = useState( false );

    const pathRef = useRef( path );
    useEffect( () => {
        pathRef.current = path;
    }, [ path ] );

    // We might want to use ref to avoid stale data of path
    useEditorValue( editorRef, data );
    useEditorHighlight( { editorRef, data, isHighlightActive, variantId } );
    useEditorEvents( editorRef )

    const handleMount = ( editor: editor.IStandaloneCodeEditor, monaco: Monaco ) => {
        editorRef.current = editor;

        setupInitialValue( editor, data );
        // applyInitialFold( editor );
        setupCommands( editor, monaco, setSearchActive );
        setupActions( editor, setPath, pathRef );
        registerTheme( monaco );

        // setTimeout( () => setReady( true ), 300 )
    }

    return (
        // <div style={ { background: '#0a1515', flex: 1, display: 'flex' } }>
        // <div
        //     style={ {
        //         flex: 1,
        //         opacity: ready ? 1 : 0,
        //         transform: ready ? 'translateY(0)' : 'translateY(6px)',
        //         transition: ready ? 'opacity 60ms ease, transform 60ms ease' : 'none',
        //         // flex: 1,
        //         // opacity: ready ? 1 : 0,
        //         // transform: ready ? 'translateY(0)' : 'translateY(6px)',
        //         // transition: 'opacity 60ms ease, transform 60ms ease',
        //     } }
        // >
        <Editor
            language="json"
            theme="panel-dark"
            options={ editorOptions }
            onMount={ handleMount }
        />
        // </div>
        // </div>
    );
}
