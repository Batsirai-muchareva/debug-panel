<?php

spl_autoload_register( function ( string $class ): void {
		$prefix = 'DevDebugTool\\';

		if ( strpos( $class, $prefix ) !== 0 ) {
				return;
		}

		$relative = substr( $class, strlen( $prefix ) );

		$path = implode( DIRECTORY_SEPARATOR, array_map(
				fn( string $segment ): string => strtolower( str_replace( '_', '-', $segment ) ),
				explode( '\\', $relative )
		) );


		$file = DEBUG_PANEL_PATH . 'src/' . $path . '.php';

		if ( file_exists( $file ) ) {
				require $file;
		}
} );
