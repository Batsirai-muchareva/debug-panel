import { type StorageSchema, store } from './store';

export const createStorage = <T extends StorageSchema>( namespace: string ) => {
    return {
        scope: ( scopeKey: string ) => store<T>( namespace, scopeKey ),
        unscoped: store<T>( namespace )
    }
}
