import React from "react"
import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "@wordpress/element";

import { store } from "@debug-panel/storage";
import { ActionConfig } from '../define-action';
import { findAction } from '../actions-registry';
import { Box } from '@debug-panel/ui';
import { TOOLBAR_CONTENT_PORTAL_ID } from '@debug-panel/constants';

/** These values are persisted in local storage **/
export const actionIds = [ 'highlight', 'search', 'valueSearch' ] as const;

type ActionId = typeof actionIds[ number ];

type ToolbarStatus = {
    [K in ActionId as `is${Capitalize<K>}Active`]: boolean;
} & {
    [K in ActionId as `set${Capitalize<K>}Active`]: ( active: boolean ) => void;
};

type SetStateAction = Pick< ActionConfig, 'id' | 'persist' | 'panel' >;

type ContextValue = {
    states: Record<string, boolean>;
    setState: ( action: SetStateAction, state: boolean ) => void;
    activePanelId: string | null;
    setActivePanelId: ( id: string | null ) => void;

};

const ToolbarContext = createContext< ContextValue | null >( null );

export const ToolbarProvider = ( { children }: { children: React.ReactNode; } ) => {
    const [ states, setStates ] = useState< ContextValue['states'] >( {} );
    const [ activePanelId, setActivePanelId ] = useState<string | null>( null );

    const setState = useCallback( ( action: SetStateAction, state: boolean ) => {
        const { id, panel, persist = false } = action;

        if ( persist ) {
            store.setToolbarState( id, state )
        }

        if ( panel ) {
            setActivePanelId( state ? id : null );
        }

        setStates( prev => ( { ...prev, [ id ]: state } ) );
    }, [] );

    return (
        <ToolbarContext.Provider value={ {
            states,
            setState,
            activePanelId,
            setActivePanelId: ( id: string | null ) => {
                if ( ! id ) {
                    const action = findAction( activePanelId as string );

                    if ( action.persist ) {
                        store.setToolbarState( action.id, false )
                    }

                    setStates( prev => ( { ...prev, [ action.id ]: false } ) );
                }

                setActivePanelId( id )
            }
        } }>
            <Box id={ TOOLBAR_CONTENT_PORTAL_ID }/>
            { children }
        </ToolbarContext.Provider>
    );
};

const useToolbarContext = () => {
    const ctx = useContext( ToolbarContext );

    if ( ! ctx ) {
        throw new Error("useToolbarState must be used within ToolbarProvider");
    }

    return ctx;
};

export function useToolbar(): ToolbarStatus;
export function useToolbar( actions: ActionConfig[] ): ContextValue;
export function useToolbar( actions?: ActionConfig[] ) {
    const { states, setState, activePanelId, setActivePanelId } = useToolbarContext();

    useEffect( () => {
        if ( ! actions ) {
            return;
        }

        actions.forEach( ( action ) => {
            if ( action.persist ) {
                const stored = store.getToolbarState( action.id );

                if ( stored ) {
                    setState( action, stored );
                }
            }
        } );
    }, [] );

    if ( ! actions ) {
        return useMemo( () => {
            return actionIds.reduce( ( acc, id ) => {
                return Object.assign( acc, {
                    [ `is${ capitalize( id ) }Active` ]:  Boolean( states[ id ] ),
                    [ `set${ capitalize( id ) }Active` ]: ( active: boolean ) => {
                        const action = findAction( id );

                        if ( ! action ) {
                            throw Error( "Cannot find action id defined in action ids" )
                        }

                        return setState( action, active )
                    },
                } );
            }, {} );

        }, [ states ] ) as {} as ToolbarStatus;

    }

    return {
        states,
        setState,
        activePanelId,
        setActivePanelId
    };
}

export function useActionPanel() {
    const { activePanelId, setActivePanelId } = useToolbarContext();

    return {
        activePanelId,
        setActivePanelId,
    }
}

const capitalize = <T extends string>(str: T): Capitalize<T> => {
    return ( str.charAt( 0 ).toUpperCase() + str.slice( 1 ) ) as Capitalize<T>;
};
