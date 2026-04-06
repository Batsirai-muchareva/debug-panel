import { elementorAdapter, type GlobalClasses } from '@debug-panel/adapters';
import { createSource } from '@debug-panel/dev-panel-sdk';

const POLL_INTERVAL = 1000;

const INACTIVITY_LIMIT = 2 * 60 * 1000;

export const globalClassesSource = createSource<GlobalClasses>( ( { notify } ) => {
    let intervalId: number | null = null;
    let lastSnapshot: any | null = null;
    let lastActivity = 0;

    const poll = () => {
        const current = elementorAdapter.getUsedGlobalClassesSnapshot();

        if (JSON.stringify(current) !== JSON.stringify(lastSnapshot)) {
            lastSnapshot = current;
            lastActivity = Date.now();
            notify?.(current);
        }

        if (Date.now() - lastActivity > INACTIVITY_LIMIT) {
            stop();

            // if (config?.onIdle) { GlobalClasses
            //     config?.onIdle();
            // }
        }
    };

    return {
        setup: () => {
            if (intervalId !== null) {
                return;
            }

            lastSnapshot = elementorAdapter.getUsedGlobalClassesSnapshot();
            lastActivity = Date.now();

            notify?.(lastSnapshot);

            intervalId = window.setInterval(poll, POLL_INTERVAL);
        },
        teardown: () => {
            if (intervalId === null) {
                return;
            }

            clearInterval(intervalId);
            intervalId = null;
            lastSnapshot = null;
        },
    };
});
