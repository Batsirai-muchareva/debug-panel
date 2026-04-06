"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, message, options = {}) => {
    var _a;
    const retryableCodes = ['NETWORK_ERROR', 'HTTP_ERROR', 'SERVER_ERROR'];
    const code = errorCodeFromStatus(status);
    return Object.assign({ code,
        message, retryable: (_a = options.retryable) !== null && _a !== void 0 ? _a : retryableCodes.includes(code) }, options);
};
exports.createError = createError;
const errorCodeFromStatus = (status) => {
    if (status === 401 || status === 403) {
        return 'AUTH_ERROR';
    }
    if (status === 400 || status === 422) {
        return 'VALIDATION_ERROR';
    }
    if (status >= 500) {
        return 'SERVER_ERROR';
    }
    return 'HTTP_ERROR';
};
