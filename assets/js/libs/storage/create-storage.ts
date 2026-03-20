type StorageSchema = Record<string, unknown>;

const createStorage = <T extends StorageSchema>( namespace: string ) => {
    const config: { id: string | null; } = { id: null }

    const readAll = (): Partial<T> => {
        try {
            const stored = localStorage.getItem( namespace );
            const parsed = stored ? JSON.parse(stored) : {};

            return config.id ? (parsed[config.id] ?? {}) : parsed;
        } catch {
            return {};
        }
    };

    const writeAll = ( data: Partial<T> ) => {
        try {
            if (config.id) {
                const stored = localStorage.getItem(namespace);
                const parsed = stored ? JSON.parse(stored) : {};
                localStorage.setItem(namespace, JSON.stringify({ ...parsed, [config.id]: data }));
            } else {
                localStorage.setItem(namespace, JSON.stringify(data));
            }
        } catch {
            console.error(`[${namespace}] Failed to write to localStorage`);
        }
    };

    const get = <K extends keyof T>( key: K ): T[K] | null => {
        const all = readAll();
        return ( all[ key ] as T[K] ) ?? null;
    };

    const set = <K extends keyof T>( key: K, value: T[K] ) => {
        const all = readAll();
        writeAll( { ...all, [ key ]: value } );
    };

    const remove = <K extends keyof T>( key: K ) => {
        const all = readAll();
        const { [ key ]: _, ...rest } = all;
        writeAll( rest as Partial<T> );
    };

    const clear = () => {
        if (config.id) {
            const stored = localStorage.getItem(namespace);
            const parsed = stored ? JSON.parse(stored) : {};
            delete parsed[config.id];
            localStorage.setItem(namespace, JSON.stringify(parsed));
        } else {
            localStorage.removeItem(namespace);
        }
    };

    const getAll = (): Partial<T> => {
        return readAll();
    };

    const setId = ( id: string ) => {
        config.id = id;
    }

    return {
        get, set, remove, clear, getAll, setId,
        unscoped: {
            get: <K extends keyof T>(key: K): T[K] | null => {
                try {
                    const stored = localStorage.getItem(namespace);
                    const parsed = stored ? JSON.parse(stored) : {};
                    return (parsed[key] as T[K]) ?? null;
                } catch { return null; }
            },
            set: <K extends keyof T>(key: K, value: T[K]) => {
                try {
                    const stored = localStorage.getItem(namespace);
                    const parsed = stored ? JSON.parse(stored) : {};
                    localStorage.setItem(namespace, JSON.stringify({ ...parsed, [key]: value }));
                } catch {
                    console.error(`[${namespace}] Failed to write to localStorage`);
                }
            },
        },
    };
};

export { createStorage };
