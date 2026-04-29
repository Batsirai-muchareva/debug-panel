import { useEffect, useState } from "react";

export const useElementorDockOffset = () => {
    const [rightOffset, setRightOffset] = useState( 0 );

    const calculateOffset = () => {
        // const root = document.documentElement;
        const styles = getComputedStyle( document.body );
        // const raw = styles.getPropertyValue('--e-editor-navigator-width');

        const raw = styles.getPropertyValue( '--e-editor-navigator-width' );
        const parsed = parseInt( raw, 10 );

        // Only apply if Elementor editor is active and value is valid
        const isNavDocked =
            document.body.classList.contains( 'elementor-navigator-docked' );

        if ( isNavDocked && !isNaN( parsed ) && parsed > 0 ) {
            setRightOffset( parsed );
            document.body.classList.add( 'dock-transition' );
            setTimeout( () => {
                document.body.classList.remove( 'dock-transition' );
            }, 300 );
        } else {
            setRightOffset( 0 );
        }
    };

    useEffect( () => {
        calculateOffset();

        const observer = new MutationObserver( () => {
            calculateOffset();
        } );

        observer.observe( document.body, {
            childList: true,
            subtree: true,
        } );

        window.addEventListener( 'resize', calculateOffset );

        return () => {
            observer.disconnect();
            window.removeEventListener( 'resize', calculateOffset );
        };
    }, [] );

    return rightOffset;
};
