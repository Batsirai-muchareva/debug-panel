"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarProvider = exports.Toolbar = exports.useToolbar = void 0;
exports.initToolbarActions = initToolbarActions;
const highlight_1 = require("./actions/highlight");
const actions_registry_1 = require("./actions-registry");
var toolbar_context_1 = require("./context/toolbar-context");
Object.defineProperty(exports, "useToolbar", { enumerable: true, get: function () { return toolbar_context_1.useToolbar; } });
var toolbar_1 = require("./components/toolbar");
Object.defineProperty(exports, "Toolbar", { enumerable: true, get: function () { return toolbar_1.Toolbar; } });
var toolbar_context_2 = require("./context/toolbar-context");
Object.defineProperty(exports, "ToolbarProvider", { enumerable: true, get: function () { return toolbar_context_2.ToolbarProvider; } });
function initToolbarActions() {
    (0, actions_registry_1.registerAction)(highlight_1.highlight);
    // registerAction( fold );
    // registerAction( expand );
    // registerAction( search );
    // registerAction( copy );
    // registerAction( exportAction );
}
