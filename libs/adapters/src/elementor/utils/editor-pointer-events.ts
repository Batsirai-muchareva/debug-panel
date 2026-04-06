
const ELEMENTOR_PREVIEW_ID = 'elementor-preview';

const POINTER_EVENTS_DISABLED_CLASS = 'pointer-events-none';

export function toggleEditorPointerEvents( disableEvents: boolean ) {
    const elementorPreview = document.getElementById( ELEMENTOR_PREVIEW_ID );

    if ( ! elementorPreview ) {
        return;
    }

    if ( disableEvents ) {
        elementorPreview.classList.add( POINTER_EVENTS_DISABLED_CLASS );
    } else {
        elementorPreview.classList.remove( POINTER_EVENTS_DISABLED_CLASS );
    }
}
