import { eventBus } from "@libs/events";

import { defineAction } from "./registry/define-action";

export const expand = defineAction( {
    id: 'expand',
    title: 'Expand', // TODO: has to be dynamicchanging according to state or maybe not is just collapse at that time
    icon: 'expand',
    onExecute() {
        eventBus.emit( 'json:expand:all' )
    },
} )
