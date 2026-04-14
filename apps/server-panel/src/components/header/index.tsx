import { Box, Button, cx } from '@debug-panel/ui';

import { useDebugLogs } from '../../context/debug-logs-context';

import styles from './header.module.scss';

export function Header() {
    const { connected, clear, logs } = useDebugLogs();
    const hasLogs = logs.length > 0;

    return (
        <header className={ styles.header }>
            <Box />
            <Box className={ cx( styles.status, { [styles.connected]: connected } ) }>
                <Box className={ styles.dot } />

                <Box className={ styles.label }>
                    {
                        connected
                            ? ( <>
                                    Server ready
                                    <span className={ styles.listening }> · listening </span>
                                </>
                            )
                            : 'Server offline'
                    }
                </Box>
            </Box>

            <Button
                className={ styles.clearBtn }
                onClick={ clear }
                disabled={ ! hasLogs }
                type="button"
            >
                Clear
            </Button>
        </header>
    );
}
