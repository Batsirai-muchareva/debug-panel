import { useDebugLogs } from '../../context/debug-logs-context';

import styles from './stats-bar.module.scss';

export function StatsBar() {
    const { stats } = useDebugLogs();

    return (
        <div className={ styles.bar }>
            <div className={ styles.stat }>
                <div className={ styles.label }>total dumps</div>
                <div className={ `${ styles.val } ${ styles.purple }` }>{ stats.total }</div>
            </div>
            <div className={ styles.stat }>
                <div className={ styles.label }>unique labels</div>
                <div className={ `${ styles.val } ${ styles.blue }` }>{ stats.uniqueLabels }</div>
            </div>
            <div className={ styles.stat }>
                <div className={ styles.label }>repeated</div>
                <div className={ `${ styles.val } ${ styles.amber }` }>{ stats.repeated }</div>
            </div>
            <div className={ styles.stat }>
                <div className={ styles.label }>pinned</div>
                <div className={ `${ styles.val } ${ styles.green }` }>{ stats.pinned }</div>
            </div>
        </div>
    );
}
