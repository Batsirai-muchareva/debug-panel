import React from "react";

import { useKey } from "@libs/key-context";

import { Button } from "@component/ui/button";

export type TabProps = {
    active?: boolean;
    onClick: () => void;
    label: string;
    id: string;
};

export const Tab = ( { active = false, label, onClick, id }: TabProps ) => {
    const variant = useKey();

    if ( ! variant ) {
        throw Error( `Variant is required for ${ id }` );
    }

    const classNames = [ `dp__${variant}` ];

    if ( active ) {
        classNames.push( 'dp__active' )
    }

    return (
        <Button
            className={ classNames.join( ' ' ) }
            onClick={ onClick }
        >
            <p aria-label={ id }>{ label }</p>
        </Button>
    )
}
