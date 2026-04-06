import { type RefObject } from 'react';
import type { editor } from 'monaco-editor';
export declare function useEditorValue(editorRef: RefObject<editor.IStandaloneCodeEditor | null>, data: unknown): import("react").MutableRefObject<string>;
