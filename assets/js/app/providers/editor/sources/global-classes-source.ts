import { elementorAdapter } from "@libs/adapters";
import { GlobalClasses } from "@libs/adapters";

import { createSource } from "@app/source-manager/create-source";

const POLL_INTERVAL = 1000;

const INACTIVITY_LIMIT = 2 * 60 * 1000;

export const globalClassesSource = createSource< GlobalClasses, { onIdle?: () => void } >(
    ( notify, config ) => {
    let intervalId: number | null = null;
    let lastSnapshot: GlobalClasses | null = null;
    let lastActivity = 0;

    const poll = () => {
        const current = elementorAdapter.getUsedGlobalClassesSnapshot();

        if ( JSON.stringify( current ) !== JSON.stringify( lastSnapshot ) ) {
            lastSnapshot = current;
            lastActivity = Date.now();
            notify?.( current );
        }

        if ( Date.now() - lastActivity > INACTIVITY_LIMIT ) {
            stop();

            if ( config?.onIdle ) {
                config?.onIdle()
            }
        }
    }

    return {
        setup() {
            if ( intervalId !== null ) {
                return;
            }

            lastSnapshot = elementorAdapter.getUsedGlobalClassesSnapshot();
            lastActivity = Date.now();

            notify?.( lastSnapshot );

            intervalId = window.setInterval( poll, POLL_INTERVAL );
        },
        teardown() {
            if ( intervalId === null ) {
                return;
            }

            clearInterval( intervalId );
            intervalId = null;
            lastSnapshot = null;
        }
    }
} )
