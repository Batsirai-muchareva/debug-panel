import { wordPressAdapter } from "@debug-panel/adapters";
import { createSource } from '@debug-panel/dev-panel-sdk';
import { eventBus } from '@debug-panel/events';

export const databaseSource = ( { metaKey, postId }: { metaKey: string; postId: string; } ) => {
    return createSource( ( { notify } ) => {
        let unsubscribePublish: (() => void) | null = null;

        const fetchData = async () => {
            try {
                const result = await wordPressAdapter.fetch( {
                    meta_key: metaKey,
                    post_id: postId,
                } );

                if ( result.success ) {
                    notify?.( result.data );
                }
            } catch ( e ) {
                notify?.(null);
            }
        };

        return {
            setup: async () => {
                await fetchData();

                unsubscribePublish = eventBus.on(
                    'document:published',
                    async () => await fetchData(),
                );
            },
            teardown: () => {
                unsubscribePublish?.();
                unsubscribePublish = null;
            },
        };
    } )
}
