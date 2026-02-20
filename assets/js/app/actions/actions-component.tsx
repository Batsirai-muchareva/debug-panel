import React from "react"

import { bemBlock } from "@libs/utils";

// import { useFilteredData } from "@app/context/filtered-data/filtered-data-context";
// import { useTabs } from "@app/context/tabs/tabs-context";
// import { bemBlock } from "@app/utils/bem";
import { getActions } from "./registry/actions-registry";

export const ActionsComponent = () => {
    const registeredActions = getActions();
    // const { data } = useFilteredData();
    // const { activeProvider } = useTabs();

    // const disabled = ! Boolean( data );

    const styles = {
        opacity: disabled ? '50%' : '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
    };

    return (
        <div className={ bemBlock.element( 'actions' ) }>
            {
                registeredActions.map( ( {
                    id,
                    onClick,
                    icon,
                    title
                } ) => (
                    <button
                        style={ styles }
                        key={ id }
                        className={ bemBlock.element( 'action' ) }
                        onClick={ () => ! disabled && onClick?.( data, activeProvider ) }
                    >
                       <i className={ icon }></i>
                        { title }
                    </button>
                ) )
            }
        </div>
    )
}
