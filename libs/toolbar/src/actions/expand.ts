import { eventBus } from '@debug-panel/events';

import { defineAction } from "../define-action"

export const expand = defineAction( {
    id: 'expand',
    title: 'Expand',
    icon: 'expand',
    stateless: true,
    onExecute() {
        eventBus.emit( 'json:expand:all' )
    },
} )
