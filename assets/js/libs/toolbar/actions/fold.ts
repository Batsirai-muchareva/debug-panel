import { eventBus } from "@libs/events";

import { defineAction } from "./registry/define-action";

export const fold = defineAction( {
    id: 'fold',
    title: 'Fold', // TODO: has to be dynamicchanging according to state or maybe not is just collapse at that time
    icon: 'fold',
    onExecute() {
        eventBus.emit( 'json:fold:all' )
    },
} )
