import { bemBlock } from "@app/utils/bem";

export function editorPointerEvents( disableEvents: boolean ) {
    const elementorPreview = document.getElementById( 'elementor-preview' );
    const className = bemBlock.elemMod( 'resizable', 'disable-events' );

    if ( ! elementorPreview ) {
        return;
    }

    if ( disableEvents ) {
        elementorPreview.classList.add( className );
    } else {
        elementorPreview.classList.remove( className );
    }
}
