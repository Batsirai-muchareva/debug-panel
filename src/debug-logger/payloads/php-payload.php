<?php

namespace DevDebugTool\Debug_Logger\Payloads;

use DevDebugTool\Debug_Logger\Normalizer;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;

/**
 * PHP dump payload — renders in the server-panel as a
 * Laravel dd() style interactive typed tree.
 *
 * Usage (via helper):
 *   dp( $anything );          // shorthand, sends PhpPayload by default
 *   dp()->php( $anything );   // explicit
 *
 * The `content` sent to the React renderer is the typed-tree array
 * produced by Normalizer::normalize(), e.g.:
 *
 *   { type: "array", count: 2, items: [
 *       { key: "name", value: { type: "string", value: "John", length: 4 } },
 *       { key: "age",  value: { type: "int",    value: 30 } },
 *   ]}
 *
 * The React PhpDump component walks this tree and renders each node
 * with colour-coded type hints, collapsible arrays/objects, and
 * visibility prefixes (+/#/-) on object properties.
 */
final class Php_Payload extends Payload {

		private $value;

		public function __construct( $value ) {
				$this->value = $value;
		}

    public function get_type(): string {
        return 'php';
    }

		/**
		 * @return string
		 */
    public function get_content(): string {
		    $cloner = new VarCloner();
		    $dumper = new HtmlDumper();

		    $clonedArgument = $cloner->cloneVar( $this->value );

				return $dumper->dump( $clonedArgument, true );
    }
}
