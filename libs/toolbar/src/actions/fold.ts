import { eventBus } from '@debug-panel/events';

import { defineAction } from "../define-action"

export const fold = defineAction( {
    id: 'fold',
    title: 'Fold',
    icon: 'fold',
    stateless: true,
    onExecute() {
        eventBus.emit( 'json:fold:all' )
    },
} )
