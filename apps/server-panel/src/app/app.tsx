import { Box } from '@debug-panel/ui';

import { DebugLogsProvider } from '../context/debug-logs-context';
import { useShutdownOnUnload } from '../hooks/use-shutdown-on-unload';
import { Panel } from './panel';

import styles from './app.module.scss';

export default function App() {
    useShutdownOnUnload();

    return (
        <DebugLogsProvider>
            <Box className={ styles.app }>
                <Panel />
            </Box>
        </DebugLogsProvider>
    );
}
