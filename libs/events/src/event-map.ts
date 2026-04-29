export type EventMap = {
    'init': void;
    'element:selected': void;
    'element:deselected': void;
    'document:published': void;
    'json:fold:all': void;
    'json:expand:all': void;

    'drag:start': void;
    'drag:move': void;
    'drag:end': void;

    'resize:start': void;
    'resize:move': void;
    'resize:end': void;

    'window:mousemove': { clientX: number; clientY: number; };
    'window:mouseup': void;
    'notification:show': { id: string; message: string; type: string; };
    'notification:hide': { id: string; },

    'actions:clip:hide': string[];

    'text-field:focus': { id: string };
    'browser:key:selected': void;
    'browse:key:clear': void;
    'pin-popover:update': void;
}
