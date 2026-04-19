<?php

namespace DevDebugTool\Debug_Logger\Payloads;

use DevDebugTool\Debug_Logger\Normalizer;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;

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
