import { cx } from '@debug-panel/ui';

import styles from './indicator.module.scss';

interface Props {
  count: number; // was: tabCount
  index: number; // was: activeIndex
  className?: string;
}

export const Indicator = ( { count, index, className }: Props ) => (
  <div
    style={{
      width: `${100 / count}%`,
      transform: `translateX(${index * 100}%)`,
    }}
    className={cx( styles.indicator, className )}
  />
);
