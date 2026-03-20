type Brand<T, B> = T & { __brand: B };

export type RawData = Brand<Record<string, unknown>, "RawData"> | null;
export type Data    = Brand<Record<string, unknown>, "Data"> | null;


export type Notify<T> = ( data: T | null ) => void;

export type Source<T = unknown> = {
    start( notify: Notify<T> ): void;
    stop(): void;
}

type SourceFactory< IData = unknown, IConfig = unknown > = ( config: IConfig ) => Source<IData>;

interface VariantConfig {
    id: string;
    label: string;
    order?: number;
    emptyMessage?: string;
}

export interface Variant<T = unknown, C = unknown> extends VariantConfig {
    sourceConfig?: C;
    createSource: SourceFactory<T, C>;
}

export interface Provider<T = unknown, C = unknown> {
    id: string;
    title: string;
    order?: number;
    emptyMessage?: string;
    variants: Variant<T, C>[];
    supportsBrowsing?: boolean;
}
