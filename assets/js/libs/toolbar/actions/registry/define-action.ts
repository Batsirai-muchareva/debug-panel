import { ComponentType } from "@wordpress/element";

import { showNotification } from "@libs/notification";
import { Data } from "@libs/types";

export type ActionContext = {
    bind: string;
};

export type ActionExecutionContext = ActionContext & {
    data: Data;
    isActive: boolean;
    setState: ( active: boolean ) => void;  // no more persist arg, action declares it via config
};

export type ActionConfig = {
    id: string;
    icon: string;
    title?: string;
    persist?: boolean;  // ← declares if this action should persist to localStorage
    component?: ComponentType<{ isActive: boolean; }>;  // ← typed
    onExecute?: ( ctx: ActionExecutionContext ) => Promise<void> | void;
}

type DefineActionOptions = {
    successMessage?: string;
};

export function defineAction(
    action: ActionConfig,
    options?: DefineActionOptions
): ActionConfig {
    return {
        ...action,
        onExecute: async ( ctx) => {
            // if ( ! Boolean( args[0] ) ) {
            //     return showNotification( `No content to ${ action.title }`, "warning" );
            // }

            try {
                await action.onExecute?.( ctx );

                // await action.onClick?.( ...args );

                // TODO a better notification
                if ( options?.successMessage ) {
                    showNotification( options.successMessage );
                }
            } catch ( error ) {
                const message = error instanceof Error ? error.message : "Unknown error";

                showNotification( message, "error" );
            }
        },
    };
}
