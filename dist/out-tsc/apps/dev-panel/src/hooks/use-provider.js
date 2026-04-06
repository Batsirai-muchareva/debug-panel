"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProvider = void 0;
const element_1 = require("@wordpress/element");
const providers_1 = require("@debug-panel/providers");
const tabs_1 = require("@debug-panel/tabs");
const useProvider = () => {
    const { id: variantId } = (0, tabs_1.useTabs)();
    const [data, setData] = (0, element_1.useState)(undefined);
    (0, element_1.useEffect)(() => {
        const variant = providers_1.providerRegistry.findVariant(variantId);
        if (!variant) {
            throw new Error(`[DevPanel] Variant "${variantId}" not found`);
        }
        const source = variant.source;
        /** What is the meaning of start here **/
        source.subscribe((incoming) => setData(incoming !== null && incoming !== void 0 ? incoming : undefined));
        return () => source.unsubscribe();
    }, [variantId]);
    return data;
};
exports.useProvider = useProvider;
