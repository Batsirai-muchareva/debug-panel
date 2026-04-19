import {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { useWebSocket } from '../hooks/use-web-socket';

// ─── Types ────────────────────────────────────────────────────────────────────

type Frame = {
    file: string;
    function: string;
    line: number;
};

type Backtrace = {
    callerFunction: string;
    lineNumber: number;
    pathToSource: string;
    sourceName: string;
    frames: Frame[];
};

type Payload = {
    type: string;
    content: string;
};

/** Shape received from WebSocket */
type RawMessage = {
    id: string;
    time: string;
    label: string;
    payload: Payload[];
    backtrace: Backtrace;
};

/** Internally stored log (client-enriched) */
type RawLog = RawMessage & {
    index: number;
    receivedAt: number; // Date.now() when message arrived
};

/** Public log item exposed to components */
export type LogItem = RawLog & {
    pinned: boolean;
    isDuplicate: boolean;
};

export type ViewMode  = 'all' | 'pinned' | 'diff';
export type TimeRange = 'all' | '1m' | '5m' | '30m';

export const LOG_LIMIT_PRESETS = [ 50, 100, 200, 500 ] as const;
export type LogLimit = typeof LOG_LIMIT_PRESETS[number];

const TIME_RANGE_MS: Record<TimeRange, number> = {
    all:  Infinity,
    '1m': 60_000,
    '5m': 300_000,
    '30m': 1_800_000,
};

export type Stats = {
    total: number;
    uniqueLabels: number;
    repeated: number;
    pinned: number;
};

// ─── Context interface ────────────────────────────────────────────────────────

interface DebugLogsContextValue {
    // Logs
    logs: LogItem[];
    filteredLogs: LogItem[];
    stats: Stats;
    uniqueLabels: string[];

    // Connection
    connected: boolean;

    // Actions
    clear: () => void;
    togglePin: ( id: string ) => void;

    // View mode
    viewMode: ViewMode;
    setViewMode: ( mode: ViewMode ) => void;

    // Label filter
    disabledLabels: Set<string>;
    toggleLabel: ( label: string ) => void;

    // Time range filter
    timeRange: TimeRange;
    setTimeRange: ( r: TimeRange ) => void;

    // Log limit
    logLimit: LogLimit;
    setLogLimit: ( n: LogLimit ) => void;

    // Pause / Resume
    paused: boolean;
    pausedCount: number;
    togglePause: () => void;

    // Timeline highlight
    highlightedId: string | null;
    setHighlightedId: ( id: string | null ) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DebugLogsContext = createContext<DebugLogsContextValue | null>( null );

export const DebugLogsProvider = ( { children }: PropsWithChildren ) => {
    const [ rawLogs, setRawLogs ] = useState<RawLog[]>( [] );
    const [ pinnedIds, setPinnedIds ] = useState<Set<string>>( new Set() );

    const [ viewMode, setViewMode ] = useState<ViewMode>( 'all' );
    const [ disabledLabels, setDisabledLabels ] = useState<Set<string>>( new Set() );
    const [ timeRange, setTimeRange ] = useState<TimeRange>( 'all' );
    const [ logLimit, setLogLimit ] = useState<LogLimit>( 100 );

    const [ paused, setPaused ] = useState( false );
    const [ pausedCount, setPausedCount ] = useState( 0 );

    const [ highlightedId, setHighlightedId ] = useState<string | null>( null );

    // Refs so callbacks always see the latest values without re-subscription
    const pausedRef    = useRef( false );
    const logLimitRef  = useRef<LogLimit>( 100 );
    const bufferRef    = useRef<RawLog[]>( [] );

    useEffect( () => { pausedRef.current   = paused;    }, [ paused ] );
    useEffect( () => { logLimitRef.current = logLimit;  }, [ logLimit ] );

    // Flush buffer when unpausing
    useEffect( () => {
        if ( paused || bufferRef.current.length === 0 ) return;

        setRawLogs( ( current ) => {
            const startIdx = current.length;
            const flushed  = bufferRef.current.map( ( log, i ) => ( {
                ...log,
                index: startIdx + i + 1,
            } ) );
            bufferRef.current = [];
            const combined = [ ...current, ...flushed ];
            return combined.length > logLimitRef.current
                ? combined.slice( combined.length - logLimitRef.current )
                : combined;
        } );
        setPausedCount( 0 );
    }, [ paused ] );

    // ── WebSocket ────────────────────────────────────────────────────────────

    const handleMessage = useCallback( ( event: MessageEvent ) => {
        try {
            const raw = JSON.parse( event.data ) as RawMessage;

            if ( pausedRef.current ) {
                // Buffer the log — index will be assigned on flush
                bufferRef.current.push( {
                    ...raw,
                    index: -1, // placeholder
                    receivedAt: Date.now(),
                } );
                setPausedCount( ( c ) => c + 1 );
                return;
            }

            setRawLogs( ( prev ) => {
                const newLog: RawLog = {
                    ...raw,
                    index: prev.length + 1,
                    receivedAt: Date.now(),
                };
                const next = [ ...prev, newLog ];
                return next.length > logLimitRef.current
                    ? next.slice( next.length - logLimitRef.current )
                    : next;
            } );
        } catch {
            // Silently ignore malformed messages
        }
    }, [] );

    const { connected } = useWebSocket( { onMessage: handleMessage } );

    // ── Actions ──────────────────────────────────────────────────────────────

    const clear = useCallback( () => {
        setRawLogs( [] );
        setPinnedIds( new Set() );
        setHighlightedId( null );
        bufferRef.current = [];
        setPausedCount( 0 );
    }, [] );

    const togglePin = useCallback( ( id: string ) => {
        setPinnedIds( ( prev ) => {
            const next = new Set( prev );
            next.has( id ) ? next.delete( id ) : next.add( id );
            return next;
        } );
    }, [] );

    const toggleLabel = useCallback( ( label: string ) => {
        setDisabledLabels( ( prev ) => {
            const next = new Set( prev );
            next.has( label ) ? next.delete( label ) : next.add( label );
            return next;
        } );
    }, [] );

    const togglePause = useCallback( () => setPaused( ( p ) => !p ), [] );

    // ── Derived data ─────────────────────────────────────────────────────────

    const logs = useMemo<LogItem[]>( () => {
        const seen = new Set<string>();
        return rawLogs.map( ( log ) => {
            const key = `${ log.label }|${ log.backtrace?.sourceName }|${ log.backtrace?.lineNumber }`;
            const isDuplicate = seen.has( key );
            seen.add( key );
            return { ...log, pinned: pinnedIds.has( log.id ), isDuplicate };
        } );
    }, [ rawLogs, pinnedIds ] );

    const uniqueLabels = useMemo(
        () => Array.from( new Set( logs.map( ( l ) => l.label ) ) ),
        [ logs ]
    );

    const filteredLogs = useMemo( () => {
        const now    = Date.now();
        const cutoff = timeRange === 'all' ? 0 : now - TIME_RANGE_MS[ timeRange ];

        return logs.filter( ( log ) => {
            if ( disabledLabels.has( log.label ) ) return false;
            if ( viewMode === 'pinned' && !log.pinned ) return false;
            if ( viewMode === 'diff'   && !log.isDuplicate ) return false;
            if ( timeRange !== 'all'  && log.receivedAt < cutoff ) return false;
            return true;
        } );
    }, [ logs, disabledLabels, viewMode, timeRange ] );

    const stats = useMemo<Stats>( () => ( {
        total: logs.length,
        uniqueLabels: uniqueLabels.length,
        repeated: logs.filter( ( l ) => l.isDuplicate ).length,
        pinned: logs.filter( ( l ) => l.pinned ).length,
    } ), [ logs, uniqueLabels ] );

    // ── Provider ─────────────────────────────────────────────────────────────

    return (
        <DebugLogsContext.Provider value={ {
            logs, filteredLogs, stats, uniqueLabels,
            connected,
            clear, togglePin,
            viewMode, setViewMode,
            disabledLabels, toggleLabel,
            timeRange, setTimeRange,
            logLimit, setLogLimit,
            paused, pausedCount, togglePause,
            highlightedId, setHighlightedId,
        } }>
            { children }
        </DebugLogsContext.Provider>
    );
};

export function useDebugLogs() {
    const ctx = useContext( DebugLogsContext );
    if ( !ctx ) throw new Error( 'useDebugLogs must be used within DebugLogsProvider' );
    return ctx;
}
