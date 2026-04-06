import { type RefObject, useEffect, useRef } from 'react';

import type { editor } from 'monaco-editor';

export function useEditorValue(
    editorRef: RefObject<editor.IStandaloneCodeEditor | null>,
    data: unknown,
) {
    const prevValueRef = useRef<string>( '' );

    useEffect( () => {
        const editor = editorRef.current;

        if ( ! editor ) {
            return;
        }

        const next = JSON.stringify( data, null, 2 );

        if ( next === prevValueRef.current ) {
            return;
        }

        prevValueRef.current = next;

        editor.getModel()?.setValue( next ?? '' );

    }, [ data ] );

    return prevValueRef;
}
