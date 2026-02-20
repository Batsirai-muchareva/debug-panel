import React from "react";

import { bemBlock } from "@app/utils/bem";

type Props = {
    text: string;
};

export const Label = ( { text }: Props ) => {
    return <p className={ bemBlock.element( 'label' )}>{ text }</p>
}
