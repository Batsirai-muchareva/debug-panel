import { adapter } from './adapter';

export type StorageSchema = Record<string, unknown>;

const store = <T extends StorageSchema>( namespace: string, scopeKey?: string ) => {
    const { read, write, drop } = adapter( namespace, scopeKey );

    const get = <K extends keyof T>( key: K ): T[K] | null => {
        return ( read()[ key as string ] as T[K] ) ?? null;
    }

    const set = <K extends keyof T>( key: K, value: T[K] ): void => {
        write( { ...read(), [key]: value } );
    }

    const remove = <K extends keyof T>( key: K ): void => {
        const { [key]: _, ...rest } = read();

        write( rest );
    };

    const all = (): Partial<T> => {
        return read() as Partial<T>;
    };

    const clear  = (): void => drop();

    return { get, set, remove, all, clear };
};

export { store };
