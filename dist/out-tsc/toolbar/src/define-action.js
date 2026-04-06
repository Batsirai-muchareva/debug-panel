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
exports.defineAction = defineAction;
const notification_1 = require("@debug-panel/notification");
function defineAction(action) {
    return Object.assign(Object.assign({}, action), { onExecute: (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                if (!action.onExecute) {
                    ctx.setState(!ctx.isActive);
                }
                if (action.onExecute) {
                    yield action.onExecute(ctx);
                }
                if ((_b = (_a = action === null || action === void 0 ? void 0 : action.options) === null || _a === void 0 ? void 0 : _a.success) === null || _b === void 0 ? void 0 : _b.message) {
                    (0, notification_1.showNotification)({ message: (_d = (_c = action === null || action === void 0 ? void 0 : action.options) === null || _c === void 0 ? void 0 : _c.success) === null || _d === void 0 ? void 0 : _d.message });
                }
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Unknown error";
                (0, notification_1.showNotification)({ message, type: "error" });
            }
        }) });
}
