import { sourceManager } from "@app/source-manager/source-manager";

export function buildTabs() {
    return sourceManager.getConfigs()
        .map( ( { id, title, variants } ) => ( {
            id,
            title,
            variants: Object.entries( variants ?? {} )
                .map( ( [ _, { id, label } ] ) => ( {
                    id,
                    label
                } ) ),
        } ) );
}
