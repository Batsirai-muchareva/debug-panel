import { getAllPaths } from './utils/get-all-paths';

export const getRecentSearches = () => {
    return [
        {
            label: 'Recent Searches',
            type: 'recent',
            items: getAllPaths().slice( 150, 160 )
        }
    ]
};
