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
exports.http = void 0;
const elementor_adapter_1 = require("../elementor/elementor-adapter");
const http = () => {
    const { nonce, baseUrl } = elementor_adapter_1.elementorAdapter.settings;
    return {
        post: (params) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            params.append('nonce', nonce);
            const response = yield fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            });
            if (!response.ok) {
                throw {
                    code: "HTTP_ERROR",
                    message: (_a = yield response.text()) !== null && _a !== void 0 ? _a : `HTTP error! status: ${response.status}`,
                    status: response.status,
                };
            }
            return {
                data: yield response.json()
            };
        })
    };
};
exports.http = http;
