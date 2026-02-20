import React from "react"
import { bemBlock } from "@app/utils/bem";
import { useProvider } from "@app/hooks/use-provider";

export const NoData = () => {
    const { config } = useProvider();

    return (
        <div className={ bemBlock.element( 'empty-state' ) }>
            { config?.emptyMessage ?? 'Refreshing...' }
        </div>
    )
}
