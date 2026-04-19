import type { editor } from 'monaco-editor';
import type { RefObject } from 'react';

import { buildPath } from '@debug-panel/json-delta';
import { sourceLocator } from '@debug-panel/source-locator';

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

            const lookUpPath = sourceLocator.getLocationAtLine( position.lineNumber );

            if ( ! lookUpPath ) {
                return;
            }

            const built = buildPath( pathRef.current as string, lookUpPath.path );

            setPath( built );
            ed.revealLine( 1 );











            // const line = ed.getPosition().lineNumber;
            // const text = ed.getModel().getLineContent( line );

            // console.log( 'Pin to search', line, text )
            //
            // const model = editor.getModel();
            //
            // const lines = originalContent.split( '\n' );
            //
            // // console.log( 'lines', lines )
            //
            //
            // const matchIndex = lines.findIndex( line =>
            //     line.toLowerCase().includes( text.toLowerCase() )
            // );
            //
            // const filtered = lines.slice(0, matchIndex + 1);
            //
            // const path = getJsonPathAtLine( model, line );
            // setPath(  )
            // setPath(  )
            //
            // // getLocationAtLine
            // ed.revealLine( 1 );
            // model.setValue(filtered.join('\n'));

            // const position = ed.getPosition();
            //
            // console.log('wefweewfewfwefervrvf')
            // if ( ! position ) {
            //     return;
            // }
            //
            // // code below can be extracted and then passed so that we have meaning and good api that reads
            // const lookUpPath = sourceLocator.locatePathAtLine( position.lineNumber );
            //
            // if ( ! lookUpPath ) {
            //     return;
            // }
            //
            // const built = buildPath( pathRef.current as string, lookUpPath );
            //
            // setPath( built );
            //
        },
    } );
}

// function getJsonPathAtLine( model, targetLine ) {
//     const lines = model.getLinesContent();
//     const stack = [];
//
//     let rootArrayIndex = -1;
//     let inRootArray = false;
//
//     for ( let i = 0; i < targetLine; i++ ) {
//         const raw = lines[i];
//         const trimmed = raw.trim();
//
//         if ( ! trimmed) continue;
//
//         const indent = raw.search(/\S/);
//
//         // Root array opener
//         if (trimmed === '[') {
//             inRootArray = true;
//             continue;
//         }
//
//         // Each { at indent=0 inside root array = new object, bump index
//         if ((trimmed === '{' || trimmed === '{,') && indent <= 2 && inRootArray) {
//             rootArrayIndex++;
//             continue;
//         }
//
//         if (trimmed === '{' || trimmed === '{,') {
//             const parentEntry = stack[stack.length - 1];
//             if (parentEntry && parentEntry.isArray) {
//                 parentEntry.arrayIndex = (parentEntry.arrayIndex ?? -1) + 1;
//             }
//             continue;
//         }
//
//         if (trimmed === '}' || trimmed === '},' || trimmed === ']' || trimmed === '],') continue;
//
//         // Array opener — e.g. "items": [
//         const arrayMatch = trimmed.match(/^"([^"]+)"\s*:\s*\[/);
//         if (arrayMatch) {
//             while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
//             stack.push({ key: arrayMatch[1], indent, isArray: true, arrayIndex: -1 });
//             continue;
//         }
//
//         // Regular key
//         const keyMatch = trimmed.match(/^"([^"]+)"\s*:/);
//         if (!keyMatch) continue;
//
//         while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
//         stack.push({ key: keyMatch[1], indent });
//     }
//
//     // Build path — prepend root array index if present
//     const keyPath = stack.map((entry) => {
//         const suffix = entry.isArray && entry.arrayIndex >= 0 ? `[${entry.arrayIndex}]` : '';
//         return entry.key + suffix;
//     }).join('.');
//
//     if (inRootArray && rootArrayIndex >= 0) {
//         return keyPath ? `${rootArrayIndex}.${keyPath}` : `${rootArrayIndex}`;
//     }
//
//     return keyPath;
// }

// function getJsonPathAtLine(model, targetLine) {
//     const lines = model.getLinesContent();
//     const stack = [];
//
//     for (let i = 0; i < targetLine; i++) {
//         const raw = lines[i];
//         const trimmed = raw.trim();
//
//         if (!trimmed) continue;
//
//         const indent = raw.search(/\S/);
//
//         // Track array items — lines that start with { inside an array
//         if (trimmed === '{' || trimmed === '{,') {
//             const parentEntry = stack[stack.length - 1];
//             if (parentEntry && parentEntry.isArray) {
//                 parentEntry.arrayIndex = (parentEntry.arrayIndex ?? -1) + 1;
//             }
//             continue;
//         }
//
//         if (trimmed === '}' || trimmed === '},' || trimmed === ']' || trimmed === '],') continue;
//
//         // Array opener — e.g. "items": [
//         const arrayMatch = trimmed.match(/^"([^"]+)"\s*:\s*\[/);
//         if (arrayMatch) {
//             while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
//             stack.push({ key: arrayMatch[1], indent, isArray: true, arrayIndex: -1 });
//             continue;
//         }
//
//         // Regular key
//         const keyMatch = trimmed.match(/^"([^"]+)"\s*:/);
//         if (!keyMatch) continue;
//
//         while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
//         stack.push({ key: keyMatch[1], indent });
//     }
//
//     // Build path string, inserting [n] for array parents
//     return stack.map((entry, i) => {
//         const next = stack[i + 1];
//         const suffix = entry.isArray && entry.arrayIndex >= 0 ? `[${entry.arrayIndex}]` : '';
//         return entry.key + suffix;
//     }).join('.');
// }
// function getJsonPathAtLine(model: any, targetLine: any) {
//     const lines = model.getLinesContent();
//     const segments = [];
//
//     for (let i = 0; i < targetLine; i++) {
//         const line = lines[i].trim();
//
//         // Match a JSON key e.g.  "classes": or "settings": {
//         const keyMatch = line.match(/^"([^"]+)"\s*:/);
//         if (!keyMatch) continue;
//
//         const key = keyMatch[1];
//         const indent = lines[i].search(/\S/); // indentation level
//
//         // Pop segments that are at same or deeper indent
//         while (segments.length && segments[segments.length - 1].indent >= indent) {
//             segments.pop();
//         }
//
//         segments.push({ key, indent });
//     }
//
//     return segments.map(s => s.key).join('.');
// }




// function getPathAtLine(model, targetLine) {
//     const lines = model.getLinesContent();
//     const segments = [];
//
//     for (let i = 0; i < targetLine; i++) {
//         const raw = lines[i];
//         const trimmed = raw.trim();
//         if (!trimmed || trimmed.startsWith('#')) continue;
//
//         const keyMatch = trimmed.match(/^([\w-]+)\s*[:{]/);
//         if (!keyMatch) continue;
//
//         const key = keyMatch[1];
//         const indent = raw.search(/\S/);
//
//         while (segments.length && segments[segments.length - 1].indent >= indent) {
//             segments.pop();
//         }
//
//         segments.push({ key, indent });
//     }
//
//     return segments.map(s => s.key).join('.');
// }
