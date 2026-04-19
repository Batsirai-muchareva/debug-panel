import { useEffect, useRef, useState } from 'react';

import type { LogItem } from '../../context/debug-logs-context';
import { useDebugLogs } from '../../context/debug-logs-context';
import { BacktraceView } from '../backtrace-view';
import { LabelBadge } from '../label-badge';

import styles from './log-entry.module.scss';

export const LogEntry = ( { item }: { item: LogItem } ) => {
    const { logs, togglePin, highlightedId, setHighlightedId } = useDebugLogs();
    const isLatest = item.id === logs[ logs.length - 1 ]?.id;
    const isHighlighted = item.id === highlightedId;

    const [ open, setOpen ] = useState( true );
    const [ copyFlash, setCopyFlash ] = useState( false );
    const bodyRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        if ( !bodyRef.current ) return;

        bodyRef.current.querySelectorAll( 'script' ).forEach( ( oldScript ) => {
            const match = oldScript.textContent?.match( /Sfdump\("([^"]+)"/ );
            if ( match && document.querySelector( `[data-sfdump-init="${ match[1] }"]` ) ) return;

            const newScript = document.createElement( 'script' );
            newScript.textContent = oldScript.textContent;
            document.body.appendChild( newScript );
            document.body.removeChild( newScript );

            if ( match ) {
                document.getElementById( match[1] )?.setAttribute( 'data-sfdump-init', match[1] );
            }
        } );
    }, [ item.payload ] );

    const handleCopy = ( e: React.MouseEvent ) => {
        e.stopPropagation();
        const text = `${ item.label } | ${ item.backtrace?.callerFunction } · ${ item.backtrace?.sourceName }:${ item.backtrace?.lineNumber } @ ${ item.time }`;
        navigator.clipboard?.writeText( text );
        setCopyFlash( true );
        setTimeout( () => setCopyFlash( false ), 1200 );
    };

    const handleHeadClick = () => {
        setOpen( ( o ) => !o );
        setHighlightedId( item.id );
    };

    return (
        <div
            id={ `log-${ item.id }` }
            className={ `${ styles.card } ${ isHighlighted ? styles.highlighted : '' }` }
        >
            { item.isDuplicate && (
                <div className={ styles.diffBanner }>
                    <span className={ styles.diffDot } />
                    duplicate dump detected — same label, same source
                </div>
            ) }

            <div className={ styles.cardHead } onClick={ handleHeadClick }>
                <span className={ styles.index }>#{ item.index }</span>
                <LabelBadge label={ item.label } />
                <span className={ styles.fn }>{ item.backtrace?.callerFunction }</span>

                <div className={ styles.cardActions }>
                    { isLatest && <span className={ styles.latestTag }>latest</span> }
                    { item.pinned && <span className={ styles.pinnedTag }>pinned</span> }
                    <button
                        className={ `${ styles.iconBtn } ${ item.pinned ? styles.iconBtnPinned : '' }` }
                        title={ item.pinned ? 'unpin' : 'pin' }
                        onClick={ ( e ) => { e.stopPropagation(); togglePin( item.id ); } }
                    >
                        { item.pinned ? '★' : '☆' }
                    </button>
                    <button
                        className={ `${ styles.iconBtn } ${ copyFlash ? styles.iconBtnCopy : '' }` }
                        title="copy"
                        onClick={ handleCopy }
                    >
                        { copyFlash ? '✓' : '⎘' }
                    </button>
                </div>
            </div>

            { open && (
                <div ref={ bodyRef } className={ styles.body }>
                    { item.payload.map( ( { content: html }, i ) => (
                        <div key={ i } dangerouslySetInnerHTML={ { __html: html } } />
                    ) ) }
                </div>
            ) }

            <BacktraceView
                backtrace={ item.backtrace }
                time={ item.time }
            />
        </div>
    );
};
