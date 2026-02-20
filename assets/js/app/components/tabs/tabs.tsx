import { Box } from "@component/ui/box";
import React, { PropsWithChildren, Children, useMemo, useRef } from "react";
import { Indicator } from "@component/tabs/indicator";
import { bemBlock } from "@app/utils/bem";
import { KeyProvider } from "@app/context/key-context";

type Props = PropsWithChildren & {
    type: 'tab' | 'variant';
    extraChildren?: React.ReactNode;
};

export const Tabs = ( { children, type }: Props ) => {
    const ref = useRef( null );
    const classPrefix = type + 's';

    const tabCount = useMemo( () => Children.count( children ), [] )

    return (
        <KeyProvider value={ type }>
            <Box ref={ ref } className={ bemBlock.element( classPrefix ) }>
                <Indicator
                    className={ bemBlock.element( classPrefix + '-indicator' ) }
                    ref={ ref }
                    tabCount={ tabCount }
                />
                { children }
            </Box>
        </KeyProvider>
    )
}
