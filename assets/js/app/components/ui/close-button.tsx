import React from "react";

import { bemBlock } from "@libs/utils";

import { Button } from "@component/ui/button";

export const CloseButton = ( { onClick }: { onClick?: () => void } ) => {
    return (
        <Button className={ bemBlock.element( 'close-button' ) } onClick={ onClick }>
            <i className="eicon-close"></i>
        </Button>
    )
}
