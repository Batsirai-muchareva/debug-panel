import { ClockIcon } from '@debug-panel/icons';
import { cx } from '@debug-panel/ui';

import styles from './icons.module.scss';

export const RecentIcon = () => {
    return (
        <span className={ cx( styles.icon, styles.recentIcon ) }>
            <ClockIcon />
        </span>
    )
}
