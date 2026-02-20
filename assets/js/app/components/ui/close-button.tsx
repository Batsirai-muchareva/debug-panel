import { Button } from "@component/ui/button";
import React from "react";
import { bemBlock } from "@app/utils/bem";

export const CloseButton = ( { onClick }: { onClick?: () => void } ) => {
    return (
        <Button className={ bemBlock.element( 'close-button' ) } onClick={ onClick }>
            <i className="eicon-close"></i>
        </Button>
    )
}
