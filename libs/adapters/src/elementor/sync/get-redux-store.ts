export type GlobalClasses = {
    items: Record<string, unknown>;
    order: string[];
}

export type ReduxState = {
    globalClasses: {
        data: GlobalClasses;
    };
};

interface ElementorStore {
    __getStore: () => unknown | null;
    __getState: () => ReduxState;
    __subscribeWithSelector: <T>(
        selector: ( state: ReduxState ) => T,
        listener: ( state: T ) => void
    ) => () => void;
}

interface ExtendedWindow extends Window {
    elementorV2: {
        store: ElementorStore;
    }
}

export const getReduxStore = () => {
    const extendedWindow = window as unknown as ExtendedWindow;

    return extendedWindow.elementorV2.store;
}
