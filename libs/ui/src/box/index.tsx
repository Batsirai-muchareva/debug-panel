import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';

import { cx } from '../utils/cx';

import styles from './box.module.scss'

type Props = PropsWithChildren< HTMLAttributes<HTMLDivElement> >;

export const Box = forwardRef<HTMLDivElement, Props>( ( { className, children, ...props }, ref ) => {
  return <div ref={ ref } className={ cx( styles.box, className ) } { ...props }>{ children }</div>;
} );
