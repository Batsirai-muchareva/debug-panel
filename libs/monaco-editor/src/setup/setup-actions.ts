import type { editor } from 'monaco-editor';

import { buildPath } from '@debug-panel/json-delta';
import { sourceLocator } from '@debug-panel/source-locator';
import type { RefObject } from 'react';

export function setupActions(
    editor: editor.IStandaloneCodeEditor,
    setPath: ( path: string ) => void,
    pathRef: RefObject<string>,
) {
    editor.addAction( {
        id: 'expand-key-at-cursor',
        label: 'Expand',
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1,
        run( ed ) {
            const position = ed.getPosition();

            if ( ! position ) {
                return;
            }

            ed.setPosition( { lineNumber: position.lineNumber, column: 1 } );
            ed.getAction( 'editor.unfoldRecursively' )?.run();
            ed.revealLineInCenter( position.lineNumber );
        },
    } );

    editor.addAction( {
        id: 'pin-search-to-path',
        label: 'Pin to search',
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 2,
        run( ed ) {
            const position = ed.getPosition();

            if ( ! position ) {
                return;
            }

            // code below can be extracted and then passed so that we have meaning and good api that reads
            const lookUpPath = sourceLocator.locatePathAtLine( position.lineNumber );

            if ( ! lookUpPath ) {
                return;
            }

            const built = buildPath( pathRef.current as string, lookUpPath );

            setPath( built );
        },
    } );
}
