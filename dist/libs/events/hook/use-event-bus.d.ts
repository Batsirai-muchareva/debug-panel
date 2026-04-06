import { EventHandler, EventName } from '../event-bus';
export declare const useEventBus: <E extends EventName | readonly EventName[]>(event: E, handler: EventHandler<E extends readonly EventName[] ? E[number] : E>) => void;
