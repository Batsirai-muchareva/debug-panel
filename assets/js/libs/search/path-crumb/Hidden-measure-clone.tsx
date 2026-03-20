import React, { forwardRef } from "react";

interface Props {
    segments: string[];
}

export const HiddenMeasureClone = forwardRef<HTMLSpanElement, Props>(
    ( { segments }, ref ) => (
        <span
            ref={ ref }
            aria-hidden
            style={ {
                visibility    : 'hidden',
                position      : 'absolute',
                pointerEvents : 'none',
                whiteSpace    : 'nowrap',
            } }
        >
            { segments.map( ( seg, i ) => (
                <span
                    key={ i }
                    className="seg-measure"
                    style={ {
                        fontSize   : '11px',
                        fontFamily : 'JetBrains Mono, monospace',
                        padding    : '2px 6px',
                    } }
                >
                    { seg }
                </span>
            ) ) }
        </span>
    )
);
