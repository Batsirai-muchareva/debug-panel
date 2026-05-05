import { defineAction } from '../../define-action';
import { SearchIndicator } from './components/search-indicator';
import { Search } from './search';

export const search = defineAction( {
    id: 'search',
    title: '',
    icon: 'search',
    panel: Search,
    indicator: SearchIndicator
} )

