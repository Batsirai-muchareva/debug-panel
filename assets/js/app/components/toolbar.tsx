import React from "react";
import { useBrowse } from "@app/context/browse-context";
import { Flex } from "@component/ui/flex";
import { Search } from "@component/search";
import { bemBlock } from "@app/utils/bem";
import { useFilteredData } from "@app/context/filtered-data/filtered-data-context";
import { ActionsComponent } from "@libs/actions/actions-component";

export const Toolbar = () => {
    const { data } = useFilteredData();

    if ( ! Boolean( data ) ) {
        return null;
    }

    return (
        <div className={ bemBlock.element( 'toolbar' ) }>
            <Search />
            <Flex>
                <GoBack />
                <ActionsComponent />
            {/*  ViewJsonTree component  */}
            </Flex>
        </div>
    )
}

const GoBack = () => {
    const { selectedKey, back } = useBrowse();

    if ( ! selectedKey ) {
        return null
    }

    return (
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
             <button
                 className="go-back"
                 onClick={ back }
                 type="button"
             >
            ← Back
        </button>
             <h3 className="go-back-title" title={selectedKey}>
                    { selectedKey }
                </h3>
        </div>
    )
}
