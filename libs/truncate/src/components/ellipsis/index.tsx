import { forwardRef } from 'react';

import { Button, cx } from '@debug-panel/ui';

import type { TruncateMode } from '../../types';

import styles from './ellipsis.module.scss';

type Props = {
    onClick?: () => void;
    count: number;
    mode: TruncateMode;
}
export const Ellipsis = forwardRef<HTMLButtonElement, Props>( ( { count, onClick, mode }, ref ) => {
    return (
        <Button
            ref={ ref }
            className={ cx( styles.ellipsis, styles[ mode ] ) }
            onClick={ onClick }
        >
            +{ count }
        </Button>
    )
} );
