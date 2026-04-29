import type { editor } from 'monaco-editor';

export function applyInitialFold( editor: editor.IStandaloneCodeEditor ) {
    // requestAnimationFrame( () => {
        editor.getAction( 'editor.foldLevel2' )?.run();

        // editor.getAction( 'editor.foldAll' )?.run();
        // editor.getAction( 'editor.unfold' )?.run();
    // });
}
