import {
    type ChangeEvent,
    type ComponentType,
    forwardRef,
    type KeyboardEvent, useRef,
} from 'react';

import { CloseIcon } from '@debug-panel/icons';

import { Box } from '../box';
import { Button } from '../button';

import styles from './text-field.module.scss';

type Props< T extends string > = {
    value: T;
    onChange: ( value: T ) => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    startIcon?: ComponentType<{ className: string }>;
    onKeyUp?: ( event: KeyboardEvent<HTMLInputElement> ) => void;
    onKeyDown?: ( event: KeyboardEvent<HTMLInputElement> ) => void;
}

export const TextField = (
    {
        value,
        onChange,
        onBlur,
        onFocus,
        onKeyUp,
        placeholder,
        onKeyDown,
        startIcon,
    }: Props<string> ) => {
    const inputRef = useRef<HTMLInputElement| null>( null );

    const handleChange = ( event: ChangeEvent< HTMLInputElement > ) => {
        onChange( event.target.value )
    };

    const StartIcon = startIcon ?? ( () => null );

    const handleClear = () => {
        onChange( '' );

        inputRef.current?.focus();
    };

    return (
        <Box className={ styles.textField }>
            <StartIcon className={ styles.startIcon } />
             <input
                 autoFocus
                 autoComplete="off"
                 value={ value }
                 onChange={ handleChange }
                 ref={ inputRef }
                 onFocus={ onFocus }
                 onBlur={ onBlur }
                 onKeyDown={ onKeyDown }
                 onKeyUp={ onKeyUp }
                 className={ styles.input }
                 placeholder={ placeholder }
             />
            { value && (
                <Button className={ styles.clear } onClick={ handleClear }>
                    <CloseIcon size={ 12 } />
                </Button>
            ) }
        </Box>
    )
};
