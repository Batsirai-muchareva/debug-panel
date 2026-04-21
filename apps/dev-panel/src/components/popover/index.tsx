import type { PropsWithChildren } from 'react';

import { Box } from '@debug-panel/ui';

import { useLayoutBounds } from '../../context/layout-bounds-context';
import { Resizable } from './resizable';

import styles from './popover.module.scss';

export const Popover = ( { children }: PropsWithChildren ) => {
  const { position, size } = useLayoutBounds();

  return (
      <Box
          className={ styles.popover }
          style={ {
              width: size.width,
              height: size.height,
              left: position.x,
              top: position.y,
          } }
      >
        <Resizable>
            { children }
        </Resizable>
    </Box>
  );
}
