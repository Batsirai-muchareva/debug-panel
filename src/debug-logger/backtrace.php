<?php

namespace DevDebugTool\Debug_Logger;

final class Backtrace {
		private array $trace;
		private int $offset;

		public function __construct( int $offset = 0 ) {
				$this->trace = debug_backtrace( DEBUG_BACKTRACE_IGNORE_ARGS );
				$this->offset = $offset;
		}

		public function capture() {
				$call_site = $this->get_call_site();

				return [
						'sourceName' => basename( $call_site[ 'file' ] ),
						'lineNumber' => $call_site[ 'line' ],
						'pathToSource' => $call_site[ 'file' ],
						'callerFunction' => $this->get_caller_function(),
						'frames' => $this->build_frames(),
				];
		}

		private function get_call_site(): array {
				$frame = $this->trace[$this->offset] ?? $this->trace[0] ?? [];

				return [
						'file' => $frame['file'] ?? 'unknown',
						'line' => $frame['line'] ?? 0,
				];
		}


		private function get_caller_function(): ?string {
				return $this->trace[$this->offset + 1]['function'] ?? null;
		}

		private function build_frames(): array {
				return array_map( fn(array $frame): array => [
								'file'     => $frame['file'] ?? 'unknown',
								'line'     => $frame['line'] ?? 0,
								'function' => $frame['function'] ?? 'unknown',
						],
						array_slice( $this->trace, $this->offset + 1 )
				);
		}
}
