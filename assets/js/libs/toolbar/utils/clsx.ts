export const clsx = ( base: string, cls: Record<string, boolean> ) => {
    const conditional = Object.entries( cls )
        .filter( ( [ , value ] ) => value )
        .map( ( [ key ] ) => key );

    return [ base, ...conditional ].join( ' ' );
};
