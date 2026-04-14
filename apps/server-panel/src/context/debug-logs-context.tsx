import {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from 'react';

import { useWebSocket } from '../hooks/use-web-socket';

type Frame = {
    file: string;
    function: string;
    line: 341;
}

type Backtrace = {
    callerFunction: string;
    lineNumber: number;
    pathToSource: string;
    sourceName: string;
    frames: Frame[]
};

export type LogItem = {
    id: string;
    time: string;
    label: string;
    payload: Payload[];
    backtrace: Backtrace;

    index: number;
};

type Payload = {
    type: string;
    content: string;
};

interface DebugLogsContextValue {
    logs: LogItem[];
    connected: boolean;
    clear: () => void;
}

const DebugLogsContext = createContext<DebugLogsContextValue | null>( null );

export const DebugLogsProvider = ( { children }: PropsWithChildren ) => {
    const [ logs, setLogs ] = useState<LogItem[]>( [] );

    const handleMessage = useCallback( ( event: MessageEvent ) => {
        try {
            const raw = JSON.parse( event.data ) as Omit<LogItem, 'index'>;

            console.log( raw );

            setLogs( ( prev ) => [
                ...prev,
                { ...raw, index: prev.length + 1 },
            ] );
        } catch {
            // Silently ignore malformed messages
        }
    }, [] );

    const { connected } = useWebSocket( { onMessage: handleMessage } );

    const clear = useCallback( () => setLogs( [] ), [] );

    return (
        <DebugLogsContext.Provider value={ { logs, connected, clear } }>
            { children }
        </DebugLogsContext.Provider>
    )
}

export function useDebugLogs() {
    const ctx = useContext( DebugLogsContext );

    if ( ! ctx ) {
        throw new Error( 'useDebugLogs must be used within DebugLogsProvider' );
    }

    return ctx;
}
