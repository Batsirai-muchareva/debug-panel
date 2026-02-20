import { editorProvider } from "@app/providers/editor/provider";
import { databaseProvider } from "@app/providers/database/provider";
import { schemaProvider } from "@app/providers/schema/provider";
import { sourceManager } from "@app/source-manager/source-manager";

export const registerDataSources = () => {
    sourceManager.registerSource( editorProvider );
    sourceManager.registerSource( databaseProvider );
    sourceManager.registerSource( schemaProvider );
}
