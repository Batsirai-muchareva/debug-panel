import { usePopover } from '@debug-panel/popover';

import { Panel } from './index';

export const PanelVisibility = () => {
  const { isOpen: isPopoverOpen } = usePopover();

  if ( ! isPopoverOpen ) {
    return null;
  }

  return (
    <Panel />
  )
}
