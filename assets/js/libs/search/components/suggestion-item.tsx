import React from "react";

import { HighlightMatch } from "./highlight-match";

type Props = {
    path: string;
    query: string;
    highlighted: boolean;
    onSelect: ( path: string ) => void;
};

export const SuggestionItem = ( { path, query, onSelect, highlighted }: Props ) => {
    const parts = path.split( '.' );
    const key = parts[ parts.length - 1 ];
    const parent = parts.slice( 0, -1 ).join( '.' );
    const isNested = parts.length > 1;

    return (
        <button
            className={ ["suggestion-item", highlighted ? 'suggestion-item--active' : ''].join(' ') }
            onClick={ () => onSelect( path ) }
            onMouseDown={ ( e ) => e.preventDefault() }
        >
            <span className={ `suggestion-icon ${ isNested ? 'icon-path' : 'icon-key' }` }>
                { isNested ? 'P' : 'K' }
            </span>
            <span className="suggestion-main">
                <span className="suggestion-label">
                    <HighlightMatch text={ key } query={ query } />
                </span>
                { parent && (
                    <span className="suggestion-meta">
                        { parent.split( '.' ).map( ( seg, i, arr ) => (
                            <React.Fragment key={ i }>
                                <span className="path-seg">{ seg } </span>
                                { i < arr.length - 1 && <span className="path-sep">›</span> }
                            </React.Fragment>
                        ) ) }
                    </span>
                ) }
            </span>
        </button>
    );
};
