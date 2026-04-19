<?php

namespace DevDebugTool;

use DevDebugTool\Assets_Loader\Dev_Panel_Assets;
use DevDebugTool\Assets_loader\Server_Panel_Assets;

class App {
    public static function init(): void {
		    add_action( 'init', function() {
				    ( new Dev_Panel_Assets() )->init();
				    ( new Server_Panel_Assets() )->init();

				    ( new Database_Ajax() )->register_hooks();
		    } );
    }
}
