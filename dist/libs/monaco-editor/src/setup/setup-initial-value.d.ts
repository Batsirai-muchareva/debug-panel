import type { editor } from 'monaco-editor';
/**
 * @param editor
 * @param data
 *
 * Data is intentionally captured once — initial value only.
 * subsequent updates are handled imperatively by useEditorValue.
 */
export declare function setupInitialValue(editor: editor.IStandaloneCodeEditor, data: unknown): void;
