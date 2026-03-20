import { Search as SearchComponent } from "@libs/search";

import { defineAction } from "./registry/define-action"

export const search = defineAction( {
    id: 'search',
    title: '',
    icon: 'search',
    onExecute( { setState, isActive } ) {
        setState( ! isActive )
    },
    component: SearchComponent
} )

