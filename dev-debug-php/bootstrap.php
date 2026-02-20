<?php

use DevDebug\Debug;
use Symfony\Component\VarDumper\Caster\ScalarStub;
use Symfony\Component\VarDumper\VarDumper;

if ( ! function_exists('dev_debug') ) {
		function dev_debug( mixed $value, array $context = [] ): void
		{
				Debug::send( $value, $context );
		}
}

if ( ! function_exists('dd') ) {
		function dd( mixed $value, array $context = [] ): void
		{
				Debug::send( $value, $context );
		}
}

if ( ! function_exists( 'dev_dump' ) ) {
		function dev_dump( ...$vars )
		{
				$isCli = \in_array( \PHP_SAPI, ['cli', 'phpdbg', 'embed'], true );

				if ( ! $isCli && ! headers_sent() ) {
						http_response_code( 500 );
				}

				if ( ! $vars ) {
						VarDumper::dump( new ScalarStub('🐛') );
						exit(1);
				}

				if ( count( $vars ) === 1 ) {
						VarDumper::dump( $vars[0] );
				} else {
						foreach ( $vars as $k => $v ) {
								VarDumper::dump( $v, is_int( $k ) ? $k + 1 : $k );
						}
				}

				exit( 1 );
		}
}
