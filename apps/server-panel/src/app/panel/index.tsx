import { Box } from '@debug-panel/ui';

import { FilterBar } from '../../components/filter-bar';
import { Header } from '../../components/header';
import { LogList } from '../../components/log-list';
import { StatsBar } from '../../components/stats-bar';
import { Timeline } from '../../components/timeline';
import { useKeyboardShortcuts } from '../../hooks/use-keyboard-shortcuts';

import styles from './panel.module.scss';

export const Panel = () => {
    useKeyboardShortcuts();

    return (
        <Box className={ styles.panel }>
            <Header />
            <FilterBar />
            <StatsBar />
            <Timeline />
            <LogList />
        </Box>
    );
}
