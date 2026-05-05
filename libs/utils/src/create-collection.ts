type CollectionApi<T> = {
    first: () => T | undefined;
    firstOrThrow: () => T;
    last: () => T | undefined;
    sort: ( fn: ( a: T, b: T ) => number ) => Collection<T>;
    mapWith: <U>( fn: ( item: T ) => U ) => Collection<U>;
    adjust: <U extends Record<string, unknown>>( fn: ( item: T ) => U ) => Collection<Omit<T, keyof U> & U>;
    omit: <K extends keyof T>( ...keys: K[] ) => Collection<Omit<T, K>>;
    findBy: <K extends keyof T>( key: K, value: T[K] | undefined ) => T | undefined;
    pick: <K extends keyof T>( ...keys: K[] ) => Collection<Pick<T, K>>;
    toRecord: <K extends string | number | symbol, V>( key: ( item: T ) => K, value: ( item: T ) => V ) => Record<K, V>;
};

type Collection<T> = T[] & CollectionApi<T>;

export const createCollection = <T>( items: T[] ): Collection<T> => {
    const list = [ ...items ];

    const api: CollectionApi<T> = {
        first: () => list[0],
        firstOrThrow: () => {
            if ( list.length === 0 ) {
                throw new Error( 'Collection is empty' );
            }

            return list[0];
        },
        last: () => list.at( -1 ),
        sort: ( fn ) => createCollection( [ ...list ].sort( fn ) ),
        mapWith: ( fn ) => createCollection( list.map( fn ) ),
        adjust: ( fn ) => createCollection(
            list.map( item => ( { ...item, ...fn( item ) } ) )
        ),
        omit: ( ...keys ) => createCollection(
            list.map( item => {
                const result = { ...item };
                keys.forEach( key => delete result[ key ] );
                return result;
            } )
        ),
        findBy: ( key, value ) => list.find( item => item[ key ] === value ),
        pick: ( ...keys ) => createCollection(
            list.map( item => {
                const result = {} as Pick<T, typeof keys[number]>;
                keys.forEach( key => result[ key ] = item[ key ] );
                return result;
            } )
        ),
        toRecord: ( key, value ) => list.reduce( ( acc, item ) => {
            acc[ key( item ) ] = value( item );
            return acc;
        }, {} as Record<ReturnType<typeof key>, ReturnType<typeof value>> ),
    };

    return new Proxy( list as Collection<T>, {
        get( target, prop ) {
            if ( typeof prop === "string" && prop in api ) {
                return ( api as Record<string, unknown> )[ prop ];
            }

            return Reflect.get( target, prop );
        },
    } );
};
