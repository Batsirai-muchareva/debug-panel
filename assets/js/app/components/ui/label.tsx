import React from "react";

import { bemBlock } from "@libs/utils";

type Props = {
    text: string;
};

export const Label = ( { text }: Props ) => {
    return <p className={ bemBlock.element( 'label' )}>{ text }</p>
}
