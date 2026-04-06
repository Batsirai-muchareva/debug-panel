"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAction = exports.getActions = exports.registerAction = void 0;
const actions = {};
const registerAction = (action) => {
    actions[action.id] = action;
};
exports.registerAction = registerAction;
const getActions = () => {
    return Object.values(actions);
};
exports.getActions = getActions;
const findAction = (id) => {
    return actions[id];
};
exports.findAction = findAction;
