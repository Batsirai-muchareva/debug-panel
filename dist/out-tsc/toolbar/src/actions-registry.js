"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActions = exports.registerAction = void 0;
const actions = {};
const registerAction = (action) => {
    actions[action.id] = action;
};
exports.registerAction = registerAction;
const getActions = () => Object.values(actions);
exports.getActions = getActions;
