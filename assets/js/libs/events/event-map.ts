export interface EventMap {
    'element:selected': void;
    'element:deselected': void;
    // 'element:updated': { elementId: string; changes: Record<string, unknown>; };

    'document:published': void;

    // 'searching': void;
    'json:fold:all': void;
    'json:expand:all': void;
    // 'popover:opened': { popoverId: string; };
    // 'popover:closed': { popoverId: string; };
    'popover:dragging': void;
    'popover:resizing': void;
    // 'style-schema:clicked': { line: number; }
    // 'browse:key:selected': { key: string };
    'window:mousemove': { clientX: number; clientY: number; };
    'window:mouseup': void;
    'notification:show': { id: string; message: string; type: string; };
    'notification:hide': { id: string; },
    // 'tab:changed': { tabId: string; previousTabId: string; };
    // 'subtab:changed': {
    //     tabId: string;
    //     subTabId: string;
    //     previousSubTabId: string;
    // };
    // 'suggestion:selected': void;
    // 'search:query:changed': string;
    // 'search:path:changed': string;
    // 'search:keydown:arrow': 'down' | 'up';
    // 'search:commit': void;
    // 'search:keydown:arrow-down': void;
    // 'search:recents:changed': string[];
}
