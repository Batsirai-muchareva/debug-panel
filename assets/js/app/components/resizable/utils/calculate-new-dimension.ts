import { Delta, DIRECTION, StartState } from "@libs/resizable/types";

export const calculateNewDimensions = (
    direction: DIRECTION,
    startState: StartState,
    delta: Delta
) => {
    const { width, height, posY, posX } = startState;
    const { x: dx, y: dy } = delta;

    let newWidth = width;
    let newHeight = height;
    let newX = posX;
    let newY = posY;

    // Horizontal resizing
    if ( direction.includes( 'e' ) ) {
        newWidth = width + dx;
    } else if ( direction.includes( 'w' ) ) {
        newWidth = width - dx;
        newX = posX + dx;
    }

    // Vertical resizing
    if ( direction.includes( 's' ) ) {
        newHeight = height + dy;
    } else if ( direction.includes( 'n' ) ) {
        newHeight = height - dy;
        newY = posY + dy;
    }

    return { newWidth, newHeight, newY, newX };
};
