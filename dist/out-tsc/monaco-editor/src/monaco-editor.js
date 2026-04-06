"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@monaco-editor/react");
const editor_options_1 = require("./config/editor-options");
const register_theme_1 = require("./config/register-theme");
const use_editor_events_1 = require("./hooks/use-editor-events");
// import { useEditorHighlight } from './hooks/use-editor-highlight';
const use_editor_value_1 = require("./hooks/use-editor-value");
const apply_initial_folding_1 = require("./setup/apply-initial-folding");
// import { setupActions } from './setup/setup-actions';
// import { setupCommands } from './setup/setup-commands';
const setup_initial_value_1 = require("./setup/setup-initial-value");
const MonacoEditor = ({ data }) => {
    const editorRef = (0, react_1.useRef)(null);
    // const { setSearchActive, isHighlightActive } = useToolbarState();
    // const { path, setPath } = usePath();
    // We might want to use ref to avoid stale data of path
    (0, use_editor_value_1.useEditorValue)(editorRef, data);
    // useEditorHighlight( { editorRef, data, isHighlightActive } );
    (0, use_editor_events_1.useEditorEvents)(editorRef);
    const handleMount = (editor, monaco) => {
        editorRef.current = editor;
        (0, setup_initial_value_1.setupInitialValue)(editor, data);
        (0, apply_initial_folding_1.applyInitialFold)(editor);
        // setupCommands( editor, monaco, setSearchActive );
        // setupActions( editor, setPath, path );
        (0, register_theme_1.registerTheme)(monaco);
    };
    return ((0, jsx_runtime_1.jsx)(react_2.Editor, { language: "json", theme: "panel-dark", options: editor_options_1.editorOptions, onMount: handleMount }));
};
exports.MonacoEditor = MonacoEditor;
