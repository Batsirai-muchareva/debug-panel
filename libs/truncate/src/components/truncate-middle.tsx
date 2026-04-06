import { Children, useRef } from 'react';

import { Box } from '@debug-panel/ui';

import { useTruncateMiddle } from '../hooks/use-truncate-middle';
import type { TruncateSharedProps } from '../types';
import { Ellipsis } from './ellipsis';

export const TruncateMiddle = (
    {
        children,
        className,
        items,
        ellipsisRef,
        onEllipsisClick,
        hiddenSegments,
        setHiddenSegments
    }: TruncateSharedProps ) => {
    const ref = useRef<HTMLDivElement>( null );
    useTruncateMiddle( { ref, items, setHiddenSegments, hiddenSegments } );

    const firstHiddenIndex = items.findIndex( item => item.id === hiddenSegments[ 0 ]?.id );

    return (
        <Box ref={ ref } className={ className }>
            { Children.map( children, ( child, index ) => {
                const isFirstHidden = index === firstHiddenIndex && hiddenSegments.length > 0;

                if ( ! isFirstHidden ) {
                    return child;
                }

                return (
                    <>
                        <Ellipsis
                            mode="middle"
                            ref={ ellipsisRef }
                            onClick={ onEllipsisClick }
                            count={ hiddenSegments.length }
                        />
                        { child }
                    </>
                );
            } ) }
        </Box>
    );
};
