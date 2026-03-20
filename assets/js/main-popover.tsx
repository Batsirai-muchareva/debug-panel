import React, { forwardRef } from "react";
import { Fill, Slot } from "@wordpress/components";

import { Notification } from "@libs/notification";
import { Variant } from "@libs/types";

import { MAIN_POPOVER_KEY, usePopover } from "@app/context/popover-context";
import { useTabs } from "@app/context/tabs/tabs-context";
import { Draggable } from "@component/draggable";
import { Popover } from "@component/popover/popover";
import { PopoverContent } from "@component/popover/popover-content";
import { PopoverHeader } from "@component/popover/popover-header";
import { Resizable } from "@component/resizable";
import { Tab } from "@component/tabs/tab";
import { Tabs } from "@component/tabs/tabs";
import { CloseButton } from "@component/ui/close-button";
import { Flex } from "@component/ui/flex";
import { Label } from "@component/ui/label";
import { Padding } from "@component/ui/padding";

import { Panel } from "./panel";

const variantSlotFillName = ( name: string ) => `${ name }-variant`;

export const MainPopover = forwardRef<HTMLDivElement>( ( _, ref ) => {
    const { toggle: mainToggle } = usePopover( MAIN_POPOVER_KEY );
    const { tabs, setProvider, activeProvider } = useTabs();

    return (
        <Popover ref={ ref } id={ MAIN_POPOVER_KEY }>
            <Resizable>
                <PopoverHeader>
                    <Draggable>
                        <Padding>
                            <Flex>
                                <Label text="Dev Debug"/>
                                <CloseButton onClick={ mainToggle } />
                            </Flex>
                        </Padding>
                    </Draggable>
                </PopoverHeader>

                <PopoverContent>
                    <Padding style={ { gap: 8 } }>
                        <Tabs type="tab">
                            {
                                tabs.map( ( { id, title, variants }: any ) => (
                                    <React.Fragment key={ id }>
                                        <Tab
                                            id={ id }
                                            label={ title }
                                            onClick={ () => setProvider( id ) }
                                            active={ activeProvider === id }
                                        />
                                        <Fill name={ variantSlotFillName( id ) } >
                                            <Variants variants={ variants } />
                                        </Fill>
                                    </React.Fragment>
                                ) )
                            }
                        </Tabs>

                        <VariantsTabSlot />

                        <Panel />
                    </Padding>
                    <Notification />
                </PopoverContent>
            </Resizable>
        </Popover>
    )
} )

const Variants = ( { variants }: { variants: Pick<Variant, 'id' | 'label'>[] } ) => {
    const { setVariant } = useTabs();

    return (
        <Tabs type="variant">
            { variants.map( ( { id, label } ) => (
                <Tab
                    key={ id }
                    id={ id }
                    label={ label }
                    onClick={ () => setVariant( id ) }
                />
            ) ) }
        </Tabs>
    )
}

const VariantsTabSlot = () => {
    const { activeProvider } = useTabs();

    return <Slot name={ variantSlotFillName( activeProvider )  } />
}
