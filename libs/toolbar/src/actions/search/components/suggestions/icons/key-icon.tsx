import { cx } from '@debug-panel/ui';

import styles from './icons.module.scss';

export const KeyIcon = () => {
    return (
        <span className={ cx( styles.icon, styles.key ) }>
            K
        </span>
    )
}
