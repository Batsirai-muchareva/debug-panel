import type { PropsWithChildren } from 'react';

import { Box } from '@debug-panel/ui';

import { useLayoutBounds } from '../../context/layout-bounds-context';
import { usePopover } from '../../context/popover-context';
import { useElementorDockOffset } from '../../hooks/use-elementor-dock-offset';
import { Resizable } from './resizable';

import popoverStyles from './popover.module.scss';

const ELEMENTOR_HEADER_HEIGHT = 50; // TODO this has to be dynamic

export const Popover = ( { children }: PropsWithChildren ) => {
    const { position, size } = useLayoutBounds();
    const { isPinned } = usePopover();
    const rightOffset = useElementorDockOffset();

    const styles = isPinned
        ? {
            top: ELEMENTOR_HEADER_HEIGHT - 2,
            height: `calc(100vh - ${ELEMENTOR_HEADER_HEIGHT - 2}px)`,
            right: rightOffset,
            zIndex: 10,
            width: size.width,
            borderRadius: 0,
            border: 'none'
        }
        : {
            width: size.width,
            height: size.height,
            left: position.x,
            top: position.y,
      };

  return (
      <Box
          className={ popoverStyles.popover }
          style={ styles }
      >
        <Resizable>
            { children }
        </Resizable>
    </Box>
  );
}
