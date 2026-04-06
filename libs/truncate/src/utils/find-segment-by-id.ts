import type { Segment } from '../types';

export const findSegmentById = ( items: Segment[], id?: string ) => {
    if ( ! id ) {
        throw Error( 'ID is required for segments lookup' )
    }

    if ( items.length <= 0 ) {
        throw Error( 'Segments are required for lookup' )
    }

    const found = items.find( ( item ) => item.id === id );

    if ( ! found ) {
        throw Error( 'Label text not found in path items' )
    }

    return found
}
