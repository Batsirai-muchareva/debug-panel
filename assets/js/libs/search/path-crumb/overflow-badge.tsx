import React from "react";
import { useEffect, useState } from "@wordpress/element";

interface Props {
    segments : string[];
    onSelect : ( originalIndex: number ) => void;
}

export const OverflowBadge = ( { segments, onSelect }: Props ) => {
    const [ isOpen, setIsOpen ] = useState( false );

    useEffect( () => {
        if ( ! isOpen ) {
            return;
        }

        const close = () => setIsOpen( false );

        document.addEventListener( 'click', close );

        return () => document.removeEventListener( 'click', close );
    }, [ isOpen ] );

    const toggle = ( e: React.MouseEvent ) => {
        e.stopPropagation();
        setIsOpen( o => ! o );
    };

    return (
        <span style={ {  display: 'inline-block' } }>
            <button
                onClick={ toggle }
                style={ {
                    background   : '#1e3d35',
                    border       : '1px solid #2d6558',
                    color        : '#4dc9a0',
                    fontSize     : '10px',
                    fontWeight   : 600,
                    borderRadius : '5px',
                    padding      : '1px 7px',
                    cursor       : 'pointer',
                    fontFamily   : 'JetBrains Mono, monospace',
                } }
            >
                +{ segments.length }
            </button>

            { isOpen && (
                <div  style={ {
                    position     : 'absolute',
                    top          : 'calc(100% + -10px)',
                    left         : '45%',
                    background   : '#0d2b26',
                    border       : '1px solid #2d6558',
                    maxHeight    : '15rem',
                    overflow     : 'scroll',
                    borderRadius : '8px',
                    padding      : '6px 0',
                    minWidth     : '160px',
                    zIndex       : 999,
                    boxShadow    : '0 8px 24px rgba(0,0,0,0.5)',
                } }>
                    { segments.map( ( seg, i ) => (
                        <button
                            className="overflow-badge-btn"
                            key={ i }
                            onClick={ () => onSelect( i ) }
                            style={ {
                                display    : 'block',
                                width      : '95%',
                                textAlign  : 'left',
                                background : 'none',
                                border     : 'none',
                                padding    : '6px 14px',
                                fontSize   : '12px',
                                color      : '#4dc9a0',
                                cursor     : 'pointer',
                                fontFamily : 'JetBrains Mono, monospace',
                                borderRadius: '5px',
                                marginInline: 'auto',
                            } }
                        >
                            <span style={{fontSize:8}}>{ i + 1 }</span> › { seg }
                        </button>
                    ) ) }
                </div>
            ) }
        </span>
    );
};
