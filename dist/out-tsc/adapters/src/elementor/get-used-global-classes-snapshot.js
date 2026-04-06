"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsedGlobalClassesSnapshot = void 0;
const data_extractor_1 = require("./marionette-element/data-extractor");
const get_selected_element_1 = require("./sync/get-selected-element");
const STORAGE_KEY = 'elementor-global-classes';
const getUsedGlobalClassesSnapshot = () => {
    var _a, _b, _c, _d;
    const element = (0, get_selected_element_1.getSelectedElement)();
    if (!element) {
        return null;
    }
    const usedGlobalClasses = (_c = (_b = (_a = (0, data_extractor_1.dataExtractor)(element).settings) === null || _a === void 0 ? void 0 : _a.classes) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : [];
    const parsed = JSON.parse((_d = localStorage.getItem(STORAGE_KEY)) !== null && _d !== void 0 ? _d : '[]');
    return parsed.filter((globalClasses) => usedGlobalClasses.includes(globalClasses.id));
};
exports.getUsedGlobalClassesSnapshot = getUsedGlobalClassesSnapshot;
