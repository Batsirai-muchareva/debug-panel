import { elementorAdapter } from "@libs/adapters";

import { createError } from "./create-error";
import { http } from "./http";

export interface IWordPressAdapter {
    fetch<R>( { post_id, meta_key }: { post_id: string; meta_key: string } ): Promise<{
        success: boolean;
        data?: R;
        error?: { message: string };
    }>;
}

const isHttpError = ( error: unknown ) =>
    typeof error === "object" &&
    error !== null &&
    'status' in error &&
    'message' in error;

const createWordPressAdapter = (): IWordPressAdapter => {
    const api = http();

    return {
        fetch: async ( { post_id, meta_key }: { post_id: string; meta_key: string } ) => {
            try {
                const params = new URLSearchParams( {
                    action: elementorAdapter.settings.databaseAjaxAction,
                    post_id,
                    meta_key,
                } );

                const response = await api.post(  params );

                if ( response.data.success ) {
                    return {
                        success: true,
                        data: response.data.data.schema,
                    } as any
                }
            } catch ( e ) {
                if ( isHttpError( e ) ) {
                    return {
                        success: false,
                        error: createError(
                            e.status as number,
                            e.message as string
                        )
                    }
                }
            }
        },

    }
}

export const wordPressAdapter = createWordPressAdapter()
