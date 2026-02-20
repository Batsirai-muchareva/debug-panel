import * as React from "react";
import { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "@wordpress/element";

type PopoverState = {
    isOpen: boolean,
    toggle: () => void,
    open: () => void,
    close: () => void,
};

type PopoverContextState = {
    popovers: Record<string, boolean>;
    togglePopover: ( id: string ) => void;
    openPopover: ( id: string ) => void;
    closePopover: ( id: string ) => void;
};

export const MAIN_POPOVER_KEY = 'main-content-popover';
export const SEARCH_POPOVER_KEY = 'search-popover';

const PopoverContext = createContext<PopoverContextState | undefined>( undefined );

export const PopoverProvider = ( { children }: PropsWithChildren ) => {
    const [popovers, setPopovers] = useState<Record<string, boolean>>({});

    const openPopover = ( id: string ) => {
        setPopovers( prev  => ( { ...prev, [id]: true } ) );
    };

    const closePopover = (id: string) => {
        setPopovers( prev  => {
            const status = prev[id];

            if ( status && id === MAIN_POPOVER_KEY ) {
                return {}
            }

            return { ...prev, [id]: false }
        } );
    };

    const togglePopover = ( id: string ) => {

        setPopovers( prev => {
            const status = prev[id];

            if ( status && id === MAIN_POPOVER_KEY ) {
                return {}
            }

            return {
                ...prev,
                [id]: ! status,
            }
        } );
    };

    return (
        <PopoverContext.Provider value={ { popovers, togglePopover, openPopover, closePopover } }>
            { children }
        </PopoverContext.Provider>
    );
};

export const usePopover = ( id: string ): PopoverState => {
    const context = useContext( PopoverContext )

    if ( ! context ) {
        throw new Error("usePopover must be used within a PopoverProvider");
    }

    return {
        isOpen: context.popovers[ id ],
        toggle: () => context.togglePopover( id ),
        open: () => context.openPopover( id ),
        close: () => context.closePopover( id ),
    };
}
