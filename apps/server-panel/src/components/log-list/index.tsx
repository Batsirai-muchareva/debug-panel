import { useEffect, useRef } from 'react';

import { Box } from '@debug-panel/ui';

import { useDebugLogs } from '../../context/debug-logs-context';
import { EmptyState } from '../empty-state';
import { LogEntry } from '../log-entry';

import styles from './log-list.module.scss';

export function LogList() {
    const { filteredLogs, highlightedId } = useDebugLogs();
    const hasLogs = filteredLogs.length > 0;
    const bottomRef = useRef<HTMLDivElement>( null );

    // Scroll to highlighted entry when set via timeline
    useEffect( () => {
        if ( !highlightedId ) return;
        const el = document.getElementById( `log-${ highlightedId }` );
        el?.scrollIntoView( { behavior: 'smooth', block: 'nearest' } );
    }, [ highlightedId ] );

    // Auto-scroll to bottom on new logs (only when nothing is highlighted)
    useEffect( () => {
        if ( highlightedId ) return;
        bottomRef.current?.scrollIntoView( { behavior: 'smooth' } );
    }, [ filteredLogs.length ] );

    if ( !hasLogs ) {
        return <EmptyState />;
    }

    return (
        <Box className={ styles.list }>
            { filteredLogs.map( ( log ) => (
                <LogEntry key={ log.id } item={ log } />
            ) ) }
            <Box ref={ bottomRef } />
        </Box>
    );
}
