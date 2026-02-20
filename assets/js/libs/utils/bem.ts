const BLOCK_NAME = 'dev';

const bem = ( block: string ) => {
    const cls = ( ...parts: ( string | false | null | undefined )[] ) =>
        parts.filter(Boolean).join(' ');

    return {
        block: () => block,
        element: ( element: string ) => `${block}__${element}`,
        modifier: ( modifier: string ) => `${block}--${modifier}`,
        elemMod: ( element: string, modifier: string ) => `${block}__${element}--${modifier}`,
        elements: ( elements: (string | undefined)[] ) => elements.map( ( element ) => `${block}__${element}`)
            .filter( Boolean ).join( ' ' ),
        condElemMod: ( element: string, modifier: string, condition: boolean ) =>
            condition
                ? `${block}__${element} ${block}__${element}--${modifier}`
                : `${block}__${element}`,
        elementClass: ( element: string ) => ( keyClass: string ) => `${block}__${element}-${keyClass}`
    };
};

export const bemBlock = bem( BLOCK_NAME );
