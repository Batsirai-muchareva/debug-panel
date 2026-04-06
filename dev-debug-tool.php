<?php
/**
 * Plugin Name: Dev Debug Tool
 * Plugin URI: https://github.com/Batsirai-muchareva/dev-debug-tool
 * Description: A developer tool that provides real-time database and editor schema viewing within the Elementor editor.
 * Version: 1.0.2
 * License: GPL v2 or later
 * Text Domain: dev-debug-tool
 * Requires at least: 6.2
 * Tested up to: 6.4
 * Requires PHP: 7.4
 */

if ( ! defined('ABSPATH') ) {
		exit;
}

const DEBUG_ACTIVE_TRANSIENT_KEY = 'dev_debug_tool_activated';

//require 'vendor/autoload.php';

define( 'DEV_DEBUG_TOOL_VERSION', '1.0.2' );
define( 'DEV_DEBUG_TOOL_FILE', __FILE__);
define( 'DEV_DEBUG_TOOL_PATH', plugin_dir_path( __FILE__ ) );
define( 'DEV_DEBUG_TOOL_URL', plugin_dir_url( __FILE__ ) );

register_activation_hook( DEV_DEBUG_TOOL_FILE, function() {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';

		if ( ! is_plugin_active( 'elementor/elementor.php' ) ) {
				deactivate_plugins( plugin_basename( DEV_DEBUG_TOOL_FILE ) );

				wp_die(
						__( 'Dev Debug Tool requires Elementor to be installed and activated.', 'dev-debug-tool' )
				);
		}

		set_transient( DEBUG_ACTIVE_TRANSIENT_KEY, true, 30 );
} );

register_deactivation_hook( __FILE__, function() {
		delete_transient( DEBUG_ACTIVE_TRANSIENT_KEY );
} );

add_action( 'plugins_loaded', function () {
		if ( ! did_action( 'elementor/loaded' ) ) {
				return;
		}


		require_once DEV_DEBUG_TOOL_PATH . 'src/app.php';
		require_once DEV_DEBUG_TOOL_PATH . 'src/database_ajax.php';
		require_once DEV_DEBUG_TOOL_PATH . 'src/assets.php';
		require_once DEV_DEBUG_TOOL_PATH . 'src/vite.php';

		DevDebugTool\App::init();
} );
