import { Provider } from './types';
export declare const providerRegistry: {
    add: <TData>(provider: Provider<TData>) => void;
    seal: () => void;
    getAll: () => Provider[];
    find: (providerId: string) => Provider<unknown> | undefined;
    findVariant: (variantId: string) => import('./types').Variant<unknown> | undefined;
};
