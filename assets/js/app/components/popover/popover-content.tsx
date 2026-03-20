import React from "react";
import { PropsWithChildren } from "react";

export const PopoverContent = ( { children }: PropsWithChildren ) => {
    return <div className="dp__popover__content">{ children }</div>
}
