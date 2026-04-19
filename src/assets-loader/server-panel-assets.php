<?php

namespace DevDebugTool\Assets_Loader;

use DevDebugTool\Vite;
use Elementor\Plugin;

class Server_Panel_Assets {
		private const VITE_PORT  = 4200;
		private const PAGE_SLUG  = 'debug-panel';
		private const PAGE_TITLE = 'Debug Panel';
		private const SCREEN_ID  = 'toplevel_page_debug-panel';
		private const BUILD_FOLDER = 'build/server-panel/';

		private Vite $vite;

		public function init() {
				$this->vite = new Vite( self::VITE_PORT );

				$this->register_hooks();
		}

		private function register_hooks(): void {
				add_action( 'admin_menu', [ $this, 'register_page' ] );
				add_action( 'admin_head', [ $this, 'hide_wp_chrome' ] );
				add_action( 'admin_head', [ $this, 'menu_icon_style' ] );
				add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
				add_action( 'wp_ajax_debug_panel_manifest', [ $this, 'handle_manifest' ] );
				add_action( 'wp_ajax_nopriv_debug_panel_manifest', [ $this, 'handle_manifest' ] );
		}

		public function menu_icon_style(): void {
				echo '<style>
        #adminmenu #toplevel_page_debug-panel .wp-menu-image img {
            width: 20px !important;
            height: 20px !important;
        }
    </style>' . PHP_EOL;
		}

		public function register_page(): void {
				add_menu_page(
						self::PAGE_TITLE,
						self::PAGE_TITLE,
						'manage_options',
						self::PAGE_SLUG,
						[ $this, 'render' ],
						DEBUG_PANEL_URL . 'apps/server-panel/public/logo.png',

//						'dashicons-search',
						3
				);
		}

		public function render(): void {
				if ( $this->vite->is_running() ) {
						$this->print_vite_injection_point();

						return;
				}

				$this->render_production_build();
		}

		private function print_vite_injection_point() {
				echo '<div id="root"></div>';
		}

		public function enqueue_assets( string $hook ): void {
				if ( $hook !== 'toplevel_page_' . self::PAGE_SLUG ) {
						return;
				}

				if ( ! $this->vite->is_running() ) {
						( new WS_Server() )->ensure_running();
						return;
				}

				$this->vite->enqueue_hmr_scripts( 'debug-panel', 'admin_head' );

				$manifest_url = admin_url( 'admin-ajax.php?action=debug_panel_manifest' );

				add_action( 'admin_head', static function () use ( $manifest_url ): void {
						printf( '<link rel="manifest" href="%s">' . PHP_EOL, esc_url( $manifest_url ) );
				} );
		}

		public function hide_wp_chrome(): void {
				$screen = get_current_screen();

				if ( ! $screen || $screen->id !== self::SCREEN_ID ) {
						return;
				}

				echo '<style>
			#adminmenuwrap,
			#adminmenuback,
			#wpadminbar,
			#wpfooter { display: none !important; }
 
			#wpcontent,
			#wpbody,
			#wpbody-content { margin: 0 !important; padding: 0 !important; }
 
			html.wp-toolbar { padding-top: 0 !important; }
 
			html, body,
			#wpwrap, #wpcontent, #wpbody, #wpbody-content, #root {
				width: 100%;
				height: 100vh;
				min-height: 100vh;
				overflow: hidden;
			}
		</style>' . PHP_EOL;
		}

		public function handle_manifest(): void {
				$manifest = $this->vite->is_running()
						? self::fetch_dev_manifest()
						: self::read_prod_manifest();

				if ( ! $manifest ) {
						wp_send_json_error( 'Manifest not found', 404 );

						return;
				}

				header( 'Content-Type: application/manifest+json' );
				echo $manifest; // phpcs:ignore WordPress.Security.EscapeOutput
				exit;
		}

		private function get_path_for( string $relative_path ) {
				return DEBUG_PANEL_PATH . self::BUILD_FOLDER . $relative_path;
		}

		private function render_production_build(): void {
				$index = $this->get_path_for( 'index.html' );

				if ( ! file_exists( $index ) ) {
						echo '<div style="color:red;padding:2rem;">Server-panel build not found</div>';
						return;
				}

				$base_url = DEBUG_PANEL_URL . self::BUILD_FOLDER;
				$html     = file_get_contents( $index ); // phpcs:ignore

				$html = str_replace( 'src="/assets/',              'src="' . $base_url . 'assets/',              $html );
				$html = str_replace( 'href="/assets/',             'href="' . $base_url . 'assets/',             $html );
				$html = str_replace( 'src="/registerSW.js"',       'src="' . $base_url . 'registerSW.js"',       $html );
				$html = str_replace( 'href="/manifest.webmanifest"','href="' . $base_url . 'manifest.webmanifest"', $html );

				echo $html; // phpcs:ignore WordPress.Security.EscapeOutput
		}
		/**
		 * Fetches and rewrites the manifest from the Vite dev server.
		 */
		private function fetch_dev_manifest() {
				$server_url = $this->vite->get_server_url();
				$manifest = file_get_contents( $server_url . '/manifest.webmanifest' ); // phpcs:ignore

				if ( ! $manifest ) {
						return false;
				}

				return str_replace( '"/logo.png"', '"' . $server_url . '/logo.png"', $manifest );
		}

		/**
		 * Reads the manifest from the production build directory.
		 */
		private function read_prod_manifest() {
				$path = $this->get_path_for( 'manifest.webmanifest' );

				return file_exists( $path ) ? file_get_contents( $path ) : false; // phpcs:ignore
		}
}
