import type { ReactNode } from 'react';

import { cx } from '@debug-panel/ui';

import styles from './item.module.scss';

interface ItemProps {
  id: string;
  children: ReactNode;
}

export interface InjectedProps extends ItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const Item = ( { children, isActive, onClick }: InjectedProps ) => (
  <button
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={cx( styles.item, { [styles.itemActive]: isActive } )}
  >
    {children}
  </button>
);
