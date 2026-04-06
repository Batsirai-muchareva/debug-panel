interface ExtendedWindow extends Window {
    elementor: {
        config: {
            document: {
                id: string
            }
        };
    }
}

export function getPostId() {
    const extendedWindow = window as unknown as ExtendedWindow;

    return extendedWindow.elementor.config.document.id
}
