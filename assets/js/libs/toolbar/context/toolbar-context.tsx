import React from "react"
import { useCallback } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "@wordpress/element";

import { store } from "@libs/storage";

import { ActionConfig } from "../actions/registry/define-action";

const STORAGE_PREFIX = 'debug-panel:';

export const actionIds = [ 'highlight', 'search' ] as const;

type ActionId = typeof actionIds[number];

// type ToolbarStatus = {
//     [K in ActionId as `is${Capitalize<K>}Active`]: boolean;
// };

type ToolbarStatus = {
    [K in ActionId as `is${Capitalize<K>}Active`]: boolean;
} & {
    [K in ActionId as `set${Capitalize<K>}Active`]: ( active: boolean ) => void;
};

type ToolbarContextType = {
    states: Record<string, boolean>;
    setToolbarState: ( action: ActionConfig, active: boolean ) => void;
};

const ToolbarContext = createContext<ToolbarContextType | null>(null);

export const ToolbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [states, setStates] = useState<Record<string, boolean>>({});

    const setToolbarState = useCallback( ( action: ActionConfig, active: boolean ) => {
            if ( action.persist ) {
                store.setToolbarActionStatus( action.id, active )
                // localStorage.setItem(
                //     `${STORAGE_PREFIX}${action.id}`,
                //     String( active )
                // );
            }

            setStates( prev => ( {
                ...prev,
                [action.id]: active,
            } ) );
        }, []
    );

    return (
        <ToolbarContext.Provider value={{ states, setToolbarState }}>
            { children }
        </ToolbarContext.Provider>
    );
};

const useToolbarContext = () => {
    const ctx = useContext(ToolbarContext);

    if ( ! ctx ) {
        throw new Error("useToolbarState must be used within ToolbarProvider");
    }

    return ctx;
};


export function useToolbarState(): ToolbarStatus;
export function useToolbarState(actions: ActionConfig[]): {
    states: Record<string, boolean>;
    setToolbarState: (action: ActionConfig, active: boolean) => void;
};

export function useToolbarState( actions?: ActionConfig[] ) {
    const { states, setToolbarState } = useToolbarContext();

    useEffect(() => {
        if (!actions) return;

        actions.forEach(action => {
            if ( action.persist && states[action.id] === undefined ) {
                const stored = store.getToolbarActionStatus( action.id )

                // localStorage.getItem(`${STORAGE_PREFIX}${action.id}`);

                if ( stored !== null ) {
                    setToolbarState( action, stored );
                }
            }
        });
    }, [ actions, states, setToolbarState ]);

    const status = useMemo(() => {
        return actionIds.reduce((acc, id) => {
            const isKey  = `is${capitalize(id)}Active`  as keyof ToolbarStatus;
            const setKey = `set${capitalize(id)}Active` as keyof ToolbarStatus;

            (acc as any)[ isKey ]  = Boolean( states[id] );
            (acc as any)[ setKey ] = ( active: boolean ) => {
                // find the action config to check persist flag
                const action = actions?.find( a => a.id === id );
                setToolbarState(
                    action ?? { id, icon: '', persist: false },
                    active
                );
            };

            return acc;

            // const key = `is${capitalize(id)}Active` as keyof ToolbarStatus;
            // acc[key] = Boolean(states[id]);
            // return acc;


        }, {} as ToolbarStatus);



    }, [states, actions, setToolbarState]);

    if ( ! actions ) {
        return status;
    }

    return {
        states,
        setToolbarState,
    };
}

const capitalize = <T extends string>(str: T): Capitalize<T> => {
    return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
};

// 👉 initialize from localStorage ONLY when actions provided
// useMemo( () => {
//     if ( ! actions ) return;
//
//     actions.forEach( action => {
//         if (states[action.id] !== undefined) return;
//
//         const stored = localStorage.getItem(`${STORAGE_PREFIX}${action.id}`);
//
//         if (action.persist && stored !== null) {
//             setToolbarState(action, stored === "true");
//         }
//     });
// }, [actions]);
