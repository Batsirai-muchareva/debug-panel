import { useRef, useState } from 'react';

export const usePopup = () => {
    const ellipsisRef = useRef<HTMLButtonElement>( null );
    const [ isOpen, setIsOpen ] = useState( false );

    const getTriggerRect = () => ellipsisRef.current?.getBoundingClientRect();

    return {
        ellipsisRef,
        isOpen,
        open: () => setIsOpen( true ),
        close: () => setIsOpen( false ),
        toggle: () => setIsOpen( o => ! o ),
        getTriggerRect,
    };
};
