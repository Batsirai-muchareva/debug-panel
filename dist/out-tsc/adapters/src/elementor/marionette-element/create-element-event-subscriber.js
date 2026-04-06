"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElementEventSubscriber = void 0;
const createElementEventSubscriber = () => ({
    subscribe: (element, callback) => {
        const handlers = [];
        const registerHandler = (target, event) => {
            const handler = () => {
                callback(element);
            };
            target.on(event, handler);
            handlers.push({ target, event, handler });
        };
        registerHandler(element.model, 'change');
        registerHandler(element.model, 'destroy');
        registerHandler(element.model.get('settings'), 'change');
        return () => {
            handlers.forEach(({ target, event, handler }) => {
                target.off(event, handler);
            });
            handlers.length = 0;
        };
    }
});
exports.createElementEventSubscriber = createElementEventSubscriber;
