"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlight = void 0;
const define_action_1 = require("../define-action");
exports.highlight = (0, define_action_1.defineAction)({
    id: 'highlight',
    title: 'Highlight',
    icon: 'highlight',
    persist: true,
});
// onExecute( { setState, isActive } ) {
//     setState( ! isActive ); // this should bre default
// },
