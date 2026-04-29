export type Notify<T> = ( data: T | null ) => void;
export type Unsubscribe = () => void;

export type Source<T> = {
    subscribe( notify: Notify<T> ): void;
    unsubscribe(): void;
    prefetch(): void
};

export type Payload = {
    meta: {
        type: 'raw' | 'keys' | 'slice';
        timestamp: number;
    };
    data: unknown;
}

export interface Variant {
    id: string;
    label: string;
    order?: number;
    empty?: {
        title: string;
        message: string;
    };
    source: Source<Payload>;
    middleware?: MiddlewareFactory[];
}

export interface Provider {
    id: string;
    label: string;
    order?: number;
    prefetch?: boolean;
    variants: Variant[];
    // browsable?: boolean;
}

export type Transform<In = unknown, Out = unknown> = (
    value: In,
    next: ( value: Out ) => void
) => void;

export type MiddlewareControl = {
    replay: () => void;
};

export type Middleware<In = unknown, Out = unknown> = {
    transform: Transform<In, Out>;
    // subscribe?: () => () => void;
    subscribe?: ( control: MiddlewareControl ) => ( () => void ) | void;
};

export type MiddlewareFactory<In = unknown, Out = unknown> = (
    ctx: { variantId: string }
) => Middleware<In, Out>;

// export type Transform<In = unknown> = (
//     value: In,
//     next: ( value: Payload ) => void
// ) => void;
//
// export type Middleware<T = unknown> = {
//     transform: Transform<T>;
//     subscribe?: () => () => void; // returns unsubscribe
// };
//
// export type MiddlewareFactory<In = unknown> = (
//     ctx: MiddlewareContext
// ) => Middleware<In>;
