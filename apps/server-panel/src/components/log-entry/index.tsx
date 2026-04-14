import { useEffect, useRef } from 'react';

import { Box } from '@debug-panel/ui';

import type { LogItem } from '../../context/debug-logs-context';
import { BacktraceView } from '../backtrace-view';
import { LabelBadge } from '../label-badge';

import styles from './log-entry.module.scss';

export const LogEntry = ( { item }: { item: LogItem } ) => {

    const bodyRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        if ( !bodyRef.current ) return;

        bodyRef.current.querySelectorAll( 'script' ).forEach( ( oldScript ) => {
            // skip if this dump id was already initialised
            const match = oldScript.textContent?.match( /Sfdump\("([^"]+)"/ );
            if ( match && document.querySelector( `[data-sfdump-init="${match[1]}"]` ) ) return;

            const newScript = document.createElement( 'script' );
            newScript.textContent = oldScript.textContent;
            document.body.appendChild( newScript );
            document.body.removeChild( newScript );

            if ( match ) {
                document.getElementById( match[1] )?.setAttribute( 'data-sfdump-init', match[1] );
            }
        } );
    }, [ item.payload ] );

    return (
        <Box className={styles.card}>
            <Box className={styles.meta}>
                <span className={styles.index}>#{item.index}</span>
                <LabelBadge label={ item.label } />
                {/*<span className={styles.payloadType}>{item.payload.type.toUpperCase()}</span>*/}
            </Box>

            {/* php renderer*/}
            <div ref={bodyRef} className={styles.body}>
                { item.payload.map( ( { content: html }, i ) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
                ) ) }
            </div>

            <BacktraceView
                backtrace={ item.backtrace }
                time={ item.time }
            />
        </Box>
    );
}

// useEffect(() => {
//     if (!bodyRef.current) return;
//
//     bodyRef.current.querySelectorAll('script').forEach((oldScript) => {
//         const newScript = document.createElement('script');
//         newScript.textContent = oldScript.textContent;
//         document.body.appendChild(newScript);
//         document.body.removeChild(newScript);
//     });
// }, []);

