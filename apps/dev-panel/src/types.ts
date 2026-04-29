import type { Payload } from '@debug-panel/providers';

export type DataState = {
    status: 'data' | 'no-results' | 'empty';
    meta: Payload['meta'] | null;
    value: unknown | null;
};
