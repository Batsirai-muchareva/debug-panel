import { getSelectedElement } from "./sync/get-selected-element";
import { dataExtractor } from "./marionette-element/data-extractor";
import { GlobalClasses } from "./elementor-adapter";

const STORAGE_KEY = 'elementor-global-classes';

export const getUsedGlobalClassesSnapshot = (): GlobalClasses | null => {
    const element = getSelectedElement();

    if ( ! element ) {
        return null;
    }

    const usedGlobalClasses = dataExtractor( element ).settings?.classes?.value ?? [];
    const parsed = JSON.parse( localStorage.getItem( STORAGE_KEY ) ?? '[]' );

    return parsed.filter( ( globalClasses: { id: string } ) =>
        usedGlobalClasses.includes( globalClasses.id )
    );
}
