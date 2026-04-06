interface ExtendedWindow extends Window {
    elementor: {
        widgetsCache: Record<string, {
            atomic: boolean;
            atomic_props_schema: Record<string, unknown>;
        }>;
    }
}

export const getAtomicElementsSchema = () => {
    const extendedWindow = window as unknown as ExtendedWindow;

    return Object.fromEntries(
        Object.entries( extendedWindow.elementor.widgetsCache )
            .filter( ( [_, { atomic } ]) => atomic )
            .map( ( [ key, { atomic_props_schema } ] ) =>
                [ key, { ...atomic_props_schema } ]
            )
    );
}
