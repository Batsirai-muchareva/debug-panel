import { defineAction } from "./registry/define-action"

export const highlight = defineAction( {
    id: 'highlight',
    title: 'Highlight',
    icon: 'highlight',
    persist: true,
    onExecute( { setState, isActive } ) {
        setState( ! isActive );
    },
} );
