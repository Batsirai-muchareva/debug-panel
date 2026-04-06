"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataExtractor = dataExtractor;
const EXCLUDED_KEYS = ['defaultEditSettings', 'editSettings'];
function dataExtractor(element) {
    return element.model.toJSON({ remove: EXCLUDED_KEYS });
}
