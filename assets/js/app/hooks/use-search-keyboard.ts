import React, { ChangeEvent, useEffect } from "react";
import { usePath } from "@app/context/path-context";
import { useRef } from "@wordpress/element";
import { SEARCH_POPOVER_KEY, usePopover } from "@app/context/popover-context";
import { useEventBus } from "@app/events";
import { useFilteredPaths } from "@app/hooks/use-filtered-paths";

interface UseSearchKeyboardProps {
    inputRef: HTMLInputElement | null;
    ghostText: string;
    setGhostText: (value: string) => void;
}

const DOUBLE_BACKSPACE_THRESHOLD = 250;

export const useSearchKeyboard = (
    {
        inputRef,
        ghostText,
        setGhostText,
    }: UseSearchKeyboardProps ) => {
    const { path, setPath } = usePath();
    const { paths } = useFilteredPaths()

    const { open, close, isOpen } = usePopover(SEARCH_POPOVER_KEY);

    const lastBackspaceTimeRef = useRef( 0 );
    // const { open: openSearchPopover, isOpen, close: closeSearchPopover } = usePopover( SEARCH_POPOVER_KEY );

    useEventBus( 'suggestion:select', () => moveCaretToEnd() )

    useEffect( () => {
        if ( ! path || paths.includes( path ) ) {
            setGhostText( '' );
            return;
        }

        setGhostText( paths[0] ?? '' );
    }, [ path, paths, setGhostText ] );

    const moveCaretToEnd = () => {
        if ( ! inputRef ) {
            return;
        }

        const length = inputRef.value.length;

        requestAnimationFrame( () => {
            inputRef.setSelectionRange( length, length );
            inputRef.scrollLeft = inputRef.scrollWidth + 10;
        } );
    };

    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setPath( event.target.value );

        if ( ! isOpen ) {
            open();
        }
    }

    const handleFocus = () => {
        moveCaretToEnd();
    }

    function acceptGhostText() {
        setPath( ghostText );

        requestAnimationFrame( () => {
            moveCaretToEnd();
            close();
        } );
    }

    const handleDoubleBackspace = ( event: React.KeyboardEvent<HTMLInputElement> ) => {
        const now = Date.now();
        const elapsed = now - lastBackspaceTimeRef.current;

        lastBackspaceTimeRef.current = now;

        if ( elapsed >= DOUBLE_BACKSPACE_THRESHOLD ) {
            return;
        }

        event.preventDefault();

        const parts = path.split(".");
        parts.pop();

        setPath( parts.join(".") );
        requestAnimationFrame(moveCaretToEnd);
    }

    const handleKeyDown = ( event: React.KeyboardEvent<HTMLInputElement> ) => {
        const isAcceptKey = event.key === "Enter" || event.key === "Tab";

        if ( isAcceptKey && ghostText && ghostText !== path ) {
            event.preventDefault();
            acceptGhostText();

            return;
        }

        if ( event.key === "Backspace" ) {
            handleDoubleBackspace( event );
        }
    }

    return {
        handleFocus,
        handleKeyDown,
        moveCaretToEnd,
        handleChange
    }
}
