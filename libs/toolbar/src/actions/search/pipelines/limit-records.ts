import type { ListCategory } from '../../../types';

const LIMIT_CONFIG = {
    key: 5,
    path: 10,
} as const;

export const limitCategories = ( categories: ListCategory[] ): ListCategory[] => {
    return categories
        .map( cat => ( {
            ...cat,
            items: cat.items.slice( 0, LIMIT_CONFIG[ cat.type as keyof typeof LIMIT_CONFIG ] ?? LIMIT_CONFIG.path ),
        } ) )
        .filter( cat => cat.items.length > 0 );
};
