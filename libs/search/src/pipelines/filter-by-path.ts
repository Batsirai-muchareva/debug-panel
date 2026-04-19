import { dynamicSegments } from '@debug-panel/path';


export const filterByPath = ( data: string[], path: string ) => {
    if ( ! path ) return data;

    if ( ! dynamicSegments.isTemplate( path ) ) {
        const prefix = path.toLowerCase() + '.';
        return data.filter( p => p.toLowerCase().startsWith( prefix ) );
    }

    return data.filter( p => dynamicSegments.matchesTemplatePrefix( path, p ) );
};

