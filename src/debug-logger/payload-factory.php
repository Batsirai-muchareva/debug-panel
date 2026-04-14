<?php

namespace DevDebugTool\Debug_Logger;

use DevDebugTool\Debug_Logger\Descriptors\Json_Descriptor;
use DevDebugTool\Debug_Logger\Descriptors\Label_Descriptor;
use DevDebugTool\Debug_Logger\Payloads\Json_Payload;
use DevDebugTool\Debug_Logger\Payloads\Php_Payload;

class Payload_Factory {
		public static function create_payload( $args ): array {
				$instance = new self();

				return [
						'label' => $instance->extract_label($args),
						'payload' => $instance->build_payload($args),
				];
		}

		private function extract_label( array &$args ): ?string {
				foreach ( $args as $i => $value ) {
						if ( $value instanceof Label_Descriptor ) {
								unset( $args[$i] );
								return $value->label;
						}
				}

				return 'Log';
		}

		private function build_payload( array $args ): array {
				return array_map( fn ( $value ) => $this->create( $value )->to_array(), $args );
		}

		private function create( $value ) {
				if ( $value instanceof Json_Descriptor ) {
						return new Json_Payload( $value->value );
				}

				return new Php_Payload( $value );
		}
}
