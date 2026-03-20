import React from "react";

interface Props {
    onClear: () => void;
}

export const ClearButton = ( { onClear }: Props ) => (
    <>
        <span style={ {
            width      : '1px',
            height     : '14px',
            background : '#2a5248',
            margin     : '0 6px',
            flexShrink : 0,
            display    : 'inline-block',
        } } />
        <button
            className="path-cancel"
            onClick={ onClear }
            style={ {
                background    : 'none',
                border        : 'none',
                padding       : '2px 5px',
                fontSize      : '11px',
                fontFamily    : 'JetBrains Mono, monospace',
                color         : '#4a7a6e',
                cursor        : 'pointer',
                borderRadius  : '4px',
                transition    : 'color 0.15s, background 0.15s',
                flexShrink    : 0,
                letterSpacing : '0.02em',
            } }
            onMouseEnter={ e => {
                ( e.target as HTMLButtonElement ).style.color      = '#e07070';
                ( e.target as HTMLButtonElement ).style.background = 'rgba(200,80,80,0.08)';
            } }
            onMouseLeave={ e => {
                ( e.target as HTMLButtonElement ).style.color      = '#4a7a6e';
                ( e.target as HTMLButtonElement ).style.background = 'none';
            } }
        >
            clear
        </button>
    </>
);
