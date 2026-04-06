import type { Dimensions, Direction } from '../hooks/use-resize-state';

type Delta = {
    x: number;
    y: number;
};

type Args = {
    direction: Direction;
    startSize: Dimensions['size'];
    startPosition: Dimensions['position'];
    delta: Delta;
};

type Result = Dimensions['size'] & Dimensions['position'];

export const calculateDimensions = (
    {
        direction,
        startSize,
        startPosition,
        delta
    }: Args
): Result => {
    const { width, height } = startSize;
    const { x: originX, y: originY } = startPosition;
    const { x: dx, y: dy } = delta;

    return {
        ...calculateHorizontal( { direction, width, originX, dx } ),
        ...calculateVertical( { direction, height, originY, dy } ),
    } as Result;
};

// Resizing from the EAST (right edge) → only width grows, panel stays put
// Resizing from the WEST (left edge)  → width shrinks AND panel moves right to compensate
const calculateHorizontal = (
    {
        direction,
        width,
        originX,
        dx
    }: {
        direction: Direction;
        width: number;
        originX: number;
        dx: number;
    } ): { width: number; x: number | undefined } => {

    if ( direction.includes( 'e' ) ) {
        return {
            width: width + dx,
            x: undefined,          // east resize — panel left edge stays fixed
        };
    }

    if ( direction.includes( 'w' ) ) {
        return {
            width: width - dx,
            x: originX + dx,       // west resize — panel left edge moves with the drag
        };
    }

    return { width, x: undefined }; // no horizontal resize
};



// Resizing from the SOUTH (bottom edge) → only height grows, panel stays put
// Resizing from the NORTH (top edge)    → height shrinks AND panel moves down to compensate
const calculateVertical = (
    {
        direction,
        height,
        originY,
        dy,
    }: {
        direction: Direction;
        height: number;
        originY: number;
        dy: number;
    } ): { height: number; y: number | undefined } => {

    if ( direction.includes( 's' ) ) {
        return {
            height: height + dy,
            y: undefined,          // south resize — panel top edge stays fixed
        };
    }

    if ( direction.includes( 'n' ) ) {
        return {
            height: height - dy,
            y: originY + dy,       // north resize — panel top edge moves with the drag
        };
    }

    return { height, y: undefined }; // no vertical resize
};

//The key insight spelled out:
//
// East/South resize — you're dragging the far edge outward, so the panel's top-left origin doesn't move, only size changes
// West/North resize — you're dragging the near edge, so the panel's origin must move to follow your cursor otherwise the panel would resize from the wrong side
//     let newWidth = width;
//     let newHeight = height;
//     let newX: number | undefined;
//     let newY: number | undefined;
//
//     if ( direction.includes( 'e' ) ) {
//         newWidth = width + dx;
//     } else if ( direction.includes( 'w' ) ) {
//         newWidth = width - dx;
//         newX = posX + dx;
//     }
//
//     if ( direction.includes( 's' ) ) {
//         newHeight = height + dy;
//     } else if ( direction.includes( 'n' ) ) {
//         newHeight = height - dy;
//         newY = posY + dy;
//     }
//
//     return { width: newWidth, height: newHeight, x: newX, y: newY };
