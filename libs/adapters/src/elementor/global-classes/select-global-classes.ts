import type { ReduxState } from '../sync/get-redux-store';

export const selectGlobalClasses = ( state: ReduxState ) => {
    return state?.globalClasses?.data;
}
