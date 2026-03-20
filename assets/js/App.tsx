import * as React from 'react';
import { SlotFillProvider } from "@wordpress/components";

import { registerToolbarActions } from "@libs/toolbar";

import { BoundsProvider } from "@app/context/bounds-context";
import { PopoverProvider } from "@app/context/popover-context";
import { PositionTracker } from "@app/position-tracker";
import { registerDataSources } from "@app/source-manager";
import { ToggleButton } from "@component/toggle-button/toggle-button";

import { Shell } from "./shell";

registerDataSources();
registerToolbarActions();

export const App = () => {
    return (
        <SlotFillProvider>
            <PopoverProvider>
                <BoundsProvider>
                    <ToggleButton />
                    <PositionTracker />
                    <Shell />
                </BoundsProvider>
            </PopoverProvider>
        </SlotFillProvider>
    );
}
