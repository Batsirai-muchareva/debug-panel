import React, { memo, useRef } from "react";
import { type editor } from 'monaco-editor';
import { useEffect } from "@wordpress/element";
import { Editor } from "@monaco-editor/react";

import { useEventBus } from "@libs/events";
import { useJsonDelta } from "@libs/json-delta";
import { usePath } from "@libs/path";
import { buildPath } from "@libs/search";
import { sourceLocator } from "@libs/source-locator";
import { useToolbarState } from "@libs/toolbar";

import { useFilteredData } from "@app/context/filtered-data-context";
const HIGHLIGHT_CLASS_NAME = 'highlighted';

export const MonacoEditor = memo( () => {
    const { data } = useFilteredData();
    const { path, setPath } = usePath();
    const { isHighlightActive } = useToolbarState()
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const { highlightLines: highlightRange, scrollToLine } = useJsonDelta( data, isHighlightActive );
    const decorationsRef = useRef<string[]>( [] );
    const prevValueRef = useRef<string>( '' );
    const pathRef = useRef(path);

    const { setSearchActive } = useToolbarState()

    useEffect(() => {
        pathRef.current = path;
    }, [path]);

    // ── Drive value updates imperatively, never via prop ──
    useEffect( () => {
        const editor = editorRef.current;
        if ( !editor ) return;

        const next = JSON.stringify( data, null, 2 );
        if ( next === prevValueRef.current ) return; // no change, skip

        prevValueRef.current = next;
        editor.getModel()?.setValue( next );
    }, [ data ] );

    // ── Highlight + scroll ──
    useEffect( () => {
        const editor = editorRef.current;
        if ( !editor || !highlightRange?.length ) return;

        const startLineNumber = Math.min( ...highlightRange );
        const endLineNumber = Math.max( ...highlightRange );

        decorationsRef.current = editor.deltaDecorations(
            decorationsRef.current,
            [ {
                range: { startLineNumber, startColumn: 1, endLineNumber, endColumn: 1 },
                options: {
                    isWholeLine: true,
                    className: 'highlighted',
                    // className: 'monaco-changed-line',
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
                decorationsRef.current, []
            );
        }, 2000 );

        return () => clearTimeout( timer );
    }, [ scrollToLine, highlightRange ] );

    useEventBus( 'json:fold:all', () => {
        editorRef.current?.getAction( 'editor.foldAll' )?.run();
        editorRef.current?.getAction( 'editor.unfold' )?.run();
    } );

    useEventBus( 'json:expand:all', () => {
        editorRef.current?.getAction( 'editor.unfoldAll' )?.run();
    } );

    return (
        <Editor
            language="json"
            theme="panel-dark"
            // ── no value prop — editor is driven imperatively ──
            options={ {
                readOnly: true,
                minimap: { enabled: false },
                folding: true,
                lineNumbers: "off",
                glyphMargin: false,
                stickyScroll: { enabled: false },
            } }
            onMount={ ( editor, monaco ) => {
                editorRef.current = editor;

                // set initial value
                const initial = JSON.stringify( data, null, 2 );
                prevValueRef.current = initial;
                editor.getModel()?.setValue( initial );

                // initial fold
                setTimeout( () => {
                    editor.getAction( 'editor.foldAll' )?.run();
                    editor.getAction( 'editor.unfold' )?.run();
                }, 50 );

                editor.addCommand(
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
                    () => {
                        setSearchActive( true );
                        // prevent Monaco find widget
                        console.log("Custom search");

                        // open your custom search panel
                        // emit event, set state, etc
                    }
                );

                editor.addCommand(
                    monaco.KeyCode.Escape,
                    () => {
                        console.log("Escape pressed");

                        // close your custom search UI
                        // emit event or set state
                    }
                );

                editor.addAction( {
                    id: 'expand-key-at-cursor',
                    label: 'Expand',
                    contextMenuGroupId: 'navigation',
                    contextMenuOrder: 1,
                    run( ed ) {
                        const position = ed.getPosition();
                        if ( !position ) return;
                        ed.setPosition( { lineNumber: position.lineNumber, column: 1 } );
                        ed.getAction( 'editor.unfoldRecursively' )?.run();
                        ed.revealLineInCenter( position.lineNumber );
                    },
                } );

                editor.addAction( {
                    id: 'pin-search-to-path',
                    label: 'Pin Search from here',
                    contextMenuGroupId: 'navigation',
                    contextMenuOrder: 2,
                    run( ed ) {
                        const position = ed.getPosition();

                        if ( ! position ) {
                            return;
                        }

                        const lookUpPath = sourceLocator.locatePathAtLine( position.lineNumber );

                        if ( ! lookUpPath ) {
                            return;
                        }

                        console.log('inside monoco', pathRef)

                        const builded = buildPath( pathRef.current, lookUpPath );

                        setPath( builded );
                        console.log( "line path", builded );

                        // const path = getJsonPathAtPosition( model, position.lineNumber );
                        // emitEvent( 'json:pin:path', { path } );
                    },
                } );

                monaco.editor.defineTheme( 'panel-dark', {
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
                monaco.editor.setTheme( 'panel-dark' );
            } }
        />
    );
} );
// import React, { memo, useRef } from "react";
// import { type editor } from 'monaco-editor';
// import { useEffect } from "@wordpress/element";
// import { Editor } from "@monaco-editor/react";
//
// import { useEventBus } from "@libs/events";
// import { useJsonDelta } from "@libs/json-delta";
//
// import { useFilteredData } from "@app/context/filtered-data-context";
// const HIGHLIGHT_CLASS_NAME = 'highlighted';
//
// export const MonacoEditor = memo( () => {
//     const { data } = useFilteredData();
//     const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
//     const { highlightLines: highlightRange, scrollToLine } = useJsonDelta( data );
//     const decorationsRef = useRef<string[]>( [] );
//
//     useEventBus( 'json:fold:all', () => {
//         editorRef.current?.getAction("editor.foldAll")?.run();
//         editorRef.current?.getAction("editor.unfold")?.run();
//     } );
//
//     useEventBus( 'json:expand:all', () => {
//         editorRef.current?.getAction( 'editor.unfoldAll' )?.run();
//     } );
//
//
//     // React to changes from useJsonChanges
//     useEffect( () => {
//         const editor = editorRef.current;
//         if ( !editor ) return;
//         // if ( !isHighlightActive.current ) return;
//         if ( !highlightRange ) return;
//
//         console.log( 'highlightRange:', highlightRange );
//         const startLineNumber = Math.min( ...highlightRange );
//         const endLineNumber = Math.max( ...highlightRange );
//
//         const range = {
//             startLineNumber,
//             startColumn: 1,
//             endLineNumber,
//             endColumn: 1,
//         };
//
//         decorationsRef.current = editor.deltaDecorations(
//             decorationsRef.current,
//             [ {
//                 range,
//                 options: {
//                     isWholeLine: true,
//                     className: 'monaco-changed-line',
//                     linesDecorationsClassName: 'monaco-changed-line-gutter',
//                     overviewRuler: {
//                         color: '#7ab8a8',
//                         position: 1,
//                     },
//                 },
//             } ]
//         );
//
//         // scroll to change
//         if ( scrollToLine ) {
//             editor.revealLineInCenter( scrollToLine );
//         }
//
//         // clear after 2s
//         const timer = setTimeout( () => {
//             decorationsRef.current = editor.deltaDecorations(
//                 decorationsRef.current, []
//             );
//         }, 2000 );
//
//         return () => clearTimeout( timer );
//
//     }, [ scrollToLine, highlightRange ] );
//
//     return(
//         <Editor
//             language="json"
//             theme="vs-dark"
//             value={ JSON.stringify( data, null, 2 ) }
//             options={ {
//                 readOnly: true,
//                 minimap: { enabled: false },
//                 folding: true,
//                 lineNumbers: "off",
//                 glyphMargin: false,
//                 stickyScroll: { enabled: false },
//             } }
//             onMount={ ( editor, monaco ) => {
//                 editorRef.current = editor;
//
//                 // prevDataRef.current = actualData.current;
//                 //
//                 // editor.onDidChangeModelContent( () => {
//                 //     // if ( ! states['highlight'] ) return;
//                 //     if ( prevDataRef.current ) {
//                 //         highlightChanges( prevDataRef.current, actualData.current );
//                 //     }
//                 //
//                 //     prevDataRef.current = actualData.current;
//                 // } );
//
//                 console.log(
//                     "I was mounted editor"
//                 )
//                 editor.addAction( {
//                     id: 'expand-key-at-cursor',
//                     label: 'Expand',
//                     contextMenuGroupId: 'navigation',
//                     contextMenuOrder: 1,
//                     run( ed ) {
//                         const position = ed.getPosition();
//                         if ( !position ) return;
//
//                         ed.setPosition( { lineNumber: position.lineNumber, column: 1 } );
//                         ed.getAction( 'editor.unfoldRecursively' )?.run();
//                         ed.revealLineInCenter( position.lineNumber );
//                     },
//                 } );
//
//
//                 monaco.editor.defineTheme( 'panel-dark', {
//                     base: 'vs-dark',
//                     inherit: true,
//                     rules: [
//                         // { token: 'string.key.json',   foreground: '61afef' },  // keys — blue
//                         // { token: 'string.value.json', foreground: 'e06c75' },  // string values — red
//                         // { token: 'number',            foreground: 'd19a66' },  // numbers — orange
//                         // { token: 'keyword.json',      foreground: 'c678dd' },  // true/false/null — purple
//                         // { token: 'delimiter.json',    foreground: 'e5c07b' },  // braces/brackets — yellow
//                     ],
//                     colors: {
//                         'editor.background':              '#0a1515',  // matches your code block bg
//                         'editor.foreground':              '#abb2bf',
//                         'editorLineNumber.foreground':    '#2a5050',
//                         'editor.selectionBackground':     '#1e3535',
//                         'editor.lineHighlightBackground': '#0d1e1e',
//                         'editorCursor.foreground':        '#7ab8a8',
//                         'editorIndentGuide.background':   '#1e3535',
//                         'editorIndentGuide.activeBackground': '#2a4545',
//                         'scrollbarSlider.background':     '#1e353580',
//                         'scrollbarSlider.hoverBackground':'#2a454580',
//
//                         // context menu
//                         'menu.background':               '#0f1e1e',
//                         'menu.foreground':               '#abb2bf',
//                         'menu.selectionBackground':      '#1e3535',
//                         'menu.selectionForeground':      '#eee',
//                         'menu.separatorBackground':      '#1e3535',
//                         'menu.border':                   '#1e3535',
//                     },
//                 } );
//                 monaco.editor.setTheme( 'panel-dark' );
//             } }
//         />
//     )
// })
//
//
//
// // console.log( scrollToLine, highlighterChanges );
// // const highlightChanges = ( prev: any, next: any ) => {
// //     const editor = editorRef.current;
// //     if ( !editor ) return;
// //
// //     const model = editor.getModel();
// //     if ( !model ) return;
// //
// //     // find keys that changed value
// //     const changedKeys = Object.keys( next ).filter( key => {
// //         return JSON.stringify( prev?.[ key ] ) !== JSON.stringify( next[ key ] );
// //     } );
// //
// //     if ( !changedKeys.length ) return;
// //
// //     // find line numbers for changed keys
// //     const ranges: any = [];
// //
// //     changedKeys.forEach( key => {
// //         const matches = model.findMatches(
// //             `"${ key }"`, false, false, true, null, false
// //         );
// //         if ( matches.length ) {
// //             ranges.push( matches[0].range );
// //         }
// //     } );
// //
// //     if ( !ranges.length ) return;
// //
// //     // apply decorations
// //     decorationsRef.current = editor.deltaDecorations(
// //         decorationsRef.current,
// //         ranges.map( (range: any) => ( {
// //             range,
// //             options: {
// //                 isWholeLine: true,
// //                 className: 'monaco-changed-line',
// //                 linesDecorationsClassName: 'monaco-changed-line-gutter',
// //                 overviewRuler: {
// //                     color: '#7ab8a8',
// //                     position: 1,
// //                 },
// //             },
// //         } ) )
// //     );
// //
// //     // scroll to first change
// //     editor.revealLineInCenter( ranges[0].startLineNumber );
// //
// //     // clear decorations after 2s
// //     setTimeout( () => {
// //         decorationsRef.current = editor.deltaDecorations(
// //             decorationsRef.current, []
// //         );
// //     }, 2000 );
// // };
//
// // const position = ed.getPosition();
// // if ( !position ) return;
// //
// // const model = ed.getModel();
// // if ( !model ) return;
// //
// // // get the word at cursor position
// // const word = model.getWordAtPosition( position );
// // if ( !word ) return;
// //
// // ed.setPosition( { lineNumber: position.lineNumber, column: 1 } );
// // ed.getAction( 'editor.unfold' )?.run();
// // ed.revealLineInCenter( position.lineNumber );
// // onMount={ ( editor ) => {
// //     editorRef.current = editor;
// // }}
// //
// //         // const applyInitialFolding = () => {
// //         //     setTimeout(() => {
// //         //         editor.getAction("editor.foldAll")?.run();
// //         //         editor.getAction("editor.unfold")?.run();
// //         //         setTimeout(() => setReady(true), 300);
// //         //         hasInitialFold.current = true;
// //         //     }, 50);
// //         // };
// //         //
// //         // applyInitialFolding();
// //         //
// //         // editor.onDidChangeModelContent(() => {
// //         //     // Only fold on the very first load, never on data updates
// //         //     if (!hasInitialFold.current) {
// //         //         applyInitialFolding();
// //         //     }
// //         // });
// //     }}
// //     onMount={(editor) => {
// //         const applyFolding = () => {
// //             setTimeout(() => {
// //                 // Fold everything first
// //                 editor.getAction("editor.foldAll")?.run();
//
// //                 // Then only unfold the outermost level (level 1)
// //                 editor.getAction("editor.unfold")?.run();
// //                 setTimeout(()=>setReady(true),300)
//
//
// //             }, 50);
// //         };
//
// //         applyFolding();
//
// //         editor.onDidChangeModelContent(() => {
// //             applyFolding();
// //         });
// //     }}
// // />
// // </div>
// // useEffect( () => {
// //     // if (! monaco) {
// //     //     console.log('here is the monaco instance:', monaco);
// //     //
// //     //     return
// //     // }
// //
// //     // monaco.editor.revealLineInCenter()
// //     // const editor = editorRef.current;
// //     //
// //     // if ( ! editor ) {
// //     //     return;
// //     // }
// //
// //
// //     //
// //     // const id = setTimeout(() => {
// //     //     if ( isCollapseActive ) {
// //     //         editor.getAction("editor.foldAll")?.run();
// //     //         editor.getAction("editor.unfold")?.run();
// //     //     } else {
// //     //         editor.getAction("editor.unfoldAll")?.run();
// //     //     }
// //     // }, 0 );
// //     //
// //     // return () => clearTimeout( id );
// // }, [ isCollapseActive ] );
//
// // monaco.
// // act on changes of isCollapseActive to collapse or uncollapse
//
// // return <Editor
// //     height="90vh"
// //     language="json"
// //     theme="vs-dark"
// //     value={JSON.stringify(data, null, 2)}
// //     options={{
// //         readOnly: true,
// //         minimap: { enabled: false },
// //         folding: true,
// //         lineNumbers: "off",
// //         glyphMargin: false,
// //     }}
// //     onMount={(editor) => {
// //         setTimeout(() => {
// //             editor.getAction("editor.foldAll")?.run();
// //             editor.getAction("editor.unfoldLevel1")?.run();
// //         }, 0);
// //     }}
// // />
// // return <Editor
// //     height="90vh"
// //     language="json"
// //     theme="vs-dark"
// //     value={JSON.stringify(data, null, 2)}
// //     options={{
// //         readOnly: true,
// //         minimap: { enabled: false },
// //         folding: true,
// //         lineNumbers: "off", // cleaner for read-only JSON
// //         glyphMargin: false,
// //
// //     }}
// //     onMount={(editor) => {
// //
// //         // 1. Fold everything
// //         editor.getAction("editor.foldAll")?.run();
// //
// //         // 2. Wait a tick (Monaco needs layout ready)
// //         setTimeout(() => {
// //             const model = editor.getModel();
// //             if (!model) return;
// //
// //             const lineCount = model.getLineCount();
// //
// //             // 3. Unfold first-level blocks
// //             // Heuristic: unfold lines with 0 indentation (top-level keys)
// //             for (let line = 1; line <= lineCount; line++) {
// //                 const content = model.getLineContent(line);
// //
// //                 // Match top-level JSON keys: no leading spaces, starts with "
// //                 if (/^"\w+/.test(content.trimStart()) && !content.startsWith(" ")) {
// //                     editor.setPosition({ lineNumber: line, column: 1 });
// //                     editor.getAction("editor.unfold")?.run();
// //                 }
// //             }
// //         }, 100);
// //         // setTimeout(() => {
// //         //     // editor.getAction("editor.foldAll")?.run();
// //         // }, 0);
// //     }}
// // />
// // return <Editor height="90vh" defaultLanguage="json" value={ data as any } />;
//
// //
// //             // readOnly: true,
// //             // minimap: { enabled: false },
// //             // folding: true,
// //             // readOnly: true,
// //             // minimap: { enabled: false },
// //             // folding: true,
// //             // lineNumbers: "on",
// //             // readOnly: true,
// //             // minimap: { enabled: false }, // optional, cleaner UI
// //             // scrollBeyondLastLine: false, // optional polish
//
//
// /**
//  *
//  * editor.action.setSelectionAnchor
// monaco-editor.tsx:58 editor.action.selectToBracket
// monaco-editor.tsx:58 editor.action.jumpToBracket
// monaco-editor.tsx:58 editor.action.removeBrackets
// monaco-editor.tsx:58 editor.action.clipboardCopyWithSyntaxHighlightingAction
// monaco-editor.tsx:58 editor.action.marker.next
// monaco-editor.tsx:58 editor.action.marker.prev
// monaco-editor.tsx:58 editor.action.marker.nextInFiles
// monaco-editor.tsx:58 editor.action.marker.prevInFiles
// monaco-editor.tsx:58 editor.action.showContextMenu
// monaco-editor.tsx:58 cursorUndo
// monaco-editor.tsx:58 cursorRedo
// monaco-editor.tsx:58 actions.find
// monaco-editor.tsx:58 editor.action.nextMatchFindAction
// monaco-editor.tsx:58 editor.action.previousMatchFindAction
// monaco-editor.tsx:58 editor.action.startFindReplaceAction
// monaco-editor.tsx:58 editor.actions.findWithArgs
// monaco-editor.tsx:58 actions.findWithSelection
// monaco-editor.tsx:58 editor.action.nextSelectionMatchFindAction
// monaco-editor.tsx:58 editor.action.previousSelectionMatchFindAction
// monaco-editor.tsx:58 editor.unfold
// monaco-editor.tsx:58 editor.unfoldRecursively
// monaco-editor.tsx:58 editor.fold
// monaco-editor.tsx:58 editor.foldRecursively
// monaco-editor.tsx:58 editor.toggleFoldRecursively
// monaco-editor.tsx:58 editor.foldAll
// monaco-editor.tsx:58 editor.unfoldAll
// monaco-editor.tsx:58 editor.foldAllBlockComments
// monaco-editor.tsx:58 editor.foldAllMarkerRegions
// monaco-editor.tsx:58 editor.unfoldAllMarkerRegions
// monaco-editor.tsx:58 editor.foldAllExcept
// monaco-editor.tsx:58 editor.unfoldAllExcept
// monaco-editor.tsx:58 editor.toggleFold
// monaco-editor.tsx:58 editor.gotoParentFold
// monaco-editor.tsx:58 editor.gotoPreviousFold
// monaco-editor.tsx:58 editor.gotoNextFold
// monaco-editor.tsx:58 editor.createFoldingRangeFromSelection
// monaco-editor.tsx:58 editor.removeManualFoldingRanges
// monaco-editor.tsx:58 editor.toggleImportFold
// monaco-editor.tsx:58 editor.foldLevel1
// monaco-editor.tsx:58 editor.foldLevel2
// monaco-editor.tsx:58 editor.foldLevel3
// monaco-editor.tsx:58 editor.foldLevel4
// monaco-editor.tsx:58 editor.foldLevel5
// monaco-editor.tsx:58 editor.foldLevel6
// monaco-editor.tsx:58 editor.foldLevel7
// monaco-editor.tsx:58 editor.action.fontZoomIn
// monaco-editor.tsx:58 editor.action.fontZoomOut
// monaco-editor.tsx:58 editor.action.fontZoomReset
// monaco-editor.tsx:58 editor.action.resetSuggestSize
// monaco-editor.tsx:58 editor.action.inlineSuggest.toggleShowCollapsed
// monaco-editor.tsx:58 editor.action.debugEditorGpuRenderer
// monaco-editor.tsx:58 editor.action.showHover
// monaco-editor.tsx:58 editor.action.showDefinitionPreviewHover
// monaco-editor.tsx:58 editor.action.hideHover
// monaco-editor.tsx:58 editor.action.indentUsingTabs
// monaco-editor.tsx:58 editor.action.indentUsingSpaces
// monaco-editor.tsx:58 editor.action.changeTabDisplaySize
// monaco-editor.tsx:58 editor.action.detectIndentation
// monaco-editor.tsx:58 expandLineSelection
// monaco-editor.tsx:58 editor.action.openLink
// monaco-editor.tsx:58 editor.action.insertCursorAbove
// monaco-editor.tsx:58 editor.action.insertCursorBelow
// monaco-editor.tsx:58 editor.action.insertCursorAtEndOfEachLineSelected
// monaco-editor.tsx:58 editor.action.addSelectionToNextFindMatch
// monaco-editor.tsx:58 editor.action.addSelectionToPreviousFindMatch
// monaco-editor.tsx:58 editor.action.moveSelectionToNextFindMatch
// monaco-editor.tsx:58 editor.action.moveSelectionToPreviousFindMatch
// monaco-editor.tsx:58 editor.action.selectHighlights
// monaco-editor.tsx:58 editor.action.addCursorsToBottom
// monaco-editor.tsx:58 editor.action.addCursorsToTop
// monaco-editor.tsx:58 editor.action.focusNextCursor
// monaco-editor.tsx:58 editor.action.focusPreviousCursor
// monaco-editor.tsx:58 editor.action.smartSelect.expand
// monaco-editor.tsx:58 editor.action.smartSelect.shrink
// monaco-editor.tsx:58 editor.action.forceRetokenize
// monaco-editor.tsx:58 editor.action.wordHighlight.trigger
// monaco-editor.tsx:58 editor.action.inspectTokens
// monaco-editor.tsx:58 editor.action.gotoLine
// monaco-editor.tsx:58 editor.action.quickCommand
// monaco-editor.tsx:58 editor.action.toggleHighContrast
//  *
//  */
