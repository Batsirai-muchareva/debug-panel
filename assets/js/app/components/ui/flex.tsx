import React from "react";
import { PropsWithChildren } from "react";

import { bemBlock } from "@app/utils/bem";

export const Flex = ( { children }: PropsWithChildren ) => (
    <div className={ bemBlock.element( 'flex' ) }>{children}</div>
)
