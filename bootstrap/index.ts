import { registerSchemaProvider } from './providers/schema';
import { registerEditorProvider } from './providers/editor';
import { registerDatabaseProvider } from './providers/database';

import { initToolbarActions } from '@debug-panel/toolbar';
import { dynamicSegments } from '@debug-panel/path';
import { elementorAdapter } from '@debug-panel/adapters';

export const init = () => {
    registerSchemaProvider();
    registerEditorProvider();
    registerDatabaseProvider();

    initToolbarActions();

    dynamicSegments.register( 'styles.{elementId}' );

    // dynamicSegments.register()
}
