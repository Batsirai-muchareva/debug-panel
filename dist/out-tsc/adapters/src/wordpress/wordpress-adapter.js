"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordPressAdapter = void 0;
const elementor_adapter_1 = require("../elementor/elementor-adapter");
const create_error_1 = require("./create-error");
const http_1 = require("./http");
const isHttpError = (error) => typeof error === "object" &&
    error !== null &&
    'status' in error &&
    'message' in error;
const createWordPressAdapter = () => {
    const api = (0, http_1.http)();
    return {
        fetch: (_a) => __awaiter(void 0, [_a], void 0, function* ({ post_id, meta_key }) {
            try {
                const params = new URLSearchParams({
                    action: elementor_adapter_1.elementorAdapter.settings.databaseAjaxAction,
                    post_id,
                    meta_key,
                });
                const response = yield api.post(params);
                if (response.data.success) {
                    return {
                        success: true,
                        data: response.data.data.schema,
                    };
                }
            }
            catch (e) {
                if (isHttpError(e)) {
                    return {
                        success: false,
                        error: (0, create_error_1.createError)(e.status, e.message)
                    };
                }
            }
        }),
    };
};
exports.wordPressAdapter = createWordPressAdapter();
