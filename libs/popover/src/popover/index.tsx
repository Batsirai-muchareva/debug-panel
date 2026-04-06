import { type ElementType, Fragment, type PropsWithChildren } from 'react';

import { Box } from '@debug-panel/ui';

import { useLayoutBounds } from '../context/layout-bounds-context';

import popoverStyles from './popover.module.scss';

export const Popover = ( { children, enhance: Enhance = Fragment }: PropsWithChildren<{ enhance?: ElementType }> ) => {
  const { position, size } = useLayoutBounds();

  const styles = {
    width: size.width,
    height: size.height,
    left: position.x,
    top: position.y,
  }

  return (
    <Box className={ popoverStyles.popover } style={ styles }>
        <Enhance>
            { children }
        </Enhance>
    </Box>
  );
}
