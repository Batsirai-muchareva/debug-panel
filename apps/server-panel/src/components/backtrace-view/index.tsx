import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ListIcon } from '@debug-panel/icons';
import { Box } from '@debug-panel/ui';

import type { LogItem } from '../../context/debug-logs-context';
import { formatTime } from '../../utils/format-time';

import styles from './backtrace-view.module.scss';

// ── Editor config ──────────────────────────────────────────────────────────

type EditorId = 'phpstorm' | 'cursor' | 'vscode';

const EDITORS: { id: EditorId; label: string; buildUrl: ( f: string, l: number ) => string }[] = [
    {
        id: 'phpstorm',
        label: 'PhpStorm',
        buildUrl: ( f, l ) => `phpstorm://open?file=${ encodeURIComponent( f ) }&line=${ l }`,
    },
    {
        id: 'cursor',
        label: 'Cursor',
        buildUrl: ( f, l ) => `cursor://file/${ f }:${ l }`,
    },
    {
        id: 'vscode',
        label: 'VS Code',
        buildUrl: ( f, l ) => `vscode://file/${ f }:${ l }`,
    },
];

const STORAGE_KEY = 'debug-panel:editor';

function getStoredEditor(): EditorId {
    try {
        const v = localStorage.getItem( STORAGE_KEY ) as EditorId | null;
        if ( v && EDITORS.some( ( e ) => e.id === v ) ) return v;
    } catch { /* ignore */ }
    return 'phpstorm';
}

function setStoredEditor( id: EditorId ) {
    try { localStorage.setItem( STORAGE_KEY, id ); } catch { /* ignore */ }
}

// ── Helpers ────────────────────────────────────────────────────────────────

type Props = {
    backtrace: LogItem['backtrace'];
    time: string;
};


type PopoverPos = { top: number; left: number; openUpward: boolean };

// ── Component ──────────────────────────────────────────────────────────────

