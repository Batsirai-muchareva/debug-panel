import { eventBus } from "@app/events";

export const attachMouseEvents = () => {
    const onMouseMove = ( event: MouseEvent ) => {
        eventBus.emit( 'window:mousemove', {
            clientX: event.clientX,
            clientY: event.clientY,
        } );
    };

    const onMouseUp = () => {
        clearEvents();

        eventBus.emit( 'window:mouseup' )
    };

    const clearEvents = () => {
        window.removeEventListener( 'mousemove', onMouseMove );
        window.removeEventListener( 'mouseup', onMouseUp );
    }

    window.addEventListener( 'mousemove', onMouseMove );
    window.addEventListener( 'mouseup', onMouseUp );

    return clearEvents
}
