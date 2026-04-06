import type { ElementType, HTMLAttributes } from 'react';

import { cx } from '../utils/cx';

import styles from './text.module.scss';

type TextSize = 'xs' | 'sm' | 'md' | 'lg';
type TextColor = 'primary' | 'secondary' | 'disabled' | 'danger';

type Props = HTMLAttributes<HTMLElement> & {
    as?: ElementType;
    size?: TextSize;
    color?: TextColor;
    truncate?: boolean;
};
export const Text = (
    {
        as: Tag = 'p',
        size = 'sm',
        color = 'primary',
        truncate, className,
        children,
        ...props
    }: Props ) => {

    return (
        <Tag
            className={ cx(
                styles.text,
                styles[size],
                styles[color],
                { [styles.truncate]: truncate },
                className
            ) }
            {...props}
        >
            { children }
        </Tag>
    );
}
