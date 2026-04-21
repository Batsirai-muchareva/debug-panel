import { Notification } from '@debug-panel/notification';

import { ToggleButton } from '../components/toggle-bug-button';
import { LayoutBoundsProvider } from '../context/layout-bounds-context';
import { PopoverProvider } from '../context/popover-context';
import { PanelVisibility } from './panel/panel-visibility';

export function App() {
    return (
        <PopoverProvider>
            <LayoutBoundsProvider>
                <ToggleButton />
                <PanelVisibility />
                <Notification />
            </LayoutBoundsProvider>
        </PopoverProvider>
    );
}

export default App;
