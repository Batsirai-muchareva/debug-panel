export type ExtendedWindow = Window & {
    devDebugTool: {
        nonce: string;
        base_url: string;
        database_ajax_action: string;
        kit_id: string;
        meta_keys: {
            post: string;
            variables: string;
            global_classes: string;
        }
    }
}

export function getSettings() {
    const { devDebugTool } = window as unknown as ExtendedWindow;

    return {
        nonce: devDebugTool.nonce,
        baseUrl: devDebugTool.base_url,
        databaseAjaxAction: devDebugTool.database_ajax_action,
        kitId: devDebugTool.kit_id,
        metaKeys: devDebugTool.meta_keys
    }
}
