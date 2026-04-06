"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = getSettings;
function getSettings() {
    const { debugPanelConfig } = window;
    return {
        nonce: debugPanelConfig.nonce,
        baseUrl: debugPanelConfig.base_url,
        databaseAjaxAction: debugPanelConfig.database_ajax_action,
        kitId: debugPanelConfig.kit_id,
        metaKeys: debugPanelConfig.meta_keys
    };
}
