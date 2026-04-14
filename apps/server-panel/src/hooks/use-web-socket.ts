import { useEffect, useRef, useState } from 'react';

import { WEB_SOCKET_PORT } from '@debug-panel/constants';

interface UseWebSocketOptions {
    onMessage: ( event: MessageEvent ) => void;
}

const WS_URL = `ws://localhost:${ WEB_SOCKET_PORT }`;

export function useWebSocket( { onMessage }: UseWebSocketOptions ) {
    const [connected, setConnected] = useState( false );
    const onMessageRef = useRef( onMessage );

    // Keep the callback ref current without re-subscribing the socket
    useEffect( () => {
        console.log('Runnign useeffect on message assign')
        onMessageRef.current = onMessage;
    } );

    useEffect( () => {
        const ws = new WebSocket( WS_URL );

        ws.onopen = () => setConnected( true );
        ws.onclose = () => setConnected( false );
        ws.onerror = () => setConnected( false );
        ws.onmessage = ( event ) => onMessageRef.current( event );

        return () => ws.close();
    }, [] );

    return { connected };
}
