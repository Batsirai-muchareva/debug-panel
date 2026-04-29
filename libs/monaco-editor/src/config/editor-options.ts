import type { editor } from 'monaco-editor';

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false },
    folding: true,
    // lineNumbers: 'off',
    glyphMargin: false,
    stickyScroll: { enabled: false },
    scrollBeyondLastLine: false,
    padding: {
        bottom: 20,
    },
};
