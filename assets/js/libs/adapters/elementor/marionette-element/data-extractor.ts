import { MarionetteElement } from "../sync/get-selected-element";

const EXCLUDED_KEYS = [ 'defaultEditSettings', 'editSettings' ]

export function dataExtractor( element: MarionetteElement ) {
    return element.model.toJSON( { remove: EXCLUDED_KEYS } );
}
