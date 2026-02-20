import { Change } from "../types";

export type JsonObject = Record<string, unknown>;

interface ArgsContext {
    newJSON: JsonObject;
    oldJSON: JsonObject;
    path: string;
    changes: Change[];
}

export const jsonDiffs = (
    newJSON: JsonObject,
    oldJSON: JsonObject | null,
    path = ""
): Change[] => {
    const changes: Change[] = [];

    if ( ! isObject( newJSON ) || ! isObject( oldJSON ) ) {
        return changes;
    }

    detectAddedAndModified( { newJSON, oldJSON, path, changes });

    detectRemoved( { newJSON, oldJSON, path, changes, } );

    return changes;
};

const detectAddedAndModified =
    ( { newJSON, oldJSON, path, changes }: ArgsContext ) => {

    for ( const key of Object.keys( newJSON ) ) {
        const objPath = buildPath( path, key );

        if ( ! hasKey( oldJSON, key ) ) {
            changes.push( {
                type: "added",
                path: objPath,
                newValue: newJSON[key],
            });
            continue;
        }

        if ( isObject( newJSON[key] ) && isObject( oldJSON[key] ) ) {
            changes.push(
                ...jsonDiffs(
                    newJSON[key],
                    oldJSON[key],
                    objPath
                )
            );

            continue;
        }

        if ( newJSON[key] !== oldJSON[key] ) {
            changes.push( {
                type: "modified",
                path: objPath,
                oldValue: oldJSON[key],
                newValue: newJSON[key],
            } );
        }
    }
};

const detectRemoved =
    ( { newJSON, oldJSON, path, changes }: ArgsContext) => {

    for ( const key of Object.keys( oldJSON ) ) {
        if ( ! hasKey( newJSON, key ) ) {
            changes.push( {
                type: "removed",
                path: buildPath( path, key ),
                oldValue: oldJSON[key],
            } );
        }
    }
};

const buildPath = ( basePath: string, key: string ): string => {
    return basePath ? `${basePath}.${key}` : key;
}

const isObject = ( value: unknown ): value is JsonObject => {
    return typeof value === "object" && value !== null;
}

const hasKey = ( obj: unknown, key: string ): boolean => {
    return isObject( obj ) && Object.prototype.hasOwnProperty.call( obj, key );
}
