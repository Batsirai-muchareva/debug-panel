import type { MouseEventHandler } from 'react';

import { cx } from '@debug-panel/ui';

type HandleVariant = 'edge' | 'corner';

import styles from './resize-handle.module.scss';

type Props = {
    direction: string;
    variant: HandleVariant;
    onMouseDown: MouseEventHandler<HTMLDivElement>;
};

export const ResizeHandle = ( { direction, variant, onMouseDown }: Props ) => {
    return (
        <div
            data-direction={ direction }
            className={ cx(
                styles.handle,
                styles[ variant ],
            ) }
            onMouseDown={ onMouseDown }
        />
    );
}
