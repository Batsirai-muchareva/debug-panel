import { getReduxStore } from '../sync/get-redux-store';
import { filterClassesBySelectedElement } from './filter-classes-by-selected-element';
import { selectGlobalClasses } from './select-global-classes';

export const getClasses = () => {
    const store = getReduxStore();

    const classes = selectGlobalClasses( store.__getState() );

    if ( ! classes ) {
        return null;
    }

    return filterClassesBySelectedElement( classes );
}
