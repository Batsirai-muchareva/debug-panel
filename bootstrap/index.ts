import { registerSchemaProvider } from './providers/schema';
import { registerEditorProvider } from './providers/editor';
import { registerDatabaseProvider } from './providers/database';

export const initProviders = () => {
    registerSchemaProvider();
    registerEditorProvider();
    registerDatabaseProvider();
}
