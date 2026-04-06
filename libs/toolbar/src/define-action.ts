import type { ComponentType } from "react";

import type { IconName } from '@debug-panel/icons';
import { showNotification as notify } from "@debug-panel/notification";

export type ExecuteContext = {
    bind: string;
    data: unknown;
    onSetState: () => void;
};

export type ActionConfig = {
    id: string;
    icon: IconName;
    title?: string;
    persist?: boolean;
    stateless?: boolean;
    indicator?: ComponentType<{ state: boolean}>;
    panel?: ComponentType<{ onClose: () => void; data: unknown }>;
    onExecute?: ( ctx: ExecuteContext ) => Promise<void> | void;
    options?: {
        success?: {
            message?: string;
        }
    }
}

export function defineAction(
    action: ActionConfig,
): ActionConfig {
    return {
        ...action,
        onExecute: async ( ctx ) => {
            try {
                if ( ! action.onExecute && ! action.stateless ) {
                    ctx.onSetState();
                }

                if ( action.onExecute ) {
                    await action.onExecute( ctx );
                }

                if ( action?.options?.success?.message ) {
                    notify( { message: action?.options?.success?.message } );
                }
            } catch ( error ) {
                const message = error instanceof Error ? error.message : "Unknown error";

                notify( { message, type: "error" } );
            }
        },
    };
}
