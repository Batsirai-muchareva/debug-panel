import type { MarionetteElement } from "../sync/get-selected-element";

const EXCLUDED_KEYS = [ 'defaultEditSettings', 'editSettings' ]

export function elementDataExtractor( element: MarionetteElement ) {
    return element.model.toJSON( { remove: EXCLUDED_KEYS } );
}
