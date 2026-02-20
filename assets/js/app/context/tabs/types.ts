import { Provider, Variant } from "@app/types";

export type VariantTab = Pick<Variant, 'id' | 'label'>;

export type Tab = {
    id: Provider['id'];
    title: Provider['title'];
    variants: VariantTab[];
};

export type ContextState = {
    activeProvider: Tab['id'];
    activeVariant: VariantTab['id'];
    tabs: Tab[];
    setProvider: ( tabId: Tab['id'] ) => void;
    setVariant: ( variantId: VariantTab['id'] ) => void;
    getActiveIndex: () => number;
}
