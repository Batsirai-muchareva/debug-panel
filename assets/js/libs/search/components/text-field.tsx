import React from "react";
import { forwardRef } from "@wordpress/element";

type Props< T extends string > = {
    value: T;
    onChange: ( value: T ) => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TextField = forwardRef<HTMLInputElement, Props<string>>( (
    {
        value,
        onChange,
        onBlur,
        onFocus,
        onKeyUp,
        placeholder,
        onKeyDown,
    }, ref ) => {

    const handleChange = ( event: React.ChangeEvent< HTMLInputElement > ) => {
        onChange( event.target.value )
    };

    return (
        <input
            autoComplete="off"
            value={ value }
            onChange={ handleChange }
            ref={ ref }
            onFocus={ onFocus }
            onBlur={ onBlur }
            onKeyDown={ onKeyDown }
            onKeyUp={ onKeyUp }
            className="search-field"
            id="searchField"
            placeholder={ placeholder }
        />
    )
} );
