<?php

use DevDebugTool\Debug_Logger\Debug;
use DevDebugTool\Debug_Logger\Descriptors\Json_Descriptor;
use DevDebugTool\Debug_Logger\Descriptors\Label_Descriptor;
use DevDebugTool\Debug_Logger\Payloads\Json_Payload;

/**
 * dp() — send any PHP value to the server-panel debug UI.
 *
 * Usage
 * -----
 *   dp( $value );               // PHP dump — coloured, collapsible tree
 *   dp( as_json($value) );      // JSON viewer — syntax-highlighted
 *   dp( $a, $b, as_json($c) );  // multiple values, one call
 *
 * Format is chosen by *wrapping* the value, not by chaining methods.
 * dp() always returns void — nothing leaks back to the caller.
 *
 * @param mixed ...$values  One or more values. Each becomes a separate event.
 */
if ( ! function_exists( 'dp' ) ) {
    function dp( ...$args ): void {
		    Debug::send( ...$args );
    }
}

/**
 * as_json() — descriptor helper that tells dp() to use the JSON viewer.
 *
 * Accepts any value that can be JSON-encoded, or a raw JSON string.
 * Pass the return value directly to dp() — do not use it elsewhere.
 *
 * Usage
 * -----
 *   dp( as_json( $array ) );
 *   dp( as_json( $wp_post ) );
 *   dp( as_json( '{"foo":"bar"}' ) );  // raw JSON string — validated + pretty-printed
 *
 * @param  mixed $value
 * @return Json_Descriptor
 */
if ( ! function_exists( 'as_json' ) ) {
    function as_json( mixed $value ): Json_Descriptor {
        return new Json_Descriptor( $value );
    }
}

if ( ! function_exists( 'with_label' ) ) {
		function with_label( string $label ): Label_Descriptor {
				return new Label_Descriptor( $label );
		}
}
