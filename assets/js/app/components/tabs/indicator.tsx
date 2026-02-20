import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box } from "@component/ui/box";
import { useTabs } from "@app/context/tabs/tabs-context";
import { useEventBus } from "@app/events";

type Props = {
    tabCount: number;
    className: string;
};

export const Indicator = forwardRef<HTMLDivElement, Props>( ( { tabCount, className }, ref ) => {
    const [ width, setWidth ] = useState(0);
    const { getActiveIndex } = useTabs();
    const activeIndex = getActiveIndex();

    const calculateSize = useCallback( () => {
        if ( ! ref || typeof ref === "function" || ! ref.current || tabCount === 0 ) {
            return;
        }

        const element = ref.current;

        const elementWidth = element?.clientWidth;

        setWidth( elementWidth / tabCount );
    }, [] );


    useEventBus( 'window:mousemove', calculateSize );

    useEffect( () => {
        requestAnimationFrame(() => {
            calculateSize()
        } );
    }, [] );

    const styles = {
        width: width,
        transform: `translateX(${ activeIndex * ( width - 3 ) }px)`
    };

    return (
        <Box style={ styles } className={ className } />
    )
} );
