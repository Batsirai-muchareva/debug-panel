import React from "react"
import { useMemo } from "react"

import { bemBlock } from "@libs/utils";

import { useBrowse } from "@app/context/browse-context";

export const BrowseView = () => {
    const { getData, setSelectedKey } = useBrowse();
    const data = useMemo( () => getData(), [] );

    const onKeySelect = ( key: string ) => {
        setSelectedKey( key );
    }

    return (
        <div className={ bemBlock.element( 'browse-view' ) }>
            <div className={ bemBlock.element( 'browse-view-header' ) }>
                <strong>{ data.length } Schema</strong>
            </div>
            <div className={ bemBlock.element( 'browse-view-list' ) }>
               { data.map( ( key, index ) =>
                   <Item
                       key={ key }
                       index={ index }
                       label={ key }
                       onClick={ () => onKeySelect( key ) }
                   />
               ) }
            </div>
        </div>
    )
}

const Item = ( { index, label, onClick }: { index: number; label: string; onClick?: () => void } ) => {
    return (
        <button onClick={ onClick } className={ bemBlock.element( 'browse-view-list-item' ) }>
            <span className={ bemBlock.element( 'browse-view-list-item-index' ) }>
                { index + 1 }
            </span>

            <span className={ bemBlock.element( 'browse-view-list-item-key' ) }>
                { label }
            </span>

            <span className={ bemBlock.element( 'browse-view-list-item-arrow' ) }>
                →
            </span>
        </button>
    );
}
