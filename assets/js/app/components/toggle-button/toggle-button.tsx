import * as React from "react";
import { Slot } from "@wordpress/components";

import { bemBlock } from "@app/utils/bem";
import { MAIN_POPOVER_KEY, usePopover } from "@app/context/popover-context";

import { BugIcon } from "@component/toggle-button/bug-icon";

export const POSITION_TRACKER_SLOT_ID = "position-tracker-slot-id";

export const ToggleButton = () => {
    const popover = usePopover( MAIN_POPOVER_KEY );
    const className = bemBlock.condElemMod( 'toggle', 'active', popover.isOpen );

    return (
        <button onClick={ popover.toggle } className={ className }>
            <Slot name={ POSITION_TRACKER_SLOT_ID } />
            <BugIcon />
        </button>
    );
}
