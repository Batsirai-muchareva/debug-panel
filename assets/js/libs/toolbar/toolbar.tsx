import React from "react"
import { Fill, Slot } from "@wordpress/components";

import { KeyProvider } from "@libs/key-context";
import { usePath } from "@libs/path";
import { Data } from "@libs/types";

import { getActions } from "./actions/registry/actions-registry";
import { useToolbarState } from "./context/toolbar-context";
import { useActionExecutor } from "./hooks/use-action-executor";
import { Icons } from "./icons";
import { clsx } from "./utils/clsx";

export const Toolbar = ( { variantId, data }: { variantId: string; data: Data } ) => {
    const { path } = usePath()
    const actions = getActions();
    const { states, setToolbarState } = useToolbarState( actions );
    const executeAction = useActionExecutor( data );

    const hasSearch = !! path;

    return (
        <KeyProvider value={ variantId }>
            <div>

            <div className="editor-toolbar">
                {
                    actions.map( ( action ) => (
                        <button
                            key={ action.id }
                            className={ clsx( 'tool-btn', { 'tool-btn--active': states[ action.id ] } ) }
                            onClick={ () => executeAction( action, {
                                bind: variantId,
                                isActive: states[ action.id ],
                                setState: ( active ) => setToolbarState( action, active ),
                            } ) }
                        >
                            { Icons[ action.icon ] }
                            { action.title }

                            { action.id === 'search' && hasSearch && (
                                <span style={ {
                                    position: 'absolute',
                                    top: '0px',
                                    right: '0px',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#e5a820',
                                    border: '1.5px solid #0d1a1a',

                                    // position: absolute;
                                    // top: 0px;
                                    // right: 0px;
                                    // width: 10px;
                                    // height: 9px;
                                    // border-radius: 50%;
                                    // background: rgb(229, 168, 32);
                                    // border: 1.5px solid rgb(13, 26, 26);
                                } } />
                            ) }

                            { action.component && states[ action.id ] && (
                                <Fill name="toolbar-component">
                                    {/*TODO we might not need the isActive prop */}
                                    <action.component isActive={ states[ action.id ] } />
                                </Fill> )
                            }
                        </button>
                    ) )
                }
            </div>
            <Slot name="toolbar-component" />
            </div>
        </KeyProvider>
    )
}

