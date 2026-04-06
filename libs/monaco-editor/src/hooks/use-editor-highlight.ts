import { useEffect, useRef } from 'react';

import type { editor } from 'monaco-editor';
import type { RefObject } from 'react';

import { useJsonDelta } from '@debug-panel/json-delta';

interface Options {
    editorRef: RefObject<editor.IStandaloneCodeEditor | null>;
    data: unknown;
    isHighlightActive: boolean;
}

const HIGHLIGHT_DURATION_MS = 2000;

export function useEditorHighlight( { editorRef, data, isHighlightActive }: Options ) {
    const decorationsRef = useRef<string[]>( [] );
    const { highlightLines: highlightRange, scrollToLine } = useJsonDelta( data, isHighlightActive );

    useEffect( () => {
        const editor = editorRef.current;

        if ( ! editor || ! highlightRange?.length ) {
            return;
        }

        const startLineNumber = Math.min( ...highlightRange );
        const endLineNumber = Math.max( ...highlightRange );

        decorationsRef.current = editor.deltaDecorations(
            decorationsRef.current,
            [ {
                range: {
                    startLineNumber,
                    startColumn: 1,
                    endLineNumber,
                    endColumn: 1
                },
                options: {
                    isWholeLine: true,
                    className: 'highlighted',
                    linesDecorationsClassName: 'monaco-changed-line-gutter',
                    overviewRuler: { color: '#7ab8a8', position: 1 },
                },
            } ]
        );

        if ( scrollToLine ) {
            editor.revealLineInCenter( scrollToLine );
        }

        const timer = setTimeout( () => {
            decorationsRef.current = editor.deltaDecorations(
                decorationsRef.current,
                []
            );
        }, HIGHLIGHT_DURATION_MS );

        return () => clearTimeout( timer );
    }, [ scrollToLine, highlightRange ] );
}
