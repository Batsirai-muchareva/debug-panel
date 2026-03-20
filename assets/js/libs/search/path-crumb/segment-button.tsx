import React from "react";

interface Props {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

export const SegmentButton = ( { label, onClick, isActive }: Props ) => (
    <button
        className="path-crumb-segment"
        onClick={ onClick }
        disabled={ isActive }
        style={ {
            border        : 'none',
            padding       : '2px 6px',
            cursor        : isActive ? 'default' : 'pointer',
            color         : isActive ? '#eee' : '#7ecfaa',
            font          : 'inherit',
            fontSize      : '11px',
            fontWeight    : 500,
            borderRadius  : '4px',
            fontFamily    : 'JetBrains Mono, monospace',
            transition    : 'background 0.12s, color 0.12s',
            letterSpacing : '0.02em',
        } }
    >
        { label }
    </button>
);
