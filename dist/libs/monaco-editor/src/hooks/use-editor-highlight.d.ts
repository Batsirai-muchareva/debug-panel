import type { editor } from 'monaco-editor';
import type { RefObject } from 'react';
interface Options {
    editorRef: RefObject<editor.IStandaloneCodeEditor | null>;
    data: unknown;
    isHighlightActive: boolean;
}
export declare function useEditorHighlight({ editorRef, data, isHighlightActive }: Options): void;
export {};
