interface ExtendedWindow extends Window {
    elementor: {
        config: {
            atomic: {
                styles_schema: Record<string, unknown>;
            }
        };
    }
}

export const getAtomicStyleSchema = () => {
    const extendedWindow = window as unknown as ExtendedWindow;

    return extendedWindow.elementor.config.atomic.styles_schema
}
