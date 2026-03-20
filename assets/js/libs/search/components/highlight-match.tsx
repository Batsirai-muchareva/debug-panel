import React from "react";

export const HighlightMatch = ( { text, query }: { text: string, query: string } ) => {
    const i = text.toLowerCase().indexOf( query.toLowerCase() );

    if ( i === -1 ) {
        return text;
    }

    return (
        <>
            { text.slice( 0, i ) }
            <span className="hl">
                { text.slice( i, i + query.length ) }
            </span>
            { text.slice( i + query.length ) }
        </>
    );
};
