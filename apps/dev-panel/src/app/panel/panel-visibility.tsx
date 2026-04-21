import { usePopover } from '../../context/popover-context';
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
