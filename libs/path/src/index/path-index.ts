import { traverseData, type TraverseOptions } from './collect-paths/traverse-data';
import { createTrie } from './path-trie';

type PathIndexState = {
    paths: string[];
};

type PathIndexAPI = {
    build: ( data: unknown, options?: TraverseOptions ) => void;
    exists: ( path: string ) => boolean;
    next: ( path: string | null ) => string[];
    get: () => string[];
    reset: () => void;
};

const createPathIndex = (): PathIndexAPI => {
    const { insert, clear, exists, next } = createTrie();
    const state: PathIndexState = { paths: [] };

    return {
        build( data, options = {} ) {
            this.reset();

            traverseData( data, ( path ) => {
                state.paths.push( path );
                insert( path );
            }, options );
        },

        get() {
            return [ ...state.paths ];
        },

        reset() {
            state.paths = [];
            clear();
        },

        exists,
        next,
    };
};

export const pathIndex = createPathIndex();

