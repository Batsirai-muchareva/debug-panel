import { Notification } from '@debug-panel/notification';
import { LayoutBoundsProvider, PopoverProvider } from '@debug-panel/popover';

import { ToggleButton } from '../components/toggle-bug-button';
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
