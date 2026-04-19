<?php
/**
 * Plugin Name: Debug Panel
 * Plugin URI: https://github.com/Batsirai-muchareva/debug-panel
 * Description: A developer tool that provides real-time database and editor schema viewing within the Elementor editor.
 * Version: 1.0.3
 * License: GPL v2 or later
 * Text Domain: debug-panel
 * Requires at least: 6.2
 * Tested up to: 6.4
 * Requires PHP: 7.4
 */

if ( ! defined('ABSPATH') ) {
		exit;
}

define( 'DEBUG_PANEL_VERSION', '1.0.3' );
define( 'DEBUG_PANEL_FILE', __FILE__);
define( 'DEBUG_PANEL_PATH', plugin_dir_path( __FILE__ ) );
define( 'DEBUG_PANEL_URL', plugin_dir_url( __FILE__ ) );

const DEBUG_ACTIVE_TRANSIENT_KEY = 'dev_debug_tool_activated';

require_once DEBUG_PANEL_PATH . 'src/autoload.php';
require_once DEBUG_PANEL_PATH . 'vendor/autoload.php';

register_activation_hook( DEBUG_PANEL_FILE, function() {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';

		if ( ! is_plugin_active( 'elementor/elementor.php' ) ) {
				deactivate_plugins( plugin_basename( DEBUG_PANEL_FILE ) );

				wp_die(
						__( 'Dev Debug Tool requires Elementor to be installed and activated.', 'dev-debug-tool' )
				);
		}

		set_transient( DEBUG_ACTIVE_TRANSIENT_KEY, true, 30 );
} );

register_deactivation_hook( DEBUG_PANEL_FILE, function (): void {
		delete_transient( DEBUG_ACTIVE_TRANSIENT_KEY );
} );

add_action( 'plugins_loaded', function (): void {
		if ( ! did_action( 'elementor/loaded' ) ) {
				return;
		}

		DevDebugTool\App::init();
} );
