interface ExtendedWindow extends Window {
    elementor: {
        config: {
            atomic: {
                interactions_schema: Record<string, unknown>;
            }
        };
    }
}

export const getInteractionsSchema = () => {
    const extendedWindow = window as unknown as ExtendedWindow;

    return extendedWindow.elementor.config.atomic.interactions_schema
}
