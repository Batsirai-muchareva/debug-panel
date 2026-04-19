<?php

namespace DevDebugTool\Assets_Loader;

/**
 * Manages the ws-server Node.js process lifecycle.
 *
 * Starts the ws-server lazily on demand, tracks its PID, and
 * stops it cleanly on plugin deactivation or explicit request.
 */
class WS_Server {
		private const SCRIPT_PATH_DEV  = 'apps/ws-server/src/main.ts';
		private const SCRIPT_PATH_PROD = 'build/ws-server/main.js';
		private const PID_FILE    = 'tmp/ws-server.pid';
		private const LOG_FILE    = 'tmp/ws-server.log';

		private string $script;
		private string $pid_file;
		private string $log_file;

		public function __construct() {
				$prod_script = DEBUG_PANEL_PATH . self::SCRIPT_PATH_PROD;

				$this->script = file_exists( $prod_script )
						? $prod_script
						: DEBUG_PANEL_PATH . self::SCRIPT_PATH_DEV;

				$this->pid_file = DEBUG_PANEL_PATH . self::PID_FILE;
				$this->log_file = DEBUG_PANEL_PATH . self::LOG_FILE;
		}

		/**
		 * Starts the ws-server if it is not already running.
		 * Safe to call on every page load — will no-op if already alive.
		 */
		public function ensure_running(): void {
				if ( ! $this->can_exec() ) {
						return;
				}

				if ( ! file_exists( $this->script ) ) {
						$this->log( 'ws-server script not found: ' . $this->script );
						return;
				}

				if ( $this->is_running() ) {
						return;
				}

				$this->start();
		}

		/**
		 * Stops the ws-server if it is running.
		 */
		public function stop(): void {
				if ( ! file_exists( $this->pid_file ) ) {
						return;
				}

				$pid = $this->read_pid();

				if ( $pid > 0 ) {
						posix_kill( $pid, SIGTERM );
				}

				$this->clear_pid_file();
		}

		/**
		 * Returns true if the ws-server process is currently alive.
		 */
		public function is_running(): bool {
				if ( ! file_exists( $this->pid_file ) ) {
						return false;
				}

				$pid = $this->read_pid();

				if ( $pid <= 0 ) {
						$this->clear_pid_file();
						return false;
				}

				// Signal 0 checks existence without sending a real signal.
				$alive = posix_kill( $pid, 0 );

				if ( ! $alive ) {
						$this->clear_pid_file();
				}

				return $alive;
		}

		private function start(): void {
				$this->ensure_tmp_dir();

				$is_ts  = substr( $this->script, -3 ) === '.ts';
				$node   = $this->find_binary( 'node' );
				$runner = $is_ts
						? $this->find_binary( 'npx' ) . ' tsx'
						: $node;

				$cmd = sprintf(
						'%s %s >> %s 2>&1 & echo $!',
						$runner,
						escapeshellarg( $this->script ),
						escapeshellarg( $this->log_file )
				);

				$pid = (int) exec( $cmd );

				if ( $pid > 0 ) {
						file_put_contents( $this->pid_file, $pid );
						$this->log( 'ws-server started with PID ' . $pid );
				} else {
						$this->log( 'ws-server failed to start.' );
				}
		}

		private function find_binary( string $name ): string {
				$path = trim( (string) shell_exec( 'which ' . escapeshellarg( $name ) ) );

				if ( $path ) {
						return $path;
				}

				// Common install locations as fallback
				$candidates = [
						"/usr/local/bin/{$name}",
						"/usr/bin/{$name}",
						"/opt/homebrew/bin/{$name}",  // macOS Homebrew
				];

				foreach ( $candidates as $candidate ) {
						if ( file_exists( $candidate ) ) {
								return $candidate;
						}
				}

				return $name; // last resort, will fail with "not found"
		}
		/**
		 * Reads the PID from the PID file.
		 */
		private function read_pid(): int {
				return (int) file_get_contents( $this->pid_file );
		}

		/**
		 * Removes the PID file.
		 */
		private function clear_pid_file(): void {
				if ( file_exists( $this->pid_file ) ) {
						unlink( $this->pid_file );
				}
		}

		/**
		 * Creates the tmp directory if it does not exist.
		 */
		private function ensure_tmp_dir(): void {
				$dir = dirname( $this->pid_file );

				if ( ! is_dir( $dir ) ) {
						mkdir( $dir, 0755, true );
				}
		}

		/**
		 * Returns true if exec() is available and not disabled by the host.
		 */
		private function can_exec(): bool {
				if ( ! function_exists( 'exec' ) ) {
						return false;
				}

				$disabled = array_map(
						'trim',
						explode( ',', ini_get( 'disable_functions' ) )
				);

				return ! in_array( 'exec', $disabled, true );
		}

		/**
		 * Appends a timestamped message to the ws-server log file.
		 */
		private function log( string $message ): void {
				$this->ensure_tmp_dir();

				$line = sprintf( '[%s] %s' . PHP_EOL, date( 'Y-m-d H:i:s' ), $message );

				file_put_contents( $this->log_file, $line, FILE_APPEND | LOCK_EX );
		}
}
