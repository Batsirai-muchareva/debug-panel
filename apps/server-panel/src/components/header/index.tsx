import { useEffect, useRef } from 'react';

import { type ViewMode, useDebugLogs } from '../../context/debug-logs-context';
import { useClientCount } from '../../hooks/use-client-count';

import styles from './header.module.scss';

const VIEW_MODES: ViewMode[] = [ 'all', 'pinned', 'diff' ];

export function Header() {
    const {
        connected, clear, logs,
        searchOpen, setSearchOpen,
        searchQuery, setSearchQuery,
        useRegex, setUseRegex, regexError,
        viewMode, setViewMode,
        paused, pausedCount, togglePause,
    } = useDebugLogs();

    const clientCount = useClientCount();
    const hasLogs     = logs.length > 0;
    const inputRef    = useRef<HTMLInputElement>( null );
    const searchWrapRef = useRef<HTMLDivElement>( null );

    // Auto-focus when search opens
    useEffect( () => {
        if ( searchOpen ) inputRef.current?.focus();
    }, [ searchOpen ] );

    // Close on outside click
    useEffect( () => {
        if ( !searchOpen ) return;
        const handler = ( e: MouseEvent ) => {
            if ( searchWrapRef.current && !searchWrapRef.current.contains( e.target as Node ) ) {
                setSearchOpen( false );
            }
        };
        document.addEventListener( 'mousedown', handler );
        return () => document.removeEventListener( 'mousedown', handler );
    }, [ searchOpen, setSearchOpen ] );

    const handleSearchKey = ( e: React.KeyboardEvent ) => {
        if ( e.key === 'Escape' ) {
            setSearchOpen( false );
            setSearchQuery( '' );
        }
    };

    const toggleSearch = () => {
        if ( searchOpen ) {
            setSearchOpen( false );
            setSearchQuery( '' );
        } else {
            setSearchOpen( true );
        }
    };

    return (
        <header className={ styles.header }>

            {/* ── Left: search + pause + view modes ── */}
            <div className={ styles.left } ref={ searchWrapRef }>

                {/* Search icon */}
                <button
                    className={ `${ styles.iconBtn } ${ searchOpen ? styles.iconBtnActive : '' }` }
                    onClick={ toggleSearch }
                    title="Search  (⌘K)"
                    aria-label="Toggle search"
                >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" />
                        <line x1="9.9" y1="9.9" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Pause / Resume */}
                <button
                    className={ `${ styles.iconBtn } ${ paused ? styles.iconBtnPaused : '' }` }
                    onClick={ togglePause }
                    title={ paused ? `Resume  (P) — ${ pausedCount } buffered` : 'Pause  (P)' }
                    aria-label={ paused ? 'Resume' : 'Pause' }
                >
                    { paused ? (
                        /* Play icon */
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <polygon points="4,2 14,8 4,14" fill="currentColor" />
                        </svg>
                    ) : (
                        /* Pause icon */
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <rect x="3" y="2" width="4" height="12" rx="1" fill="currentColor" />
                            <rect x="9" y="2" width="4" height="12" rx="1" fill="currentColor" />
                        </svg>
                    ) }
                    { paused && pausedCount > 0 && (
                        <span className={ styles.pauseBadge }>{ pausedCount }</span>
                    ) }
                </button>

                <div className={ styles.divider } />

                {/* View mode tabs */}
                { VIEW_MODES.map( ( mode ) => (
                    <button
                        key={ mode }
                        className={ `${ styles.modeBtn } ${ viewMode === mode ? styles.modeBtnActive : '' }` }
                        onClick={ () => setViewMode( mode ) }
                    >
                        { mode }
                    </button>
                ) ) }

                {/* Floating search dropdown */}
                { searchOpen && (
                    <div className={ `${ styles.searchDropdown } ${ regexError ? styles.searchDropdownError : '' }` }>
                        <svg className={ styles.searchDropdownIcon } width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" />
                            <line x1="9.9" y1="9.9" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        <input
                            ref={ inputRef }
                            type="text"
                            className={ styles.searchInput }
                            placeholder={ useRegex ? 'regex pattern…' : 'search by label, file, function…' }
                            value={ searchQuery }
                            onChange={ ( e ) => setSearchQuery( e.target.value ) }
                            onKeyDown={ handleSearchKey }
                        />
                        { searchQuery && (
                            <button
                                className={ styles.searchClear }
                                onClick={ () => setSearchQuery( '' ) }
                                aria-label="Clear search"
                            >✕</button>
                        ) }
                        {/* Regex toggle */}
                        <button
                            className={ `${ styles.regexBtn } ${ useRegex ? styles.regexBtnActive : '' }` }
                            onClick={ () => setUseRegex( !useRegex ) }
                            title="Toggle regex mode"
                        >.*</button>
                    </div>
                ) }
                { searchOpen && regexError && (
                    <div className={ styles.regexErrorTip }>{ regexError }</div>
                ) }
            </div>

            {/* ── Center: status pill ── */}
            <div className={ styles.center }>
                <div className={ `${ styles.statusPill } ${ connected ? styles.statusPillConnected : '' }` }>
                    <span className={ `${ styles.dot } ${ connected ? styles.dotConnected : '' }` } />
                    <span className={ `${ styles.statusTxt } ${ connected ? styles.statusTxtConnected : '' }` }>
                        { connected
                            ? <>Server ready<span className={ styles.listening }> · listening</span></>
                            : 'Server offline'
                        }
                    </span>
                    { clientCount !== null && (
                        <span className={ styles.clientCount } title="Connected tabs">
                            · { clientCount }{ clientCount === 1 ? ' tab' : ' tabs' }
                        </span>
                    ) }
                </div>
            </div>

            {/* ── Right: clear ── */}
            <div className={ styles.right }>
                <button
                    className={ styles.clearBtn }
                    onClick={ clear }
                    disabled={ !hasLogs }
                    title="Clear  (C)"
                >
                    Clear
                </button>
            </div>

        </header>
    );
}
