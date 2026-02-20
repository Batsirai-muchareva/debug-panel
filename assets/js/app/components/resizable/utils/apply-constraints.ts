import { Constraints, Dimensions } from "@libs/resizable/types";

export const applyConstraints = (
    dimensions: Dimensions,
    constraints: Constraints
) => {
    const { newWidth, newHeight, newX, newY } = dimensions;
    const { minWidth, minHeight, maxWidth, maxHeight } = constraints;

    const constrainedWidth = clamp( newWidth, minWidth, maxWidth );
    const constrainedHeight = clamp( newHeight, minHeight, maxHeight );

    return {
        width: constrainedWidth,
        height: constrainedHeight,
        x: newX,
        y: newY,
    };
};

const clamp = ( value: number, min: number, max: number ) => Math.max( min, Math.min( max, value ) );
