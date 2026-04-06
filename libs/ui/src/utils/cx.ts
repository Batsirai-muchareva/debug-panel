export const cx = (
  ...args: ( string | undefined | null | false | Record<string, boolean | undefined> )[]
) => {
  return args
    .flatMap( ( arg ) =>
      typeof arg === 'object' && arg !== null
        ? Object.entries( arg )
            .filter( ( [, v] ) => Boolean( v ) )
            .map( ( [k] ) => k )
        : arg,
    )
    .filter( Boolean )
    .join( ' ' );
};
