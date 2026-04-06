<?php

namespace DevDebugTool;

use Elementor\Plugin;

class Assets {
		public $name = "batsirai";

		private Vite $vite;

		const VITE_APP_HANDLER = 'vite-app';

		const SLOT_ID = 'debug-panel-slot';

		public function __construct() {
				$this->vite = new Vite( 'src/main.tsx' );
		}

		const ASSETS_PATH = DEV_DEBUG_TOOL_URL . '/build/';

		public function register_hooks(): void {
				add_action('elementor/editor/after_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
				add_action( 'elementor/editor/after_enqueue_styles', [ $this, 'enqueue_styles' ] );
				add_action( 'elementor/editor/v2/init', [ $this, 'print_html_slot' ] );
		}

		public function enqueue_scripts(): void {
				$this->print_localised_settings();

				if ($this->vite->is_running()) {
						// ⚡ Vite HMR
						$this->vite->enqueue_hmr_scrips( self::VITE_APP_HANDLER );

						return;
				}

				$handle = 'debug-debug-tool';

				wp_enqueue_script(
						$handle,
						self::ASSETS_PATH . 'debug-panel.iife.js',
						[],
						'1.0.0',
						true
				);
		}

		private function print_localised_settings(): void {
				add_action('wp_head', function() {
						$config = [
								'slot_id' => self::SLOT_ID,
								'base_url' => admin_url('admin-ajax.php'),
								'nonce' => wp_create_nonce( Database_Ajax::NONCE_DEV_DEBUG_KEY ),
								'database_ajax_action' => Database_Ajax::AJAX_DEV_DEBUG_KEY,
								'kit_id' => Plugin::$instance->kits_manager->get_active_id(),
								'meta_keys' => [
										'post' => Database_Ajax::POST_META_KEY,
										'variables' => Database_Ajax::VARIABLES_META_KEY,
										'global_classes' => Database_Ajax::GLOBAL_CLASSES_META_KEY,
								]
						];

						echo '<script>window.debugPanelConfig = ' . wp_json_encode( $config ) . ';</script>';
				}, 5);
		}

		public function enqueue_styles(): void {
				if ( ! $this->vite->is_running() ) {
						wp_enqueue_style(
								'dev-debug-tool',
								self::ASSETS_PATH . 'debug-panel.css',
								[],
								DEV_DEBUG_TOOL_VERSION,
						);
				}
				/**
				 * if (!$this->vite->is_running()) {
				 * wp_enqueue_style(
				 * 'dev-debug-tool',
				 * plugin_dir_url(__FILE__) . '../build/dev-panel/dev-panel.css',
				 * [],
				 * DEV_DEBUG_TOOL_VERSION
				 * );
				 * }
				 */

				wp_enqueue_style(
						'myplugin-manrope',
						'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap',
						array(),
						null
				);
		}

		public function print_html_slot(): void {
				add_action( 'wp_footer', function () {
						$slot_id = self::SLOT_ID;

						echo "<div id='$slot_id'></div>";
				}, 100 );
		}
}




//
//				$asset_file = DEV_DEBUG_TOOL_PATH . "build/main.asset.php";
//
//				if ( ! file_exists( $asset_file ) ) {
//						return;
//				}

//
//				wp_enqueue_script(
//						$handle,
//						self::ASSETS_PATH . 'main.js',
//						$config['dependencies'],
//						DEV_DEBUG_TOOL_VERSION,
//						true
//				);
//
//				wp_localize_script(
//						'dev-panel', // handle
////						$handle,
//						'debugPanelConfig',
//						[ 'id' => 'dev-debug-slot' ]
////						$this->localised_settings()
//				);
