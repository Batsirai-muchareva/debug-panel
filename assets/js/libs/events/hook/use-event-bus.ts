import { useEffect } from "@wordpress/element";
import { eventBus, EventHandler, EventName } from "../event-bus";

export const useEventBus = <E extends EventName | readonly EventName[]>(
    event: E,
    handler: EventHandler<
        E extends readonly EventName[] ? E[number] : E
    >,
): void => {
    useEffect( () => {
        const events = Array.isArray( event ) ? event : [ event ];

        const offs = events.map(e =>
            eventBus.on(e, handler as EventHandler<any>)
        );

        return () => {
            offs.forEach(off => off());
        };
    }, [ event, handler ] );
}
