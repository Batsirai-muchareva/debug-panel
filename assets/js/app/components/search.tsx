import React from "react"
import { bemBlock } from "@app/utils/bem";
import { usePath } from "@app/context/path-context";
import { useRef, useState, useEffect } from "@wordpress/element";
import { useTabs } from "@app/context/tabs/tabs-context";
import { useBrowse } from "@app/context/browse-context";
import { useSearchKeyboard } from "@app/hooks/use-search-keyboard";

const bemClass = bemBlock.elementClass( 'search' );

const PLACEHOLDERS: Record<string, string> = {
    default: 'Search path...eg color.$$type',
    schema: 'Search schema...'
};

export const Search = () => {
    const { path, setPath } = usePath();
    const { activeProvider } = useTabs();
    const { selectedKey } = useBrowse();

    const inputRef = useRef<HTMLInputElement>(null );
    const ghostRef = useRef<HTMLSpanElement>(null);

    const [ ghostText, setGhostText ] = useState('')
    const [ visibleGhostText, setVisibleGhostText ] = useState("");

    const {
        handleKeyDown,
        handleFocus,
        moveCaretToEnd,
        handleChange
    } = useSearchKeyboard( { ghostText, setGhostText, inputRef: inputRef.current } );

    const isSearching = Boolean( path );

    const placeholder = activeProvider === "schema" && !selectedKey
            ? PLACEHOLDERS.schema
            : PLACEHOLDERS.default;

    const clearInput = () => {
        setPath('');
        inputRef.current?.focus();
    };

    const shouldAlignGhost = ghostText.includes(".") || !ghostText.startsWith(path);

    useEffect( () => {
        const input = inputRef.current;
        const ghost = ghostRef.current;

        if ( ! input || ! ghost || ! shouldAlignGhost) {
            setVisibleGhostText( ghostText );
            return;
        }

        const availableWidth = input.clientWidth - 20;
        let text = ghostText;

        ghost.textContent = text;

        while (ghost.clientWidth > availableWidth && text.length > path.length) {
            text = text.slice(1);
            ghost.textContent = text;
        }

        setVisibleGhostText(
            text === ghostText ? text : `…${text.slice(1)}`
        );

    }, [ ghostText, path, shouldAlignGhost ] );


    return (
        <div data-is-searching={ isSearching } className={ bemBlock.element( 'search' ) }>
            <div className={ bemClass( 'input__wrap' ) }>
                <input
                    ref={ inputRef }
                    value={ path }
                    onChange={ handleChange }
                    className={ bemClass( 'input' ) }
                    placeholder={ placeholder }
                    onFocus={ handleFocus }
                    onBlur={ moveCaretToEnd }
                    onKeyDown={ handleKeyDown }
                />
                <span
                    ref={ghostRef}
                    className="ghost-text"
                    id="ghost"
                    style={
                        shouldAlignGhost
                            ? { paddingLeft: `${path.length + 1}ch` }
                            : undefined
                    }
                >
                    { visibleGhostText }
                </span>
            </div>
            {
                isSearching &&
                (
                    <button
                        onClick={ clearInput }
                        className={ bemClass( 'clear' ) }
                    >
                        <i className="eicon-close"/>
                    </button>
                )
            }
        </div>
    );
}


