import { dataExtractor } from "../marionette-element/data-extractor";
import { getSelectedElement, type GlobalClasses } from '../sync/get-selected-element';


export const getElementGlobalClasses = ( globalClasses: GlobalClasses ): GlobalClasses | null => {
    const element = getSelectedElement();

    if ( ! element ) {
        return null;
    }

    const usedGlobalClasses = dataExtractor( element ).settings?.classes?.value ?? [];

    return globalClasses.filter( ( globalClasses: { id: string } ) =>
        usedGlobalClasses.includes( globalClasses.id )
    );
}
