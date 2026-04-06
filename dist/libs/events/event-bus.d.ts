import { EventMap } from './event-map';
type Unsubscribe = () => void;
export type EventName = keyof EventMap;
export type EventHandler<E extends EventName> = (payload: EventPayload<E>) => void;
type EventPayload<E extends EventName> = EventMap[E];
interface EventBus {
    on<E extends EventName | EventName[]>(event: E, handler: EventHandler<EventName>): Unsubscribe;
    once<E extends EventName>(event: E, handler: EventHandler<E>): void;
    emit<E extends EventName>(event: E, ...args: EventPayload<E> extends void ? [] : [payload: EventPayload<E>]): void;
    off<E extends EventName>(event: E): void;
    offAll(): void;
}
export declare const eventBus: EventBus;
export {};
