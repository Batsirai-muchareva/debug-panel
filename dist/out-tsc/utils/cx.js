"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cx = void 0;
const cx = (...args) => {
    return args
        .flatMap((arg) => typeof arg === 'object' && arg !== null
        ? Object.entries(arg)
            .filter(([, v]) => Boolean(v))
            .map(([k]) => k)
        : arg)
        .filter(Boolean)
        .join(' ');
};
exports.cx = cx;
