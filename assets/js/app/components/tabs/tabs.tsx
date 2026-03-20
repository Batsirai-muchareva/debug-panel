import React, { Children, PropsWithChildren, useMemo, useRef } from "react";

import { KeyProvider } from "@libs/key-context";
import { bemBlock } from "@libs/utils";

import { Indicator } from "@component/tabs/indicator";
import { Box } from "@component/ui/box";

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
