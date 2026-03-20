import React from "react";

type Props = {
    className: string;
    onMouseDown: React.MouseEventHandler<HTMLDivElement>;
};

export const ResizeCornerHandle = ( { className, onMouseDown }: Props ) => {
    return (
        <div
            className={ `dp__resizable__handle dp__resizable__handle-corner ${ className }` }
            onMouseDown={ onMouseDown }
        />
    );
};
