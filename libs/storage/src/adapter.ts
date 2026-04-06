import { deserialize } from './local-storage/deserialize';
import { persist } from './local-storage/persist';

export const adapter = ( namespace: string, scopeKey?: string ) => {
    return {
        read: (): Record<string, unknown> => {
            const raw = deserialize( namespace );

            return scopeKey ? ( raw[scopeKey] as Record<string, unknown> ) ?? {} : raw;
        },
        write: ( data: Record<string, unknown> ): void => {
            if ( scopeKey ) {
                persist( namespace, { ...deserialize( namespace ), [scopeKey]: data } );
            } else {
                persist( namespace, data );
            }
        },
        // drop: (): void => {
        //     if ( scopeKey ) {
        //         const raw = parse( namespace );
        //
        //         delete raw[scopeKey];
        //
        //         persist( namespace, raw );
        //     } else {
        //         localStorage.removeItem( namespace );
        //     }
        // },
    }
};
