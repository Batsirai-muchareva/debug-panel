import type { editor } from 'monaco-editor';

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false },
    folding: true,
    lineNumbers: 'off',
    glyphMargin: false,
    stickyScroll: { enabled: false },
};

/**
 * export const useEditorHighlight = (editorRef, data) => {
 *   const { isHighlightActive } = useToolbarState();
 *   const { highlightLines, scrollToLine } = useJsonDelta(data, isHighlightActive);
 *   const decorationsRef = useRef([]);
 *
 *   useEffect(() => {
 *     const editor = editorRef.current;
 *     if (!editor || !highlightLines?.length) return;
 *
 *     const start = Math.min(...highlightLines);
 *     const end = Math.max(...highlightLines);
 *
 *     decorationsRef.current = editor.deltaDecorations(
 *       decorationsRef.current,
 *       [{
 *         range: { startLineNumber: start, startColumn: 1, endLineNumber: end, endColumn: 1 },
 *         options: { isWholeLine: true, className: 'highlighted' },
 *       }]
 *     );
 *
 *     if (scrollToLine) {
 *       editor.revealLineInCenter(scrollToLine);
 *     }
 *
 *     const timer = setTimeout(() => {
 *       decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
 *     }, 2000);
 *
 *     return () => clearTimeout(timer);
 *   }, [highlightLines, scrollToLine]);
 * };
 * };
 *
 *
 *
 *
 *
 *
 *
 *
 * import { useEffect, useRef } from "@wordpress/element";
 * import { useToolbarState } from "@libs/toolbar";
 * import { useJsonDelta } from "@libs/json-delta";
 *
 * export const useEditorHighlight = (editorRef, data) => {
 *   const { isHighlightActive } = useToolbarState();
 *   const { highlightLines, scrollToLine } = useJsonDelta(
 *     data,
 *     isHighlightActive
 *   );
 *
 *   const decorationsRef = useRef([]);
 *
 *   useEffect(() => {
 *     const editor = editorRef.current;
 *     if (!editor || !highlightLines?.length) return;
 *
 *     const start = Math.min(...highlightLines);
 *     const end = Math.max(...highlightLines);
 *
 *     decorationsRef.current = editor.deltaDecorations(
 *       decorationsRef.current,
 *       [
 *         {
 *           range: {
 *             startLineNumber: start,
 *             startColumn: 1,
 *             endLineNumber: end,
 *             endColumn: 1,
 *           },
 *           options: {
 *             isWholeLine: true,
 *             className: "highlighted",
 *             linesDecorationsClassName: "monaco-changed-line-gutter",
 *             overviewRuler: { color: "#7ab8a8", position: 1 },
 *           },
 *         },
 *       ]
 *     );
 *
 *     if (scrollToLine) {
 *       editor.revealLineInCenter(scrollToLine);
 *     }
 *
 *     const timer = setTimeout(() => {
 *       decorationsRef.current = editor.deltaDecorations(
 *         decorationsRef.current,
 *         []
 *       );
 *     }, 2000);
 *
 *     return () => clearTimeout(timer);
 *   }, [highlightLines, scrollToLine]);
 * };
 *
 *
 *
 *
 *
 *
 *
 */
