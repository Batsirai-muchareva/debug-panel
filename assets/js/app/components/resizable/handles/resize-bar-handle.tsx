import React from "react";

type Props = {
    className: string;
    onMouseDown: React.MouseEventHandler<HTMLDivElement>;
};

export const ResizeBarHandle = ( { className, onMouseDown }: Props ) => {
    return (
        <div
            className={ `dp__resizable__handle resizable__handle-edge ${ className }` }
            onMouseDown={ onMouseDown }
        />
    );
};
