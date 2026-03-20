import React from "react";
import { PropsWithChildren } from "react";

import { bemBlock } from "@libs/utils";

export const Flex = ( { children }: PropsWithChildren ) => (
    <div className={ bemBlock.element( 'flex' ) }>{children}</div>
)
