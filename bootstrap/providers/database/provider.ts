import { registerProvider } from '@debug-panel/dev-panel-sdk';
import { databaseSource } from './sources/database-source';
import { elementorAdapter } from '@debug-panel/adapters';

export const registerDatabaseProvider = () => {
    const { metaKeys, kitId } = elementorAdapter.settings;

    registerProvider( {
        id: 'database',
        title: 'Database',
        order: 1,
        variants: [
            {
                id: 'post',
                label: 'Post',
                order: 1,
                source: databaseSource( {
                    metaKey: metaKeys.post,
                    postId: elementorAdapter.postId,
                } )
            },
            {
                id: 'variables',
                label: 'Variables',
                order: 2,
                source: databaseSource( {
                    metaKey: metaKeys.variables,
                    postId: kitId,
                } ),
            },
            {
                id: 'global_classes',
                label: 'Classes',
                order: 3,
                source: databaseSource( {
                    metaKey: metaKeys.global_classes,
                    postId: kitId,
                } ),
            }
        ]
    } )
}
