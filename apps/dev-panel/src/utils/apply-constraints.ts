import type { Dimensions } from '../hooks/use-resize-state';

const CONSTRAINTS = {
    minWidth: 300,
    minHeight: 300,
    maxWidth: 800,
    maxHeight: 800,
}

export const applyConstraints = <T extends Dimensions['size'] & Dimensions['position']>( dimensions: T ) => {
    const { width, height, x, y } = dimensions;
    const { minWidth, minHeight, maxWidth, maxHeight } = CONSTRAINTS;

    const constrainedWidth = clamp( width, minWidth, maxWidth );
    const constrainedHeight = clamp( height, minHeight, maxHeight );

    // if width hit a constraint, discard x so position doesn't shift
    const constrainedX = constrainedWidth !== width ? undefined : x;

    // if height hit a constraint, discard y so position doesn't shift
    const constrainedY = constrainedHeight !== height ? undefined : y;

    return {
        width: constrainedWidth,
        height: constrainedHeight,
        x: constrainedX,
        y: constrainedY,
    };
};

const clamp = ( value: number, min: number, max: number ): number => {
    return Math.max( min, Math.min( max, value ) );
}
