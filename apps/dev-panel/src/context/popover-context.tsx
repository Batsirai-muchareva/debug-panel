import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import { store } from '@debug-panel/storage';

type PopoverState = {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    isPinned: boolean
    togglePinned: () => void;
};

type PopoverContextState = {
    isOpen: boolean;
    setIsOpen: ( status: boolean ) => void;
    isPinned: boolean
    togglePinned: () => void;
};

const PopoverContext = createContext<PopoverContextState | null>( null );

export const PopoverProvider = ( { children }: PropsWithChildren ) => {
    const [ isOpen, setIsOpen ] = useState<boolean>( false );
    const [ isPinned, setIsPinned ] = useState<boolean>( store.getPopoverPin() );

    const togglePinned = () => {
        store.togglePopoverPin();

        setIsPinned( store.getPopoverPin() )
    };

    return (
        <PopoverContext.Provider value={ { isOpen, setIsOpen, isPinned, togglePinned } }>
            { children }
        </PopoverContext.Provider>
    );
};

export const usePopover = (): PopoverState => {
    const context = useContext( PopoverContext );

    if ( ! context ) {
        throw new Error( 'usePopover must be used within a PopoverProvider' );
    }

    const { isOpen, setIsOpen, isPinned, togglePinned } = context;

    return {
        isOpen,
        isPinned,
        togglePinned,
        toggle: () => setIsOpen( ! isOpen ),
        open: () => setIsOpen( true ),
        close: () => setIsOpen( false ),
    };
};
