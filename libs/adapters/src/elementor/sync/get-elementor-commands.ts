export type EventCallback = ( component: unknown, command: string ) => void;

interface ElementorWindow extends Window {
    $e: {
        commands: {
            on: ( event: string, callback: EventCallback ) => void;
            off: ( event: string, callback: EventCallback ) => void;
            run: ( command: string, payload?: any ) => void;
        }
    };
}

export const getElementorCommands = () => {
    const extendedWindow = window as unknown as ElementorWindow;

    if ( ! extendedWindow.$e?.commands ) {
        throw Error('Elementor API is not available');
    }

    return extendedWindow.$e.commands;
}
