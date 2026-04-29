import { type PropsWithChildren, useState } from 'react';

import { useEventBus } from '@debug-panel/events';
import { store } from '@debug-panel/storage';
import { Box } from '@debug-panel/ui';

import { useLayoutBounds } from '../../context/layout-bounds-context';
import { Resizable } from './resizable';

import popoverStyles from './popover.module.scss';

const ELEMENTOR_HEADER_HEIGHT = 50; // TODO this has to be dynamic

export const Popover = ( { children }: PropsWithChildren ) => {
    const { position, size } = useLayoutBounds();
    const [ isPopoverPinned, setIsPopoverPinned ] = useState( store.getPopoverPin );

    useEventBus( 'pin-popover:update', () => {
        setIsPopoverPinned( store.getPopoverPin() );
    } );

    const styles = isPopoverPinned
        ? {
            top: ELEMENTOR_HEADER_HEIGHT,
            height: `calc(100vh - ${ELEMENTOR_HEADER_HEIGHT}px)`,
            right: 0,
            zIndex: 10,
            width: size.width,
            borderRadius: 0
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