export function BacktraceView( { backtrace, time }: Props ) {
    const [ open, setOpen ]           = useState( false );
    const [ activeIdx, setActiveIdx ] = useState( 0 );
    const [ copyFlash, setCopyFlash ] = useState( false );
    const [ pos, setPos ]             = useState<PopoverPos>( { top: 0, left: 0, openUpward: true } );
    const [ editorId, setEditorId ]   = useState<EditorId>( getStoredEditor );
    const [ editorMenuOpen, setEditorMenuOpen ] = useState( false );

    const triggerRef    = useRef<HTMLButtonElement>( null );
    const popoverRef    = useRef<HTMLDivElement>( null );

    const editor = EDITORS.find( ( e ) => e.id === editorId ) ?? EDITORS[ 0 ];

    function openInEditor( filePath: string, line: number ) {
        window.open( editor.buildUrl( filePath, line ) );
    }

    // Position popover relative to trigger
    useLayoutEffect( () => {
        if ( !open || !triggerRef.current ) return;
        const rect         = triggerRef.current.getBoundingClientRect();
        const popoverH     = 440;
        const spaceAbove   = rect.top;
        const spaceBelow   = window.innerHeight - rect.bottom;
        const openUpward   = spaceAbove >= popoverH || spaceAbove > spaceBelow;
        setPos( {
            top: openUpward ? rect.top - 8 : rect.bottom + 8,
            left: Math.min( rect.left, window.innerWidth - 480 ),
            openUpward,
        } );
    }, [ open ] );

    // Close popover on outside click
    useEffect( () => {
        if ( !open ) return;
        const handler = ( e: MouseEvent ) => {
            const t = e.target as Node;
            if (
                triggerRef.current && !triggerRef.current.contains( t ) &&
                popoverRef.current && !popoverRef.current.contains( t )
            ) setOpen( false );
        };
        document.addEventListener( 'mousedown', handler );
        return () => document.removeEventListener( 'mousedown', handler );
    }, [ open ] );

    const activeFrame = backtrace?.frames?.[ activeIdx ];

    const handleCopyPath = () => {
        const path = activeFrame?.file ?? backtrace?.pathToSource ?? '';
        navigator.clipboard?.writeText( path );
        setCopyFlash( true );
        setTimeout( () => setCopyFlash( false ), 1200 );
    };

    // Header button always opens the origin call site
    const handleOpenOrigin = () => {
        if ( backtrace?.pathToSource ) openInEditor( backtrace.pathToSource, backtrace.lineNumber ?? 1 );
    };

    // Footer button opens the selected frame (falls back to origin)
    const handleOpenActive = () => {
        const file = activeFrame?.file ?? backtrace?.pathToSource;
        const line = activeFrame?.line ?? backtrace?.lineNumber;
        if ( file ) openInEditor( file, line ?? 1 );
    };

    const switchEditor = ( id: EditorId ) => {
        setEditorId( id );
        setStoredEditor( id );
        setEditorMenuOpen( false );
    };

    if ( !backtrace ) return null;

    const popover = open && createPortal(
        <div
            ref={ popoverRef }
            className={ `${ styles.popover } ${ pos.openUpward ? styles.popoverUp : styles.popoverDown }` }
            style={ {
                position: 'fixed',
                left: pos.left,
                ...( pos.openUpward
                    ? { bottom: window.innerHeight - pos.top }
                    : { top: pos.top } ),
            } }
        >
            {/* ── Header ── */}
            <div className={ styles.popoverHeader }>
                <div className={ styles.popoverTitle }>
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="2" width="14" height="2.2" rx="1" fill="currentColor" />
                        <rect x="1" y="7" width="10" height="2.2" rx="1" fill="currentColor" />
                        <rect x="1" y="12" width="12" height="2.2" rx="1" fill="currentColor" />
                    </svg>
                    CALL STACK
                    { backtrace.frames?.length > 0 && (
                        <span className={ styles.frameCount }>{ backtrace.frames.length } frames</span>
                    ) }
                </div>

                {/* Editor switcher */}
                <div className={ styles.editorSwitcher }>
                    <button
                        className={ styles.openEditorBtn }
                        onClick={ handleOpenOrigin }
                        title={ `Open origin in ${ editor.label }` }
                    >
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                            <path d="M2 14L14 2M14 2H8M14 2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Open in { editor.label }
                    </button>
                    <div className={ styles.editorMenuWrap }>
                        <button
                            className={ `${ styles.editorChevronBtn } ${ editorMenuOpen ? styles.editorChevronOpen : '' }` }
                            onClick={ ( e ) => { e.stopPropagation(); setEditorMenuOpen( ( o ) => !o ); } }
                            title="Switch editor"
                        >
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        { editorMenuOpen && (
                            <div className={ styles.editorMenu }>
                                { EDITORS.map( ( ed ) => (
                                    <button
                                        key={ ed.id }
                                        className={ `${ styles.editorMenuItem } ${ ed.id === editorId ? styles.editorMenuItemActive : '' }` }
                                        onClick={ () => switchEditor( ed.id ) }
                                    >
                                        { ed.id === editorId && (
                                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) }
                                        { ed.label }
                                    </button>
                                ) ) }
                            </div>
                        ) }
                    </div>
                </div>
            </div>

            {/* ── Origin breadcrumb ── */}
            <div className={ styles.originPath }>
                <span className={ styles.originLabel }>ORIGIN</span>
                <span className={ styles.originFile } title={ backtrace.pathToSource }>
                    { backtrace.pathToSource }
                </span>
                <span className={ styles.originLine }>:{ backtrace.lineNumber }</span>
            </div>

            {/* ── Frame list ── */}
            { backtrace.frames?.length > 0 ? (
                <div className={ styles.frames }>
                    { backtrace.frames.map( ( frame, i ) => (
                        <div
                            key={ i }
                            className={ `${ styles.frame } ${ i === activeIdx ? styles.frameActive : '' }` }
                            onClick={ () => setActiveIdx( i ) }
                        >
                            <span className={ styles.frameIdx }>{ i }</span>
                            <div className={ styles.frameBody }>
                                <div className={ styles.frameFn }>{ frame.function }</div>
                                <div className={ styles.frameLoc } title={ frame.file }>{ frame.file }</div>
                            </div>
                            <span className={ styles.frameLine }>:{ frame.line }</span>
                            { i === activeIdx && (
                                <button
                                    className={ styles.frameOpenBtn }
                                    onClick={ ( e ) => { e.stopPropagation(); openInEditor( frame.file, frame.line ); } }
                                    title={ `Open in ${ editor.label }` }
                                >
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 14L14 2M14 2H8M14 2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            ) }
                        </div>
                    ) ) }
                </div>
            ) : (
                <div className={ styles.noFrames }>No call stack available</div>
            ) }

            {/* ── Footer ── */}
            <div className={ styles.popoverFooter }>
                <span className={ styles.activeLine }>
                    Line&nbsp;<strong>{ activeFrame?.line ?? backtrace.lineNumber }</strong>
                </span>
                <div className={ styles.footerActions }>
                    <button
                        className={ `${ styles.footerBtn } ${ copyFlash ? styles.footerBtnFlash : '' }` }
                        onClick={ handleCopyPath }
                    >
                        { copyFlash ? '✓ Copied' : 'Copy path' }
                    </button>
                    <button className={ `${ styles.footerBtn } ${ styles.footerBtnPrimary }` } onClick={ handleOpenActive }>
                        Open in { editor.label }
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );

    return (
        <Box>
            <Box className={ styles.footer }>
                <button
                    ref={ triggerRef }
                    className={ styles.location }
                    onClick={ () => setOpen( ( o ) => !o ) }
                >
                    <ListIcon size={ 18 } />
                    <span className={ styles.file }>{ backtrace.sourceName }</span>
                    <span className={ styles.sep }>·</span>
                    <span className={ styles.fn }>{ backtrace.callerFunction }</span>
                    <span className={ styles.sep }>·</span>
                    <span className={ styles.line }>line&nbsp;{ backtrace.lineNumber }</span>
                    <span className={ `${ styles.chevron } ${ open ? styles.chevronOpen : '' }` }>›</span>
                </button>

                { popover }

                <span className={ styles.time }>{ formatTime( time ) }</span>
            </Box>
        </Box>
    );
}
