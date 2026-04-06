export type ExtendedWindow = Window & {
  debugPanelConfig: {
    nonce: string;
    base_url: string;
    database_ajax_action: string;
    kit_id: string;
    meta_keys: {
      post: string;
      variables: string;
      global_classes: string;
    };
  };
};

export function getSettings() {
    const { debugPanelConfig } = window as unknown as ExtendedWindow;

    return {
        nonce: debugPanelConfig.nonce,
        baseUrl: debugPanelConfig.base_url,
        databaseAjaxAction: debugPanelConfig.database_ajax_action,
        kitId: debugPanelConfig.kit_id,
        metaKeys: debugPanelConfig.meta_keys
    }
}
