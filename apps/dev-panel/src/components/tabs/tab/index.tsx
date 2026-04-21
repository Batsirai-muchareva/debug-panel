import { Button, cx } from '@debug-panel/ui';

import type { InjectedProps } from '../shared/group';

import styles from './button-tab.module.scss';

/**
 * id [InjectedProps] — required by Group for active tracking, injected via cloneElement not used in render
 * isActive [InjectedProps] — injected by Group
 * onClick [InjectedProps]  — injected by Group
 */
type ItemProps = InjectedProps & {
    label: string;
    type: 'button' | 'line';
};

export const Tab = ( { isActive, onClick, label, type }: ItemProps ) => {
    return (
        <Button
            role="tab"
            aria-selected={ isActive }
            onClick={ onClick }
            className={ cx( styles[type], styles.tab, { [ styles.itemActive ]: isActive } ) }
        >
            { label }
        </Button>
    )
};
