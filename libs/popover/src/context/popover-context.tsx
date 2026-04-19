import { createContext, type PropsWithChildren, useContext, useState } from 'react';

type PopoverState = {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
};

type PopoverContextState = {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
};

const PopoverContext = createContext<PopoverContextState | null>( null );

export const PopoverProvider = ({ children }: PropsWithChildren) => {
    const [ isOpen, setIsOpen ] = useState<boolean>( false );

    return (
        <PopoverContext.Provider value={ { isOpen, setIsOpen } }>
            {children}
        </PopoverContext.Provider>
    );
};

export const usePopover = (): PopoverState => {
    const context = useContext( PopoverContext );

    if ( ! context ) {
        throw new Error( 'usePopover must be used within a PopoverProvider' );
    }

    const { isOpen, setIsOpen } = context;

    return {
        isOpen,
        toggle: () => setIsOpen( ! isOpen ),
        open: () => setIsOpen( true ),
        close: () => setIsOpen( false ),
    };
};
