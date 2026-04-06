import { useRef } from 'react';

import { Box } from '@debug-panel/ui';

import { useTruncateEnd } from '../hooks/use-truncate-end';
import type { TruncateSharedProps } from '../types';
import { Ellipsis } from './ellipsis';

export const TruncateEnd = (
    {
        className,
        children,
        items,
        ellipsisRef,
        onEllipsisClick,
        setHiddenSegments,
        hiddenSegments
    }: TruncateSharedProps ) => {

    const ref = useRef<HTMLDivElement>( null );

    useTruncateEnd( { ref, items, setHiddenSegments } );

    return (
        <Box ref={ ref } className={ className }>
            { children }

            { hiddenSegments.length > 0 && (
                <Ellipsis
                    mode="end"
                    ref={ ellipsisRef }
                    onClick={ onEllipsisClick }
                    count={ hiddenSegments.length }
                />
            ) }
        </Box>
    )
}
