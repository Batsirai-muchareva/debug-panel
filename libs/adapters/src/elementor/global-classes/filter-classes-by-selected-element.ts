import { elementDataExtractor } from "../marionette-element/element-data-extractor";
import type { GlobalClasses } from '../sync/get-redux-store';
import { getSelectedElement } from '../sync/get-selected-element';

export const filterClassesBySelectedElement = (
    globalClasses: GlobalClasses
): GlobalClasses['items'] | null => {
    const element = getSelectedElement();

    if ( ! element ) {
        return null;
    }

    const elementClasses = elementDataExtractor( element ).settings?.classes?.value ?? [];

    const classes = Object.fromEntries(
        Object.entries( globalClasses.items ).filter( ( [ id ] ) => {
            return elementClasses.includes( id )
        } )
    );

    return classes && Object.keys( classes ).length > 0 ? classes : null;
}
