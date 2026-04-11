// src/hooks/use-debug-logs.ts
import { useEffect,useState } from 'react';

export type LogItem = {
    index: number;
    language: 'PHP' | 'JS';
    data: unknown;
    file: string;
    method: string;
    line: number;
    time: string;
};

export const useDebugLogs = () => {
    const [logs, setLogs] = useState<LogItem[]>( [] );
    const [connected, setConnected] = useState( false );

    useEffect( () => {
        const ws = new WebSocket( 'ws://localhost:9002' );

        ws.onopen = () => setConnected( true );
        ws.onclose = () => setConnected( false );

        ws.onmessage = ( event ) => {
            const payload = JSON.parse( event.data );

            setLogs( ( prev ) => [
                ...prev,
                { ...payload, index: prev.length + 1 },
            ] );
        };

        return () => ws.close();
    }, [] );

    return { logs, connected };
};
