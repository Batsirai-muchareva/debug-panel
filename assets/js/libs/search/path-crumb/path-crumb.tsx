import React from "react";
import { useRef } from "@wordpress/element";

import { usePath } from "@libs/path";

import { useSearch } from "../context/search-context";
import { useOverflow } from "../hooks/use-overflow";
import { Arrow } from "./arrow";
import { ClearButton } from "./clear-button";
import { HiddenMeasureClone } from "./Hidden-measure-clone";
import { OverflowBadge } from "./overflow-badge";
import { PendingSegment } from "./pending-segment";
import { SegmentButton } from "./segment-button";

export const PathCrumb = () => {
    const { path, setPath } = usePath();
    const { query, setQuery, setRawQuery } = useSearch();

    const containerRef = useRef<HTMLDivElement>( null );
    const hiddenRef    = useRef<HTMLSpanElement>( null );

    const segments   = path ? path.split( '.' ) : [];

    const maxVisible = useOverflow( containerRef, hiddenRef, segments.length );

    const lastSegment = segments[segments.length - 1] ?? '';
    const hasPending    = query.length > 0 && query.toLowerCase() !== lastSegment.toLowerCase();
    const isVisible     = path || hasPending;

    if ( ! isVisible ) {
        return null;
    }

    const navigateTo = ( index: number ) => {
        setPath( segments.slice( 0, index + 1 ).join( '.' ) );
        setRawQuery( '' );
    };

    const visibleSegs = deriveVisible( segments, maxVisible );
    const hiddenSegs  = deriveHidden( segments, maxVisible );
    const isOverflow  = hiddenSegs.length > 0;

    return (
        <div className="search-path-row" id="pathRow" ref={ containerRef } style={ { position: 'relative' } }>
            <span className="path-label">Path</span>

            <HiddenMeasureClone ref={ hiddenRef } segments={ segments } />

            <span className="path-crumb" id="pathCrumb">
                { isOverflow ? (
                    <>
                        <SegmentButton
                            label    = { segments[ 0 ] }
                            onClick  = { () => navigateTo( 0 ) }
                            isActive = { false }
                        />
                        <Arrow />
                        <OverflowBadge
                            segments  = { hiddenSegs }
                            onSelect  = { ( i ) => navigateTo( i + 1 ) }
                        />
                        <Arrow />
                        <SegmentButton
                            label    = { segments[ segments.length - 1 ] }
                            onClick  = { () => navigateTo( segments.length - 1 ) }
                            isActive = { false }
                            // isActive = { ! hasPending }
                        />
                    </>
                ) : (
                    segments.map( ( seg, i ) => {
                        const isLast = i === segments.length - 1;
                        return (
                            <React.Fragment key={ i }>
                                <SegmentButton
                                    label    = { seg }
                                    onClick  = { () => navigateTo( i ) }
                                    isActive = { isLast && ! hasPending }
                                />
                                { ! isLast && <Arrow /> }
                            </React.Fragment>
                        );
                    } )
                ) }

                { hasPending && (
                    <>
                        <Arrow />
                        <PendingSegment query={ query } />
                    </>
                ) }
            </span>

            <ClearButton onClear={ () => {
                setPath( '' );

                requestAnimationFrame(()=> setQuery( '' ) )

            } } />
        </div>
    )
}

const deriveVisible = ( segments: string[], maxVisible: number | null ): string[] => {
    if ( maxVisible === null || segments.length <= maxVisible + 1 ) return segments;
    return [ segments[ 0 ], segments[ segments.length - 1 ] ];
};

const deriveHidden = ( segments: string[], maxVisible: number | null ): string[] => {
    if ( maxVisible === null || segments.length <= maxVisible + 1 ) return [];
    return segments.slice( 1, segments.length - 1 );
};
