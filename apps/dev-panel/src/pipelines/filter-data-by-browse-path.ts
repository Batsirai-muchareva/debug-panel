import { hasValue } from '../utils/has-value';

export const filterDataByBrowsePath = ( data: unknown, key: string | null ) => {
    if ( ! key || ! hasValue( data ) ) {
        return data;
    }

    return ( data as Record<string, unknown> )[ key ];
}
