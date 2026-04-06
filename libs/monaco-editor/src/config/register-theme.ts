import type { Monaco } from '@monaco-editor/react';

export const THEME_NAME = 'panel-dark';

export function registerTheme( monaco: Monaco ) {
    monaco.editor.defineTheme( THEME_NAME, {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background':                  '#0a1515',
            'editor.foreground':                  '#abb2bf',
            'editorLineNumber.foreground':        '#2a5050',
            'editor.selectionBackground':         '#1e3535',
            'editor.lineHighlightBackground':     '#0d1e1e',
            'editorCursor.foreground':            '#7ab8a8',
            'editorIndentGuide.background':       '#1e3535',
            'editorIndentGuide.activeBackground': '#2a4545',
            'scrollbarSlider.background':         '#1e353580',
            'scrollbarSlider.hoverBackground':    '#2a454580',
            'menu.background':                    '#0f1e1e',
            'menu.foreground':                    '#abb2bf',
            'menu.selectionBackground':           '#1e3535',
            'menu.selectionForeground':           '#eee',
            'menu.separatorBackground':           '#1e3535',
            'menu.border':                        '#1e3535',
        },
    } );
    monaco.editor.setTheme( THEME_NAME );
}
