import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import './styles.scss';
import { initProviders } from '@bootstrap';

import { providerRegistry } from '@debug-panel/providers';
import { initToolbarActions } from '@debug-panel/toolbar';

import App from './app/app';
import domReady from './dom-ready';
import { getSlotId } from './sync/get-slot-id';

domReady( () => {
    initProviders();
    initToolbarActions();

    window.dispatchEvent( new CustomEvent( 'dev-panel:init' ) );

    providerRegistry.seal();

    const root = createRoot(
        document.getElementById( getSlotId() ) as HTMLElement,
    );

    root.render( createElement( App ) );
} );
