import { wordPressAdapter } from "@app/adapters";
import { getSettings } from "@app/sync/get-settings";
import { DatabaseData, SourceConfig } from "@app/providers/database/types";
import { Unsubscribe } from "@app/types";
import { eventBus } from "@app/events";
import { createSource } from "@app/source-manager/create-source";

export const databaseSource = createSource< DatabaseData, SourceConfig >( ( notify, config ) => {
    let unsubscribePublish: Unsubscribe | null = null;
    let isFetching = false;

    const { databaseAjaxAction } = getSettings();
    const { metaKey, postId } = config;

    const fetchData = async () => {
        if ( isFetching ) {
            console.debug( '[DatabaseSource] Fetch already in progress, skipping' );

            return;
        }

        isFetching = true;

        try {
            const result = await wordPressAdapter.fetch( databaseAjaxAction, {
                meta_key: metaKey,
                post_id: postId,
            } )

            if ( result.success ) {
                notify?.( result.data )
            }

        } catch ( e ) {
            notify?.( null );
        } finally {
            isFetching = false;
        }
    };

    return {
        setup: async () => {
            await fetchData();

            unsubscribePublish = eventBus.on( 'document:published', async () => await fetchData() )
        },
        teardown: () => {
            unsubscribePublish?.();
            unsubscribePublish = null;
            isFetching = false;
        },
    }
} )
