import React from "react";
import { bemBlock } from "@app/utils/bem";
import { Button } from "@component/ui/button";
import { useKey } from "@app/context/key-context";

export type TabProps = {
    active?: boolean;
    onClick: () => void;
    label: string;
    id: string;
};

export const Tab = ( { active, label, onClick, id }: TabProps ) => {
    const variant = useKey();

    if ( ! variant ) {
        throw Error( `Variant is required for ${ id }` );
    }

    return (
        <Button
            className={ bemBlock.condElemMod( variant ?? '', 'active', active ?? false ) }
            onClick={ onClick }
        >
            <p aria-label={ id }>{ label }</p>
        </Button>
    )
}
