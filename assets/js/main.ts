import { createElement } from "react";
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import { App } from "./app";

domReady( () => {
    const root = createRoot( document.getElementById( 'dev-debug-slot' ) as HTMLElement );

    root.render( createElement( App ) );
} )

/**
 * TODO Search from the preview in the future
 */
