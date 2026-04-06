"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementorCommands = void 0;
const getElementorCommands = () => {
    var _a;
    const extendedWindow = window;
    if (!((_a = extendedWindow.$e) === null || _a === void 0 ? void 0 : _a.commands)) {
        throw Error('Elementor API is not available');
    }
    return extendedWindow.$e.commands;
};
exports.getElementorCommands = getElementorCommands;
