import { ActionConfig } from "./define-action";

const actions: Record<string, ActionConfig> = {}

export const registerAction = ( action: ActionConfig ) => {
    actions[action.id] = action
}

export const getActions = () => Object.values(actions)
