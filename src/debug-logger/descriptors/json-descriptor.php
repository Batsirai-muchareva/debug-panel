<?php

namespace DevDebugTool\Debug_Logger\Descriptors;

/**
 * Wraps a value to signal that dp() should send it as a JSON payload.
 *
 * This is a pure value object — it carries no behaviour beyond holding
 * the original value. Construct it via the as_json() global helper,
 * never directly.
 *
 * Usage:
 *   dp( as_json( $my_array ) );
 *   dp( as_json( '{"raw":"json"}' ) );
 */
final class Json_Descriptor {
		public $value;

		public function __construct( $value ) {
				$this->value = $value;
		}
}
