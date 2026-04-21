import React, {
    Children,
    type ComponentType,
    isValidElement,
    type ReactElement,
    useRef,
} from 'react';

import { Box } from '@debug-panel/ui';

export type InjectedProps =  {
    id: string;
    isActive?: boolean;
    onClick?: () => void;
};

export type IndicatorProps = {
    tabCount: number;
    activeIndex: number;
    containerRef: React.RefObject<HTMLDivElement>;
}

interface GroupProps {
    activeId: string;
    children: React.ReactNode;
    onActivate: ( id: string ) => void;
    indicator: ComponentType<IndicatorProps>;
    className: string;
}

export const Group = (
    {
        activeId,
        children,
        onActivate,
        indicator: Indicator,
        className
    }: GroupProps
) => {
    const ref = useRef<HTMLDivElement>( null );

    const items = Children.toArray( children ).filter( isValidElement );

    const activate = ( id: string ) =>{
        onActivate?.( id );
    }

    const activeIndex = items.findIndex(
        ( child ) => ( child as ReactElement<InjectedProps> ).props.id === activeId,
    );

    return (
        <Box ref={ ref } className={ className }>
            <Indicator containerRef={ ref } tabCount={ items.length } activeIndex={ activeIndex } />

            { items.map( ( child ) => {
                const item = child as ReactElement<InjectedProps>;

                return React.cloneElement( item, {
                    isActive: item.props.id === activeId,
                    onClick: () => activate( item.props.id ),
                } );
            } ) }
        </Box>
    );
};
