<?php

namespace DevDebugTool;

class Vite {
		const DEV_SERVER_HOST = 'http://localhost';

		private const PREAMBLE_PRIORITY = 20;

		private const ENQUEUE_PRIORITY = 30;

		private const REQUEST_TIMEOUT = 0.3;

		private string $dev_server;
		private string $entry_file;

		public function __construct( int $port, string $entry_file = 'src/main.tsx' ) {
				$this->dev_server = self::DEV_SERVER_HOST . ':' . $port;
				$this->entry_file = $entry_file;
		}

		/**
		 * Returns the dev-server base URL.
		 */
		public function get_server_url(): string {
				return $this->dev_server;
		}

		/**
		 * Checks whether the Vite dev server is reachable.
		 */
		public function is_running(): bool {
				$response = wp_remote_get(
						$this->dev_server . '/@vite/client',
						[ 'timeout' => self::REQUEST_TIMEOUT ]
				);

				return ! is_wp_error( $response );
		}

		/**
		 * Registers the React Refresh preamble and the Vite client/app modules
		 * into `wp_head`, in the correct load order.
		 *
		 * ⚡ Vite HMR
		 *
		 * @param string $handler The script-module handle for the application entry.
		 */
		public function enqueue_hmr_scripts( string $handler, string $head_action ): void { // = 'wp_head'
				$this->add_react_refresh_preamble( $head_action );
				$this->add_vite_client_and_app( $handler, $head_action );
		}

		private function add_react_refresh_preamble( string $head_action ): void {
				add_action( $head_action, function (): void {
						printf(
								'<script type="module">
					import RefreshRuntime from "%s/@react-refresh";
 
					RefreshRuntime.injectIntoGlobalHook( window );
 
					window.$RefreshReg$ = () => {};
					window.$RefreshSig$ = () => (type) => type;
					window.__vite_plugin_react_preamble_installed__ = true;
				</script>' . PHP_EOL,
								esc_url( $this->dev_server )
						);
				}, self::PREAMBLE_PRIORITY );
		}

		private function add_vite_client_and_app( string $handler, string $head_action ): void {
				add_action( $head_action, function () use ( $handler ): void {
						wp_enqueue_script_module(
								'vite-client',
								$this->dev_server . '/@vite/client',
								[],
								null
						);

						wp_enqueue_script_module(
								$handler,
								$this->dev_server . '/' . $this->entry_file,
								[ 'vite-client' ],
								null
						);

						// Script modules default to the footer; force them into <head>.
						wp_script_modules()->print_enqueued_script_modules();
				}, self::ENQUEUE_PRIORITY );
		}
}
