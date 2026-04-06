"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerRegistry = void 0;
const providers = new Map();
let sealed = false;
const add = (provider) => {
    assertNotSealed(provider.id);
    if (providers.has(provider.id)) {
        throw new Error(`[DevPanel] Provider ${provider.id} is already registered`);
    }
    // guard against duplicate variant ids across providers
    for (const variant of provider.variants) {
        if (findVariant(variant.id)) {
            throw new Error(`[DevPanel] Variant "${variant.id}" is already registered`);
        }
    }
    providers.set(provider.id, provider);
};
const assertNotSealed = (id) => {
    if (sealed) {
        throw new Error(`[DevPanel] Cannot register "${id}" after init. ` +
            `Register inside the "dev-panel:init" event.`);
    }
};
const getAll = () => {
    return [...providers.values()];
};
const find = (providerId) => {
    return providers.get(providerId);
};
const findVariant = (variantId) => {
    for (const provider of providers.values()) {
        const variant = provider.variants.find(({ id }) => id === variantId);
        if (variant) {
            return variant;
        }
    }
    return undefined;
};
const seal = () => {
    sealed = true;
};
exports.providerRegistry = { add, seal, getAll, find, findVariant };
