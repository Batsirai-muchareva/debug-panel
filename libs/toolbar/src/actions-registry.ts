import type { ActionConfig } from "./define-action";

const actions: Record<string, ActionConfig> = {}

export const registerAction = ( action: ActionConfig ) => {
    actions[ action.id ] = action
}

export const getActions = () => {
    return Object.values( actions );
}

export const findAction = ( id: string ) => {
    return actions[ id ];
}
