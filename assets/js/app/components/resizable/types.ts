export type DIRECTION = 'n' | 's' | 'w' | 'e' | 'nw' | 'ne' | 'sw' | 'se';

export type StartState = {
    width: number;
    height: number;
    posX: number;
    posY: number;
}

export type Delta = {
    x: number;
    y: number;
}

export type Dimensions = {
    newWidth: number;
    newHeight: number;
    newY: number;
    newX: number;
}

export type Constraints = {
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
}
