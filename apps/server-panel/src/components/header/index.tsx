import { type ViewMode, useDebugLogs } from '../../context/debug-logs-context';
import { useClientCount } from '../../hooks/use-client-count';

import styles from './header.module.scss';

const VIEW_MODES: ViewMode[] = [ 'all', 'pinned', 'diff' ];

export function Header() {
    const {
        connected, clear, logs,
        viewMode, setViewMode,
        paused, pausedCount, togglePause,
    } = useDebugLogs();

    const clientCount = useClientCount();
    const hasLogs     = logs.length > 0;

    return (
        <header className={ styles.header }>

            {/* ── Left: pause + view modes ── */}
            <div className={ styles.left }>

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
