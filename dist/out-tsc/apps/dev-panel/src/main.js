"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./styles.scss");
const _bootstrap_1 = require("@bootstrap");
const providers_1 = require("@debug-panel/providers");
const app_1 = require("./app/app");
const dom_ready_1 = require("./dom-ready");
const get_slot_id_1 = require("./sync/get-slot-id");
const toolbar_1 = require("@debug-panel/toolbar");
(0, dom_ready_1.default)(() => {
    (0, _bootstrap_1.initProviders)();
    (0, toolbar_1.initToolbarActions)();
    window.dispatchEvent(new CustomEvent('dev-panel:init'));
    providers_1.providerRegistry.seal();
    const root = (0, client_1.createRoot)(document.getElementById((0, get_slot_id_1.getSlotId)()));
    root.render((0, react_1.createElement)(app_1.default));
});
