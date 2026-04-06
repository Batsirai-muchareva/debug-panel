import { traverseData } from "./traverse-data";

const pathIndexes: string[] = [];

const reset = () => {
    pathIndexes.length = 0;
}

const build = ( data: unknown, includePrimitivesPath = false ) => {
    reset();

    traverseData( data, ( path ) => {
        pathIndexes.push( path );
    }, { includePrimitivesPath } );
}

const get = () => {
    return [ ...pathIndexes ]
}

export {
    build,
    reset,
    get
}
