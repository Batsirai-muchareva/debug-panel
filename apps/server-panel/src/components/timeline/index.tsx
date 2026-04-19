import { useDebugLogs } from '../../context/debug-logs-context';

import styles from './timeline.module.scss';

export function Timeline() {
    const { logs, highlightedId, setHighlightedId } = useDebugLogs();

    if ( logs.length === 0 ) return null;

    const lastLog = logs[ logs.length - 1 ];

    return (
        <div className={ styles.timeline }>
            <span className={ styles.label }>timeline</span>
            { logs.map( ( log, i ) => (
                <div
                    key={ log.id }
                    className={ [
                        styles.blip,
                        log.id === highlightedId ? styles.blipActive : '',
                        i === logs.length - 1 ? styles.blipLatest : '',
                    ].join( ' ' ) }
                    title={ `#${ log.index } ${ log.time }` }
                    onClick={ () => setHighlightedId( log.id ) }
                />
            ) ) }
            <span className={ styles.timeLabel }>{ lastLog.time }</span>
        </div>
    );
}
