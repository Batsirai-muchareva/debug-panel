import { useEffect, useRef } from 'react';

import { Box } from '@debug-panel/ui';

import { useDebugLogs } from '../../context/debug-logs-context';
import { EmptyState } from '../empty-state';
import { LogEntry } from '../log-entry';

import styles from './log-list.module.scss';

export function LogList() {
    const { logs } = useDebugLogs();
    const hasLogs = logs.length > 0;
    const bottomRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        bottomRef.current?.scrollIntoView( { behavior: 'smooth' } );
    }, [logs.length] );

    if ( ! hasLogs ) {
        return <EmptyState />;
    }

    return (
        <Box className={ styles.list }>
            { logs.map( ( log ) => (
                <LogEntry key={ log.id } item={ log } />
            ) ) }
            <Box ref={ bottomRef } />
        </Box>
    );
}
