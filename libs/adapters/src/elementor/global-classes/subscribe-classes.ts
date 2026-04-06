import { getReduxStore, type GlobalClasses } from '../sync/get-redux-store';
import { filterClassesBySelectedElement } from './filter-classes-by-selected-element';
import { selectGlobalClasses } from './select-global-classes';

export const subscribeClasses = ( notify: ( classes: GlobalClasses['items'] | null ) => void ) => {
    const store = getReduxStore();

    return store.__subscribeWithSelector(
        selectGlobalClasses,
        ( classes ) => {
            notify( filterClassesBySelectedElement( classes ) )
        }
    )
}
