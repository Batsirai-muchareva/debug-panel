import React from "react";

interface Props {
    query: string;
}

export const PendingSegment = ( { query }: Props ) => (
    <span
        className="path-crumb-segment path-crumb-pending"
        style={ {
            padding       : '2px 6px',
            fontSize      : '11px',
            fontFamily    : 'JetBrains Mono, monospace',
            opacity       : 0.55,
            fontStyle     : 'italic',
            pointerEvents : 'none',
            userSelect    : 'none',
            color         : '#c8a84a',
            letterSpacing : '0.02em',
            borderBottom  : '1px dashed rgba(200,168,74,0.4)',
        } }
    >
        { query }
    </span>
);
