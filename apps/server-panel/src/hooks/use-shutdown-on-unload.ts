import { useEffect } from "react";

import { WS_SERVER_HTTP_PORT } from '@debug-panel/constants';

const SHUTDOWN_URL = `http://localhost:${ WS_SERVER_HTTP_PORT }/shutdown`;

export function useShutdownOnUnload(): void {
    useEffect( () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if ( import.meta.env.DEV ) {
            return;
        }

        const handler = () => {
            navigator.sendBeacon( SHUTDOWN_URL );
        };

        window.addEventListener( "beforeunload", handler );

        return () => {
            window.removeEventListener( "beforeunload", handler );
        };
    }, [] );
}
