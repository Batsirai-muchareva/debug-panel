import React, { forwardRef } from 'react';

import { cx } from '../utils/cx';

import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>( ( {
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}, ref ) => {
  return (
    <button
        ref={ ref }
        className={ cx(
            styles.btn,
            styles[variant],
            styles[size],
            { [ styles.disabled ]: disabled ?? false },
            className
        ) }
        disabled={ disabled }
        { ...props }
    >
      { children }
    </button>
  );
} );
