import { Box } from '@debug-panel/ui';

import type { IndicatorProps } from '../../shared/group';

import styles from './indicator.module.scss';

export const LineIndicator = ( { tabCount, activeIndex }: IndicatorProps ) => {
    return (
        <Box
            style={ {
                width: `${ 100 / tabCount }%`,
                transform: `translateX(${ activeIndex * 100 }%)`,
            } }
            className={ styles.indicator }
        />
    )
};
