type Handler = ( element: MarionetteElement ) => void;

export type StyleDefinition = {
    id: string;
    label: string;
    variants: Array<{
        meta: { breakpoint: string; state: string };
        props: Record<string, unknown>;
    }>;
}

export type ElementData = {
    id: string;
    elType: string;
    widgetType?: string;
    settings: Record<string, any>;
    interactions: [];
    elements?: ElementData[];
    styles: Record<string, StyleDefinition>;
}

export type MarionetteElement = {
    id: string;
    cid: string;
    model: MarionetteElementModel;
    view?: unknown;
    parent?: MarionetteElement;
    children?: MarionetteElement[];
    getContainer?: () => MarionetteElement;
}

export type EventListeners = {
    on: ( event: string, handler: Handler ) => void;
    off: ( event: string, handler: Handler ) => void;
}

type MarionetteElementModel =  EventListeners & {
    get: ( key: string ) => EventListeners;
    toJSON: ( options?: { remove?: string[] } ) => ElementData;
}

export type ExtendedWindow = Window & {
    elementor: {
        selection: {
            getElements: () => MarionetteElement[]
        }
    }
}

export function getSelectedElement() {
    const extendedWindow = window as unknown as ExtendedWindow;

    return extendedWindow.elementor.selection.getElements()[0]
}
