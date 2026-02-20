import React from "react"
import { bemBlock } from "@app/utils/bem";
import { eventBus } from "@app/events";
import { usePath } from "@app/context/path-context";
import { useSuggestions } from "@app/hooks/use-suggestions";

const bemClass = bemBlock.elementClass( 'suggestion' );


export const Suggestions = () => {
    const suggestions = useSuggestions();
    const { setPath, path: selectedPath } = usePath();

    const handleSelection = ( path: string ) => {
        setPath( path );

        eventBus.emit( 'suggestion:select' );
    };

    return (
        <div className={ bemBlock.element( 'suggestion' ) }>

            { suggestions.length === 0 &&
                <div style={ {
                    textAlign: 'center',
                    margin: '30px',
                    color: '#a0a0a0' } }
                >
                    No path results to show
                </div>
            }

            { suggestions.map( ( category ) => (
                <div key={ category.key }>
                    <div className={ bemBlock.element( 'suggestion-category' ) }>
                        { category.label }
                    </div>

                    { category.items.map( ( item: any, index: number ) => (
                        <div
                            key={ index }
                            onClick={ () => handleSelection( item.path ) }
                            className={ bemBlock.condElemMod( 'suggestion-item', 'selected', item.path === selectedPath ) }
                            data-path={ item.path }>

                            <span className={ bemClass( 'icon' ) }> { category.icon } </span>
                            <div className={ bemClass( 'content' ) }>
                                <div className={ bemClass( 'path' ) }> { truncatePath(item.path) }</div>
                                <div className={ bemClass( 'desc' ) }>{ item.value }</div>
                            </div>
                        </div>
                    ) ) }
                </div>
            ) ) }
        </div>
    )
}

const truncatePath = (p: any) => {
    if (p.length <= 30) return p;
    const start = p.substring(0, 10);
    const end = p.substring(p.length - 20);
    return `${start}...${end}`;
};
