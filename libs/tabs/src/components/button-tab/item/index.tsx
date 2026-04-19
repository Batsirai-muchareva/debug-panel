import React, { type ReactNode } from 'react';

import { Button, cx } from '@debug-panel/ui';

import styles from './item.module.scss';

interface ItemProps {
  id: string;
  children: ReactNode;
}

/** internal — Props Group injects via cloneElement **/
export interface InjectedProps extends ItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const Item = ( { children, isActive, onClick }: InjectedProps ) => (
  <Button
    role="tab"
    aria-selected={ isActive }
    onClick={ onClick }
    className={ cx( styles.item, { [ styles.itemActive ]: isActive } ) }
  >
    { children }
  </Button>
);
