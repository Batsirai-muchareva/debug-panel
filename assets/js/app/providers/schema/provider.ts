import { Provider } from "@app/types";
import { SchemaData, schemaSource, SourceConfig } from "@app/providers/schema/sources/schema-source";


export const schemaProvider =
    (): Provider< SchemaData, SourceConfig > => {

    return {
        id: 'schema',
        title: 'Schema',
        order: 3,
        supportsBrowsing: true,
        variants: [
            {
                id: 'style-schema',
                label: 'Style',
                sourceConfig: {
                    schemaKey: "style"
                },
                createSource: schemaSource
            },
            {
                id: 'elements-schema',
                label: 'Elements',
                sourceConfig: {
                    schemaKey: "elements"
                },
                createSource: schemaSource
            },
        ]
    }
}
