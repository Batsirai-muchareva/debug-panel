import { Box } from '@debug-panel/ui';

import { Header } from '../../components/header';
import { LogList } from '../../components/log-list';

import styles from './panel.module.scss';

export const Panel = () => {
    return (
        <Box className={ styles.panel }>
            {/*Install PWA banner*/}
            <Header />
            <LogList />
        </Box>
    );
}
