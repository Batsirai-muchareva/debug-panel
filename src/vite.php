<?php

namespace DevDebugTool;

class Vite {
		const DEV_SERVER = 'http://localhost:5173';

		private string $entry;

		public function __construct( string $entry = 'src/main.tsx' ) {
				$this->entry = $entry;
		}

		public function is_running(): bool {
				$response = wp_remote_get( self::DEV_SERVER . '/@vite/client', [
						'timeout' => 0.3
				] );

				return ! is_wp_error( $response );
		}

		public function enqueue_hmr_scrips( $handler ): void {
				/** 1. Preamble FIRST — priority 1 **/
				add_action('wp_head', function() {
						echo '<script type="module">
										import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
      								
                    RefreshRuntime.injectIntoGlobalHook( window );
                      
								    window.$RefreshReg$ = () => {};
								    window.$RefreshSig$ = () => (type) => type;
		                                  
								    window.__vite_plugin_react_preamble_installed__ = true;
    					</script>';
				}, 20);

				/** 2. Vite client + app — priority 2 (after preamble) **/
				add_action('wp_head', function() use ( $handler ) {
						wp_enqueue_script_module(
								'vite-client',
								self::DEV_SERVER . '/@vite/client',
								[],
								null
						);
						wp_enqueue_script_module(
								$handler,
								self::DEV_SERVER . '/src/main.tsx',
								[ 'vite-client' ],
								null
						);

						/** Force script modules to print in head instead of footer **/
						wp_script_modules()->print_enqueued_script_modules();
				}, 30);
		}
}





//		public function enqueue(): void {
//				wp_enqueue_script_module(
//						'vite-client',
//						self::DEV_SERVER . '/@vite/client'
//				);
//
//				// App entry
////				wp_enqueue_script_module(
////						'vite-app',
////						self::DEV_SERVER . '/' . $this->entry
////				);
//				wp_enqueue_script_module(
//						'vite-app',
//						'http://localhost:5173/src/main.tsx',
//						[],
//						null // ✅ THIS FIXES IT
//				);
//				// HMR client
////				wp_enqueue_script(
////						'vite-client',
////						self::DEV_SERVER . '/@vite/client',
////						[],
////						null,
////						true
////				);
////
////				// App entry
////				wp_enqueue_script(
////						'vite-app',
////						self::DEV_SERVER . '/' . $this->entry,
////						[],
////						null,
////						true
////				);
//		}
//		public function enqueue(): void {
//				// Inject React refresh preamble inline FIRST
//				add_action('wp_head', function() {
//						echo '<script type="module">
//      import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
//      RefreshRuntime.injectIntoGlobalHook(window);
//      window.$RefreshReg$ = () => {};
//      window.$RefreshSig$ = () => (type) => type;
//      window.__vite_plugin_react_preamble_installed__ = true;
//    </script>';
//				}, 1); // priority 1 = very early
//
//				wp_enqueue_script_module(
//						'vite-client',
//						self::DEV_SERVER . '/@vite/client',
//						[], null
//				);
//
//				wp_enqueue_script_module(
//						'vite-app',
//						self::DEV_SERVER . '/src/main.tsx',
//						[], null
//				);
//		}
//		public function enqueue(): void {
//				add_action('wp_head', function() {
//						echo '<script type="module">
//      import RefreshRuntime from "' . self::DEV_SERVER . '/@react-refresh";
//      RefreshRuntime.injectIntoGlobalHook(window);
//      window.$RefreshReg$ = () => {};
//      window.debugPanelConfig = { id: "dev-debug-slot" };
//      window.$RefreshSig$ = () => (type) => type;
//      window.__vite_plugin_react_preamble_installed__ = true;
//    </script>
//    <script type="module" src="' . self::DEV_SERVER . '/@vite/client"></script>
//    <script type="module" src="' . self::DEV_SERVER . '/src/main.tsx"></script>';
//				}, 20);
//		}
