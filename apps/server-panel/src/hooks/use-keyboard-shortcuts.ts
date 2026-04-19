import { useEffect } from 'react';

import { useDebugLogs } from '../context/debug-logs-context';

/**
 * Global keyboard shortcuts for the server panel.
 *
 * P   — pause / resume (not in input)
 * C   — clear logs   (not in input, not combined with meta)
 * ↑/↓ — navigate highlighted log entry
 */
export function useKeyboardShortcuts() {
    const {
        togglePause,
        clear,
        filteredLogs,
        highlightedId,
        setHighlightedId,
    } = useDebugLogs();

    useEffect( () => {
        const handler = ( e: KeyboardEvent ) => {
            const tag     = ( e.target as HTMLElement ).tagName;
            const inInput = tag === 'INPUT' || tag === 'TEXTAREA' || ( e.target as HTMLElement ).isContentEditable;

            if ( inInput ) return;

            switch ( e.key ) {
                case 'p':
                case 'P':
                    e.preventDefault();
                    togglePause();
                    break;

                case 'c':
                case 'C':
                    // Allow browser copy (Cmd/Ctrl+C)
                    if ( !e.metaKey && !e.ctrlKey ) {
                        e.preventDefault();
                        clear();
                    }
                    break;

                case 'ArrowDown': {
                    e.preventDefault();
                    const idx  = filteredLogs.findIndex( ( l ) => l.id === highlightedId );
                    const next = idx < 0 ? filteredLogs[ 0 ] : filteredLogs[ idx + 1 ];
                    if ( next ) setHighlightedId( next.id );
                    break;
                }

                case 'ArrowUp': {
                    e.preventDefault();
                    const idx  = filteredLogs.findIndex( ( l ) => l.id === highlightedId );
                    const prev = idx > 0 ? filteredLogs[ idx - 1 ] : null;
                    if ( prev ) setHighlightedId( prev.id );
                    break;
                }
            }
        };

        document.addEventListener( 'keydown', handler );
        return () => document.removeEventListener( 'keydown', handler );
    }, [ filteredLogs, highlightedId, togglePause, clear, setHighlightedId ] );
}
