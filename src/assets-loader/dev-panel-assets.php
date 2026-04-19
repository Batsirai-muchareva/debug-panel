<?php

namespace DevDebugTool\Assets_Loader;

use Elementor\Plugin;
use DevDebugTool\Vite;
use DevDebugTool\Database_Ajax;

class Dev_Panel_Assets {
		private const VITE_PORT = 5173;
		private const SLOT_ID = 'debug-panel-slot';
		private const ASSETS_URL = DEBUG_PANEL_URL . '/build/dev-panel/';
		private const ENQUEUE_HANDLER = 'dev-panel';

		private Vite $vite;

		public function init() {
				$this->vite = new Vite( self::VITE_PORT );

				$this->register_hooks();
		}

		private function register_hooks(): void {
				add_action( 'elementor/editor/after_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
				add_action( 'elementor/editor/after_enqueue_styles', [ $this, 'enqueue_styles' ] );
				add_action( 'elementor/editor/v2/init', [ $this, 'print_html_slot' ] );
		}

		public function enqueue_scripts(): void {
				$this->print_localised_settings();

				if ( $this->vite->is_running() ) {
						$this->vite->enqueue_hmr_scripts( self::ENQUEUE_HANDLER, 'wp_head' );

						return;
				}

				wp_enqueue_script(
						self::ENQUEUE_HANDLER,
						self::ASSETS_URL . 'debug-panel.iife.js',
						[],
						DEBUG_PANEL_VERSION,
						true
				);
		}

		public function enqueue_styles(): void {
				if ( ! $this->vite->is_running() ) {
						wp_enqueue_style(
								self::ENQUEUE_HANDLER,
								self::ASSETS_URL . 'debug-panel.css',
								[],
								DEBUG_PANEL_VERSION
						);
				}

				wp_enqueue_style(
						self::ENQUEUE_HANDLER . '-manrope',
						'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap',
						[],
						null
				);
		}

		public function print_html_slot(): void {
				add_action( 'wp_footer', function (): void {
						printf( '<div id="%s"></div>' . PHP_EOL, esc_attr( self::SLOT_ID ) );
				}, 100 );
		}

		private function print_localised_settings(): void {
				add_action( 'wp_head', function (): void {
						$config = [
								'slot_id'              => self::SLOT_ID,
								'base_url'             => admin_url( 'admin-ajax.php' ),
								'nonce'                => wp_create_nonce( Database_Ajax::NONCE_DEV_DEBUG_KEY ),
								'database_ajax_action' => Database_Ajax::AJAX_DEV_DEBUG_KEY,
								'kit_id'               => Plugin::$instance->kits_manager->get_active_id(),
								'meta_keys'            => [
										'post'           => Database_Ajax::POST_META_KEY,
										'variables'      => Database_Ajax::VARIABLES_META_KEY,
										'global_classes' => Database_Ajax::GLOBAL_CLASSES_META_KEY,
								],
						];

						printf(
								'<script>window.debugPanelConfig = %s;</script>' . PHP_EOL,
								wp_json_encode( $config )
						);
				}, 5 );
		}
}






































//		private function print_localised_settings(): void {
//				add_action('wp_head', function() {
//						$config = [
//								'slot_id' => self::SLOT_ID,
//								'base_url' => admin_url('admin-ajax.php'),
//								'nonce' => wp_create_nonce( Database_Ajax::NONCE_DEV_DEBUG_KEY ),
//								'database_ajax_action' => Database_Ajax::AJAX_DEV_DEBUG_KEY,
//								'kit_id' => Plugin::$instance->kits_manager->get_active_id(),
//								'meta_keys' => [
//										'post' => Database_Ajax::POST_META_KEY,
//										'variables' => Database_Ajax::VARIABLES_META_KEY,
//										'global_classes' => Database_Ajax::GLOBAL_CLASSES_META_KEY,
//								]
//						];
//
//						echo '<script>window.debugPanelConfig = ' . wp_json_encode( $config ) . ';</script>';
//				}, 5);
//		}

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
