import { Search, SearchIndicator } from '@debug-panel/search';

import { defineAction } from '../define-action';

export const search = defineAction( {
    id: 'search',
    title: '',
    icon: 'search',
    panel: Search,
    indicator: SearchIndicator
} )

