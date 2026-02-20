import { Provider } from "@app/types";
import { DatabaseData, SourceConfig } from "@app/providers/database/types";
import { getSettings } from "@app/sync/get-settings";
import { elementorAdapter } from "@app/adapters";
import { databaseSource } from "@app/providers/database/sources/database-source";

export const databaseProvider =
    (): Provider< DatabaseData, SourceConfig > => {
    const { metaKeys, kitId } = getSettings();

    return {
        id: 'database',
        title: 'Database',
        order: 2,
        variants: [
            {
                id: 'post',
                label: 'Post',
                order: 1,
                sourceConfig: {
                    metaKey: metaKeys.post,
                    postId: elementorAdapter.postId,
                },
                createSource: databaseSource
            },
            {
                id: 'variables',
                label: 'Variables',
                order: 2,
                sourceConfig: {
                    metaKey: metaKeys.variables,
                    postId: kitId,
                },
                createSource: databaseSource
            },
            {
                id: 'global_classes',
                label: 'Classes',
                order: 3,
                sourceConfig: {
                    metaKey: metaKeys.global_classes,
                    postId: kitId,
                    refreshOnSave: true,
                },
                createSource: databaseSource,
            }
        ],
    }
}
