export type Notify<T> = ( data: T | null ) => void;

export type Source<T> = {
    subscribe( notify: Notify<T> ): void;
    unsubscribe(): void;
};

export interface Variant<T> {
    id: string;
    label: string;
    order?: number;
    emptyMessage?: string;
    source: Source<T>;
}

export interface Provider<T = unknown> {
    id: string;
    title: string;
    order?: number;
    emptyMessage?: string;
    variants: Variant<T>[];
    browsable?: boolean;
}
