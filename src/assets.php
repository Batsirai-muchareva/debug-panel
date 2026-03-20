<?php

namespace DevDebugTool;

use Elementor\Plugin;

class Assets {
	private $registry = [ 'iugiu', 'uyfytdrrt' ];
	const PACKAGES = [
		'editor-canvas',
		'editor-controls', // TODO: Need to be registered and not enqueued.
		'editor-editing-panel',
		'editor-elements', // TODO: Need to be registered and not enqueued.
		'editor-props', // TODO: Need to be registered and not enqueued.
		'editor-styles', // TODO: Need to be registered and not enqueued.
		'editor-styles-repository',
		'editor-interactions',
	];

	public $name = "batsirai";
		const ASSETS_PATH = DEV_DEBUG_TOOL_URL . '/build/';

		public function register_hooks(): void {
				add_action('elementor/editor/after_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
				add_action( 'elementor/editor/after_enqueue_styles', [ $this, 'enqueue_styles' ] );
				add_action( 'elementor/editor/v2/init', [ $this, 'print_html_slot' ] );
		}

		public function enqueue_scripts(): void {
				$asset_file = DEV_DEBUG_TOOL_PATH . "build/main.asset.php";

				if ( ! file_exists( $asset_file ) ) {
						return; // or log error if needed
				}

				$config = require $asset_file;
				$handle = 'dev-debug-tool';


				wp_enqueue_script(
						$handle,
						self::ASSETS_PATH . 'main.js',
						$config['dependencies'],
						DEV_DEBUG_TOOL_VERSION,
						true
				);

				wp_localize_script(
						$handle,
						'devDebugTool',
						$this->localised_settings()
				);
		}

		private function localised_settings(): array {
				return [
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
		}

		public function enqueue_styles(): void {
				wp_enqueue_style(
						'dev-debug-tool',
						self::ASSETS_PATH . 'styles.css',
						[],
						DEV_DEBUG_TOOL_VERSION,
				);

				wp_enqueue_style(
						'myplugin-manrope',
						'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap',
						array(),
						null
				);
		}

		public function print_html_slot(): void {
				add_action( 'wp_footer', function () {
						echo '<div id="dev-debug-slot"></div>';
				}, 100 );
		}
}
