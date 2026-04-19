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
				add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
				add_action( 'wp_ajax_debug_panel_manifest', [ $this, 'handle_manifest' ] );
				add_action( 'wp_ajax_nopriv_debug_panel_manifest', [ $this, 'handle_manifest' ] );
		}

		public function register_page(): void {
				add_menu_page(
						self::PAGE_TITLE,
						self::PAGE_TITLE,
						'manage_options',
						self::PAGE_SLUG,
						[ $this, 'render' ],
						'dashicons-search',
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

//		private function render_production_build(): void {
//				$index = $this->get_path_for( 'index.html' );
//
//				if ( ! file_exists( $index ) ) {
//						echo '<div style="color:red;padding:2rem;">Server-panel build not found</div>';
//						return;
//				}
//
////				$base_url = DEV_DEBUG_TOOL_URL . self::BUILD_FOLDER;
//				$base_url = DEV_DEBUG_TOOL_URL . self::BUILD_FOLDER;
//
//
//				$html = file_get_contents( $index ); // phpcs:ignore WordPress.WP.AlternativeFunctions
//				$html = str_replace( '<head>', '<head><base href="' . esc_url( $base_url ) . '">', $html );
//
////				$html = str_replace( './assets/',              $base_url . 'assets/',             $html );
////				$html = str_replace( '"assets/',               '"' . $base_url . 'assets/',       $html );
////				$html = str_replace( './registerSW.js',        $base_url . 'registerSW.js',       $html );
////				$html = str_replace( './manifest.webmanifest', $base_url . 'manifest.webmanifest', $html );
//
////				$html = str_replace( './assets/',             $base_url . 'assets/',             $html );
////				$html = str_replace( './registerSW.js',       $base_url . 'registerSW.js',       $html );
////				$html = str_replace( './manifest.webmanifest', $base_url . 'manifest.webmanifest', $html );
//
//				echo $html; // phpcs:ignore WordPress.Security.EscapeOutput
//		}

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
				$manifest   = file_get_contents( $server_url . '/manifest.webmanifest' ); // phpcs:ignore

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

























//		public static function register_page() {
//				add_menu_page(
//						'Debug Panel',
//						'Debug Panel',
//						'manage_options',
//						'debug-panel',
//						[ self::class, 'render' ],
//						'dashicons-search',
//						3
//				);
//		}

//		public static function render() {
//				$vite = new Vite( 4200 );
//
//				if ($vite->is_running()) {
//						echo '<div id="root"></div>';
//						printf(
//								'<script type="module">
//					import RefreshRuntime from "%s/@react-refresh";
//
//					RefreshRuntime.injectIntoGlobalHook( window );
//
//					window.$RefreshReg$ = () => {};
//					window.$RefreshSig$ = () => (type) => type;
//					window.__vite_plugin_react_preamble_installed__ = true;
//				</script>' . PHP_EOL,
//								esc_url( 'http://localhost:4200' )
//						);
//
//						wp_enqueue_script_module(
//								'vite-client',
//								'http://localhost:4200' . '/@vite/client',
//								[],
//								null
//						);
//
//						wp_enqueue_script_module(
//								'defgg',
//								'http://localhost:4200' . '/src/main.tsx',
//								[ 'vite-client' ],
//								null
//						);
//
//						// Script modules default to the footer; force them into <head>.
//						wp_script_modules()->print_enqueued_script_modules();
//
//
//						return;
//				}
//
//				$index = plugin_dir_path(__FILE__) . '../build/server-panel/index.html';
//
//				if (!file_exists($index)) {
//						echo '<div style="color:red;padding:2rem;">server-panel build not found</div>';
//						return;
//				}
//
//				$html = file_get_contents($index);
//
//				$base_url = plugin_dir_url(__FILE__) . '../build/server-panel/';
//
//				$html = str_replace('./assets/', $base_url . 'assets/', $html);
//				$html = str_replace('./registerSW.js', $base_url . 'registerSW.js', $html);
//				$html = str_replace('./manifest.webmanifest', $base_url . 'manifest.webmanifest', $html);
//
//				echo $html;
//		}
//		public static function hide_wp_chrome() {
//				$screen = get_current_screen();
//
//				if ( ! $screen || $screen->id !== 'toplevel_page_debug-panel' ) {
//						return;
//				}
//
//				echo '<style>
//        /* Hide WordPress admin UI */
//        #adminmenuwrap,
//        #adminmenuback,
//        #wpadminbar,
//        #wpfooter {
//            display: none !important;
//        }
//
//        /* Remove all spacing */
//        #wpcontent,
//        #wpbody,
//        #wpbody-content {
//            margin: 0 !important;
//            padding: 0 !important;
//        }
//
//        /* Remove toolbar top padding */
//        html.wp-toolbar {
//            padding-top: 0 !important;
//        }
//
//        /* Make app full screen */
//        html,
//        body,
//        #wpwrap,
//        #wpcontent,
//        #wpbody,
//        #wpbody-content,
//        #root {
//            width: 100%;
//            height: 100vh;
//            min-height: 100vh;
//            overflow: hidden;
//        }
//    </style>';
//		}
//		public static function enqueue_assets( $hook ) {
//				if ( $hook !== 'toplevel_page_debug-panel' ) {
//						return;
//				}
//
//				$vite = new Vite( 4200 );
//				$manifest_url = admin_url( 'admin-ajax.php?action=debug_panel_manifest' );
//
//				if ( $vite->is_running() ) {
//						add_action( 'admin_head', function () use ( $manifest_url ) {
//								echo '<link rel="manifest" href="' . $manifest_url . '">';
//						} );
//				}
//		}

//		public static function handle_manifest() {
//				$vite = new Vite( 4200 );
//
//				if ( $vite->is_running() ) {
//						$manifest = file_get_contents( 'http://localhost:4200/manifest.webmanifest' );
//
//						// Rewrite relative icon paths to use the dev server
//						$manifest = str_replace(
//								'"/logo.png"',
//								'"http://localhost:4200/logo.png"',
//								$manifest
//						);
//				} else {
//						$path = plugin_dir_path( __FILE__ ) . '../build/server-panel/manifest.webmanifest';
//						$manifest = file_exists( $path ) ? file_get_contents( $path ) : null;
//				}
//
//				if ( ! $manifest ) {
//						wp_send_json_error( 'Manifest not found', 404 );
//						return;
//				}
//
//				header( 'Content-Type: application/manifest+json' );
//				echo $manifest;
//				exit;
//		}
//						$vite->enqueue_hmr_scrips( 'debug-panel22' );

//						echo '<div id="root"></div>';
//						echo '<script type="module">
//            import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
//            RefreshRuntime.injectIntoGlobalHook(window);
//            window.$RefreshReg$ = () => {};
//            window.$RefreshSig$ = () => (type) => type;
//            window.__vite_plugin_react_preamble_installed__ = true;
//        </script>
//        ';
//		public static function render() {
////				var_dump('yjmhjnhjn');
//				dp([
//						'base_url' => admin_url('admin-ajax.php'),
//						'nonce' => wp_create_nonce( Database_Ajax::NONCE_DEV_DEBUG_KEY ),
//						'database_ajax_action' => Database_Ajax::AJAX_DEV_DEBUG_KEY,
//						'kit_id' => Plugin::$instance->kits_manager->get_active_id(),
//						'meta_keys' => [
//								'post' => Database_Ajax::POST_META_KEY,
//								'variables' => Database_Ajax::VARIABLES_META_KEY,
//								'global_classes' => Database_Ajax::GLOBAL_CLASSES_META_KEY,
//						]
//				]);
//				$vite = new Vite( 'src/main.tsx', 4200 );
//
//				if ( $vite->is_running() ) {
//						echo '<div id="root"></div>';
//						echo '<script type="module">
//                import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
//                RefreshRuntime.injectIntoGlobalHook( window );
//                window.$RefreshReg$ = () => {};
//                window.$RefreshSig$ = () => (type) => type;
//                window.__vite_plugin_react_preamble_installed__ = true;
//            </script>
//            <script type="module" src="' . self::DEV_SERVER . '/@vite/client"></script>
//            <script type="module" src="' . self::DEV_SERVER . '/src/main.tsx"></script>';
//
//						return;
//				}
//
//				$index = plugin_dir_path( __FILE__ ) . '../build/server-panel/index.html';
//
//				if ( ! file_exists( $index ) ) {
//						echo '<div style="color:red;padding:2rem;">server-panel build not found. Run: nx build server-panel</div>';
//
//						return;
//				}
//
//				echo file_get_contents( $index );
//		}

//		public static function hide_wp_chrome() {
//				if ( get_current_screen()->id !== 'toplevel_page_debug-panel' ) {
//						return;
//				}
//
//				echo '<style>
//            #adminmenuwrap,
//            #adminmenuback,
//            #wpadminbar { display: none !important; }
//
//            #wpcontent,
//            #wpbody,
//            #wpbody-content { padding: 0 !important; margin: 0 !important; }
//
//            html.wp-toolbar { padding-top: 0 !important; }
//        </style>';
//		}
//		public static function handle_manifest() {
//				$vite = new Vite( 'src/main.tsx', 4200 );
//
//				$manifest = $vite->is_running()
//						? file_get_contents( 'http://localhost:4200/manifest.webmanifest' )
//						: file_get_contents( plugin_dir_path( __FILE__ ) . '../build/server-panel/manifest.webmanifest' );
//
//				header( 'Content-Type: application/manifest+json' );
//				echo $manifest;
//				exit;
//		}
//public static function enqueue_assets222( $hook ) {
//		if ( $hook !== 'toplevel_page_debug-panel' ) {
//				return;
//		}
//
//		$vite = new Vite( 'src/main.tsx', 4200 );
//		$manifest_url = admin_url( 'admin-ajax.php?action=debug_panel_manifest' );
//
//		if ( $vite->is_running() ) {
//				add_action( 'admin_head', function () use ( $manifest_url ) {
//						echo '<link rel="manifest" href="' . $manifest_url . '">';
//				} );
//
//				return;
//		}
//
//		// Prod
//		$build_url = plugin_dir_url( __FILE__ ) . '../build/server-panel/';
//
//		add_action( 'admin_head', function () use ( $manifest_url ) {
//				echo '<link rel="manifest" href="' . $manifest_url . '">';
//		} );
//
//		wp_enqueue_style( 'debug-panel-pwa-style', $build_url . 'assets/index.css', [], null );
//		wp_enqueue_script( 'debug-panel-pwa', $build_url . 'assets/index.js', [], null, true );
//}



//		public static function handle_manifest() {
//				$vite = new Vite( 'src/main.tsx', 4200 );
//
//				if ( $vite->is_running() ) {
//						$manifest = file_get_contents( 'http://localhost:4200/manifest.webmanifest' );
//				} else {
//						$path = plugin_dir_path( __FILE__ ) . '../build/server-panel/manifest.webmanifest';
//						$manifest = file_exists( $path ) ? file_get_contents( $path ) : null;
//				}
//
//				if ( ! $manifest ) {
//						wp_send_json_error( 'Manifest not found', 404 );
//						return;
//				}
//
//				header( 'Content-Type: application/manifest+json' );
//				echo $manifest;
//				exit;
//		}
//
//namespace DevDebugTool;
//
//class PHP_Debug {
//		const DEV_SERVER = 'http://localhost:4200';
//
//		public static function init() {
////				add_action( 'admin_menu', [ self::class, 'register_page' ] );
////				add_action( 'admin_head', [ self::class, 'hide_wp_chrome' ] );
////				add_action( 'admin_enqueue_scripts', [ self::class, 'enqueue_assets' ] );
////				add_action( 'init', [ self::class, 'handle_manifest' ] );  // ← add this
////				add_action( 'init', [ self::class, 'add_rewrite_rule' ] );
//
//				add_action( 'admin_menu', [ self::class, 'register_page' ] );
//				add_action( 'admin_head', [ self::class, 'hide_wp_chrome' ] );
//				add_action( 'admin_enqueue_scripts', [ self::class, 'enqueue_assets' ] );
//				add_action( 'init', [ self::class, 'add_rewrite_rule' ] );
//				add_action( 'init', [ self::class, 'handle_manifest' ] );
//		}
//
//		public static function add_rewrite_rule() {
//				add_rewrite_rule(
//						'debug-panel-manifest\.webmanifest$',
//						'index.php?debug_panel_manifest=1',
//						'top'
//				);
//
//				add_filter( 'query_vars', function( $vars ) {
//						$vars[] = 'debug_panel_manifest';
//						return $vars;
//				} );
//
//				// Force flush once
//				if ( get_option( 'debug_panel_flush_rules' ) !== '1' ) {
//						flush_rewrite_rules();
//						update_option( 'debug_panel_flush_rules', '1' );
//				}
//		}
//
////		public static function add_rewrite_rule() {
////				add_rewrite_rule(
////						'debug-panel-manifest\.webmanifest$',
////						'index.php?debug_panel_manifest=1',
////						'top'
////				);
////
////				add_filter( 'query_vars', function( $vars ) {
////						$vars[] = 'debug_panel_manifest';
////						return $vars;
////				} );
////		}
//
////		public static function handle_manifest() {
////				if ( ! isset( $_GET['debug-panel-manifest'] ) ) {
////						return;
////				}
////
////				$manifest = file_get_contents( 'http://localhost:4200/manifest.webmanifest' );
////
////				header( 'Content-Type: application/manifest+json' );
////				echo $manifest;
////				exit;
////		}
//		public static function handle_manifest() {
//				if ( ! get_query_var( 'debug_panel_manifest' ) ) {
//						return;
//				}
//
//				$vite = new Vite( 'src/main.tsx', 4200 );
//
//				$manifest = $vite->is_running()
//						? file_get_contents( 'http://localhost:4200/manifest.webmanifest' )
//						: file_get_contents( plugin_dir_path( __FILE__ ) . '../build/server-panel/manifest.webmanifest' );
//
//				header( 'Content-Type: application/manifest+json' );
//				echo $manifest;
//				exit;
////				if ( $_SERVER['REQUEST_URI'] !== '/debug-panel-manifest.webmanifest' ) {
////						return;
////				}
////
////				$vite = new Vite( 'src/main.tsx', 4200 );
////
////				if ( $vite->is_running() ) {
////						$manifest = file_get_contents( 'http://localhost:4200/manifest.webmanifest' );
////				} else {
////						$manifest = file_get_contents( plugin_dir_path( __FILE__ ) . '../build/server-panel/manifest.webmanifest' );
////				}
////
////				header( 'Content-Type: application/manifest+json' );
////				echo $manifest;
////				exit;
//		}
//		public static function register_page() {
//				add_menu_page(
//						'Debug Panel',
//						'Debug Panel',
//						'manage_options',
//						'debug-panel',
//						[ self::class, 'render' ],
//						'dashicons-search',
//						3
//				);
//		}
//
////		public static function render() {
////				echo '<div id="debug-panel-root"></div>';
////		}
//
//		public static function render() {
//				$vite = new Vite( 'src/main.tsx', 4200 );
//
//				if ( $vite->is_running() ) {
//						echo '<div id="root"></div>';
//						echo '<script type="module">
//            import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
//            RefreshRuntime.injectIntoGlobalHook( window );
//            window.$RefreshReg$ = () => {};
//            window.$RefreshSig$ = () => (type) => type;
//            window.__vite_plugin_react_preamble_installed__ = true;
//        </script>
//        <script type="module" src="' . self::DEV_SERVER . '/@vite/client"></script>
//        <script type="module" src="' . self::DEV_SERVER . '/src/main.tsx"></script>';
//
//						return;
//				}
//
//				$index = plugin_dir_path( __FILE__ ) . '../build/server-panel/index.html';
//
//				if ( ! file_exists( $index ) ) {
//						echo '<div style="color:red;padding:2rem;">server-panel build not found. Run: nx build server-panel</div>';
//						return;
//				}
//
//				echo file_get_contents( $index );
//		}
//
////		public static function render() {
////				$index = plugin_dir_path( __FILE__ ) . '../build/server-panel/index.html';
////
////				if ( ! file_exists( $index ) ) {
////						echo '<div style="color:red;padding:2rem;">server-panel build not found. Run: nx build server-panel</div>';
////						return;
////				}
////
////				// Output the built index.html directly
////				echo file_get_contents( $index );
////		}
//
//		public static function hide_wp_chrome() {
//				if ( get_current_screen()->id !== 'toplevel_page_debug-panel' ) {
//						return;
//				}
//
//				echo '<style>
//            #adminmenuwrap,
//            #adminmenuback,
//            #wpadminbar { display: none !important; }
//
//            #wpcontent,
//            #wpbody,
//            #wpbody-content { padding: 0 !important; margin: 0 !important; }
//
//            html.wp-toolbar { padding-top: 0 !important; }
//        </style>';
//		}
//// http://wordpress-dev.local/wp-admin/admin.php?page=debug-panel
//		public static function enqueue_assets( $hook ) {
//				if ( $hook !== 'toplevel_page_debug-panel' ) {
//						return;
//				}
//
////				$vite = new Vite();
//				$vite = new Vite( 'src/main.tsx', 4200 );
////				if ( $vite->is_running() ) {
////						// Dev: proxy to server-panel's vite dev server
//////						add_action( 'admin_head', function() {
//////								echo '<script type="module" src="http://localhost:4200/@vite/client"></script>';
//////								echo '<script type="module" src="http://localhost:4200/src/main.tsx"></script>';
//////						} );
////
////						add_action('admin_head', function() {
////								echo '<script type="module">
////										import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
////
////                    RefreshRuntime.injectIntoGlobalHook( window );
////
////								    window.$RefreshReg$ = () => {};
////								    window.$RefreshSig$ = () => (type) => type;
////
////								    window.__vite_plugin_react_preamble_installed__ = true;
////    					</script>';
////						}, 20);
//////						$vite->enqueue_hmr_scrips( 'debug-panel-pwa' );
////
////
////						return;
////				}
////				if ( $vite->is_running() ) {
////						add_action( 'admin_head', function() {
////								echo '<script type="module">
////                    import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
////                    RefreshRuntime.injectIntoGlobalHook( window );
////                    window.$RefreshReg$ = () => {};
////                    window.$RefreshSig$ = () => (type) => type;
////                    window.__vite_plugin_react_preamble_installed__ = true;
////                </script>
////                <script type="module" src="' . self::DEV_SERVER . '/@vite/client"></script>
////                <script type="module" src="' . self::DEV_SERVER . '/src/main.tsx"></script>';
////						}, 20 );
////
////						return;
////				}
//
//				if ( $vite->is_running() ) {
////						add_action( 'admin_head', function() {
////								echo '<link rel="manifest" href="http://localhost:4200/manifest.webmanifest">';
////						} );
//						add_action( 'admin_head', function() {
//								echo '<link rel="manifest" href="/debug-panel-manifest.webmanifest">';
////								$manifest_url = admin_url( 'admin.php?page=debug-panel&debug-panel-manifest=1' );
////								echo '<link rel="manifest" href="' . $manifest_url . '">';
//						} );
//						echo '<div id="root"></div>';
//						echo '<script type="module">
//            import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
//            RefreshRuntime.injectIntoGlobalHook( window );
//            window.$RefreshReg$ = () => {};
//            window.$RefreshSig$ = () => (type) => type;
//            window.__vite_plugin_react_preamble_installed__ = true;
//        </script>
//        <script type="module" src="' . self::DEV_SERVER . '/@vite/client"></script>
//        <script type="module" src="' . self::DEV_SERVER . '/src/main.tsx"></script>';
//						return;
//				}
//				// Prod: assets come from the build output
//				$build_url = plugin_dir_url( __FILE__ ) . '../build/server-panel/';
//
//				wp_enqueue_style(
//						'debug-panel-pwa-style',
//						$build_url . 'assets/index.css',
//						[],
//						null
//				);
//
//				wp_enqueue_script(
//						'debug-panel-pwa',
//						$build_url . 'assets/index.js',
//						[],
//						null,
//						true
//				);
////				if ( $vite->is_running() ) {
////						$vite->enqueue_hmr_scrips( 'debug-panel-pwa' );
////
////						return;
////				}
////				$build_url = plugin_dir_url( __FILE__ ) . '../build/server-panel/';
////
////				wp_enqueue_script(
////						'debug-panel',
////						plugin_dir_url( __FILE__ ) . 'dist/app.js',
////						[],
////						null,
////						true
////				);
////
////				wp_enqueue_style(
////						'debug-panel-style',
////						plugin_dir_url( __FILE__ ) . 'dist/app.css',
////						[],
////						null
////				);
//		}
//}
