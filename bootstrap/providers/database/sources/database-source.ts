import { wordPressAdapter } from "@debug-panel/adapters";
import { eventBus } from '@debug-panel/events';

import { createSource } from '@debug-panel/dev-panel-sdk';

export const databaseSource = ( { metaKey, postId }: { metaKey: string; postId: string; } ) => {
    return createSource( ( { notify } ) => {
        let unsubscribePublish: (() => void) | null = null;
        let isFetching = false;

        const fetchData = async () => {
            if (isFetching) {
                console.debug(
                    '[DatabaseSource] Fetch already in progress, skipping',
                );

                return;
            }

            isFetching = true;

            try {
                const result = await wordPressAdapter.fetch({
                    meta_key: metaKey,
                    post_id: postId,
                });

                if (result.success) {
                    notify?.(result.data);
                }
            } catch (e) {
                notify?.(null);
            } finally {
                isFetching = false;
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
                isFetching = false;
            },
        };
    } )
}

// export const databaseSource = createSource<DatabaseData>( ( { notify } ) => {
//
//     const { metaKey, postId } = config;
//
// });
