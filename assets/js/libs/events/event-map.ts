interface ElementEvents {
    'element:selected': void;
    'element:deselected': void;
    'element:updated': {
        elementId: string;
        changes: Record<string, unknown>;
    };
}

interface StyleSchema {
    'style-schema:clicked': {
        line: number;
    }
}

interface BrowseView {
    'browse:key:selected': {
        key: string
    }
}

interface WindowEvents {
    'window:mousemove': {
        clientX: number;
        clientY: number;
    };
    'window:mouseup': void;
}

interface Notification {
    'notification:show': {
        id: string;
        message: string;
        type: string;
    },
    'notification:hide': {
        id: string;
    },
}

interface PopoverEvents {
    'popover:opened': {
        popoverId: string;
    };
    'popover:closed': {
        popoverId: string;
    };
    'popover:dragging': void;
    'popover:resizing': void;
}

interface TabEvents {
    'tab:changed': {
        tabId: string;
        previousTabId: string;
    };
    'subtab:changed': {
        tabId: string;
        subTabId: string;
        previousSubTabId: string;
    };
}

interface SuggestionEvents {
    'suggestion:select': void;
}

export interface EventMap extends
    ElementEvents,
    PopoverEvents,
    TabEvents,
    SuggestionEvents,
    WindowEvents,
    Notification,
    StyleSchema,
    BrowseView
{
    'document:published': void;
    'searching': void;
}
