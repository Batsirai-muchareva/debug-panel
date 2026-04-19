import { type LogLimit, type TimeRange, LOG_LIMIT_PRESETS, useDebugLogs } from '../../context/debug-logs-context';

import styles from './filter-bar.module.scss';

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
    { value: 'all', label: 'all time' },
    { value: '1m',  label: 'last 1m' },
    { value: '5m',  label: 'last 5m' },
    { value: '30m', label: 'last 30m' },
];

export function FilterBar() {
    const {
        uniqueLabels, disabledLabels, toggleLabel,
        filteredLogs,
        timeRange, setTimeRange,
        logLimit, setLogLimit,
    } = useDebugLogs();

    if ( uniqueLabels.length === 0 ) return null;

    const nextLimit = ( current: LogLimit ): LogLimit => {
        const idx  = LOG_LIMIT_PRESETS.indexOf( current );
        return LOG_LIMIT_PRESETS[ ( idx + 1 ) % LOG_LIMIT_PRESETS.length ] as LogLimit;
    };

    return (
        <div className={ styles.bar }>

            {/* ── Label type chips ── */}
            <span className={ styles.sectionLabel }>type:</span>
            { uniqueLabels.map( ( label ) => (
                <button
                    key={ label }
                    className={ `${ styles.chip } ${ !disabledLabels.has( label ) ? styles.chipOn : '' }` }
                    onClick={ () => toggleLabel( label ) }
                >
                    { label }
                </button>
            ) ) }

            <span className={ styles.divider } />

            {/* ── Time range chips ── */}
            <span className={ styles.sectionLabel }>time:</span>
            { TIME_RANGE_OPTIONS.map( ( opt ) => (
                <button
                    key={ opt.value }
                    className={ `${ styles.chip } ${ styles.chipTime } ${ timeRange === opt.value ? styles.chipTimeOn : '' }` }
                    onClick={ () => setTimeRange( opt.value ) }
                >
                    { opt.label }
                </button>
            ) ) }

            <span className={ styles.divider } />

            {/* ── Log limit ── */}
            <span className={ styles.sectionLabel }>limit:</span>
            <button
                className={ `${ styles.chip } ${ styles.chipLimit }` }
                onClick={ () => setLogLimit( nextLimit( logLimit ) ) }
                title="Click to cycle through limit presets"
            >
                { logLimit }
            </button>

            {/* ── Visible count ── */}
            <span className={ styles.count }>{ filteredLogs.length } visible</span>
        </div>
    );
}
