export const POPOVER_CONTENT_PORTAL_ID = 'popover-content-portal-id';

export const getPortalElement = ( id: string = POPOVER_CONTENT_PORTAL_ID ) => {
    const portal = document.getElementById( id );

    if ( ! portal ) {
        throw Error( 'Portal is required to mount popover' )
    }

    return portal;
}
