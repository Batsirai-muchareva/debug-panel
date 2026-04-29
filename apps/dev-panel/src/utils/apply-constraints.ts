import type { Dimensions } from '../hooks/use-resize-state';

const CONSTRAINTS = {
    minWidth:  300,
    minHeight: 300,
}

export const applyConstraints = <T extends Dimensions['size'] & Dimensions['position']>( dimensions: T ) => {
    const { width, height, x, y } = dimensions;

    const constrainedWidth = Math.max( width, CONSTRAINTS.minWidth  );
    const constrainedHeight = Math.max( height, CONSTRAINTS.minHeight );

    const constrainedX = constrainedWidth  !== width  ? undefined : x;
    const constrainedY = constrainedHeight !== height ? undefined : y;

    return {
        width: constrainedWidth,
        height: constrainedHeight,
        x: constrainedX,
        y: constrainedY,
    };
};
