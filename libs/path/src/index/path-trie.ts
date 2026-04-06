type TrieNode = {
    children: Map<string, TrieNode>;
    isEnd: boolean;
};

type Trie = {
    insert: ( path: string ) => void;
    exists: ( path: string ) => boolean;
    next: ( path: string | null ) => string[];
    clear: () => void;
};

export const createTrie = (): Trie => {
    let root = createNode();

    return {
        insert( path ) {
            const parts = path.split( '.' );
            let node = root;

            for ( const part of parts ) {
                if ( ! node.children.has( part ) ) {
                    node.children.set( part, createNode() );
                }
                node = node.children.get( part )!;
            }

            node.isEnd = true;
        },

        exists( path ) {
            return traverse( root, path )?.isEnd ?? false;
        },

        next( path ) {
            const node = path ? traverse( root, path ) : root;
            if ( !node ) return [];
            return [ ...node.children.keys() ];
        },

        clear() {
            root = createNode();
        },
    };
};


const createNode = (): TrieNode => ( {
    children: new Map(),
    isEnd: false,
} );

const traverse = ( root: TrieNode, path: string ): TrieNode | null => {
    const parts = path.split( '.' );
    let node = root;

    for ( const part of parts ) {
        const next = node.children.get( part );
        if ( ! next ) {
            return null;
        }

        node = next;
    }

    return node;
};



