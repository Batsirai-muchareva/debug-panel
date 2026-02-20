import React, { forwardRef } from "react";
import { Popover } from "@component/popover/popover";
import { MAIN_POPOVER_KEY, usePopover } from "@app/context/popover-context";
import { PopoverHeader } from "@component/popover/popover-header";
import { Padding } from "@component/ui/padding";
import { Flex } from "@component/ui/flex";
import { Label } from "@component/ui/label";
import { PopoverContent } from "@component/popover/popover-content";
import { useTabs } from "@app/context/tabs/tabs-context";
import { Tabs } from "@component/tabs/tabs";
import { Tab } from "@component/tabs/tab";
import { TabContent } from "@component/tabs/tab-content";
import { Fill, Slot } from "@wordpress/components";
import { CloseButton } from "@component/ui/close-button";
import { Resizable } from "@libs/resizable/resizable";
import { Draggable } from "@libs/draggable/draggable";
import { ActiveTabContent } from "./active-tab-content";
import { Toolbar } from "@component/toolbar";
import { Variant } from "@app/types";
import { useFilteredData } from "@app/context/filtered-data/filtered-data-context";

const slotFillName = ( name: string ) => `${ name }-variant`;

export const MainPopover = forwardRef<HTMLDivElement>( (_, ref ) => {
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
                                            key={ id }
                                            id={ id }
                                            label={ title }
                                            onClick={ () => setProvider( id ) }
                                            active={ activeProvider === id }
                                        />
                                        <Fill name={ slotFillName( id ) } >
                                            <Variants
                                                key={ id }
                                                variants={ variants }
                                            />
                                        </Fill>
                                    </React.Fragment>
                                ) )
                            }
                        </Tabs>

                        <Slot name={ slotFillName( activeProvider )  } />
                        <Toolbar />
                        <TabContent active={ true }>
                            <ActiveTabContent />
                        </TabContent>
                    </Padding>
                </PopoverContent>
            </Resizable>
        </Popover>
    )
} )

const Variants = ( { variants }: { variants: Pick<Variant, 'id' | 'label'>[] } ) => {
    const { setVariant } = useTabs();
    const { data } = useFilteredData();

    if ( variants.length <= 1 || ! Boolean( data ) ) {
        return null;
    }

    return (
        <Tabs type="variant">
            { variants.map( ( { id, label } ) => (
                <Tab
                    id={ id }
                    key={ id }
                    label={ label }
                    onClick={ () => setVariant( id ) }
                />
            ) ) }
        </Tabs>
    )
}
