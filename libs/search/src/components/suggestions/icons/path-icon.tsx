import { cx } from '@debug-panel/ui';

import styles from './icons.module.scss';

export const PathIcon = () => {
    return (
        <span className={ cx( styles.icon, styles.path ) }>
            P
        </span>
    )
}
