import React from "react";
import { bemBlock } from "@app/utils/bem";

type Props = {
    className: string;
    onMouseDown: React.MouseEventHandler<HTMLDivElement>;
};

export const ResizeBarHandle = ( { className, onMouseDown }: Props ) => {
    return (
        <div
            className={ bemBlock.elements( [ 'resizable__handle', 'resizable__handle-edge', className ] )}
            onMouseDown={ onMouseDown }
        />
    );
};
