import { GlobalClasses } from "./elementor-adapter";
import { dataExtractor } from "./marionette-element/data-extractor";
import { getSelectedElement } from "./sync/get-selected-element";

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
