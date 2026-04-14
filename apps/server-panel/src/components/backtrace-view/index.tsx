// import { ListIcon } from '@debug-panel/icons';
// import { Box } from '@debug-panel/ui';
//
// import type { LogItem } from '../../context/debug-logs-context';
//
// import styles from './backtrace-view.module.scss';
//
// type Props = {
//     backtrace: LogItem['backtrace']
//     time: string;
// };
//
// export function BacktraceView( { backtrace, time }: Props ) {
//
//     return (
//         <Box>
//             <Box className={ styles.footer }>
//                 <Box className={ styles.location }>
//                     <ListIcon size={ 18 } />
//                     <span className={ styles.file }>
//                         { backtrace.sourceName }
//                     </span>
//                     <span className={ styles.sep }>·</span>
//                     <span className={styles.fn}>
//                         { backtrace.callerFunction }
//                     </span>
//                     <span className={ styles.sep }>·</span>
//                     <span className={ styles.line }>
//                         line&nbsp;{ backtrace.lineNumber }
//                     </span>
//                 </Box>
//                 <span className={ styles.time }>{ formatTime( time ) }</span>
//             </Box>
//         </Box>
//     );
// }
//
function formatTime( utcTime: string ): string {
    const [h, m, s] = utcTime.split( ':' ).map( Number );
    const date = new Date();
    date.setUTCHours( h, m, s );

    return date.toLocaleTimeString( undefined, {
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
    } );
}

// {/* Origin frame  className={styles.container} ------------------------------------------------ */}
// {/*<div className={`${styles.frame} ${styles.origin}`}>*/}
// {/*    <ListIcon />lkmkmkl*/}
// {/*    <span className={styles.badge}>origin</span>*/}
// {/*    <div className={styles.frameBody}>jhbhb*/}
// {/*        <span className={styles.path}>{pathToSource}</span>*/}
// {/*        <span className={styles.lineTag}>:{lineNumber}</span>*/}
// {/*    </div>*/}
// {/*</div>*/}
//
// {/*/!* Call stack -------------------------------------------------- *!/*/}
// {/*{frames.map((frame, i) => (*/}
// {/*    <div key={i} className={styles.frame}>*/}
// {/*        <span className={styles.frameIndex}>{i + 1}</span>*/}
// {/*        <div className={styles.frameBody}>*/}
// {/*            <span className={styles.fn}>{frame.function}</span>*/}
// {/*            <div className={styles.location}>*/}
// {/*                <span className={styles.path}>{frame.file}</span>*/}
// {/*                <span className={styles.lineTag}>:{frame.line}</span>*/}
// {/*            </div>*/}
// {/*        </div>*/}
// {/*    </div>*/}
// {/*))}*/}
// // if (frames.length === 0) {
// //     return (
// //         <p className={styles.empty}>No backtrace available.</p>
// //     );
// // }
import { useEffect,useRef, useState } from 'react';

import { ListIcon } from '@debug-panel/icons';
import { Box } from '@debug-panel/ui';

import type { LogItem } from '../../context/debug-logs-context';

import styles from './backtrace-view.module.scss';

type Props = {
    backtrace: LogItem['backtrace'];
    time: string;
};

export function BacktraceView( { backtrace, time }: Props ) {
    const [open, setOpen] = useState( false );
    const [activeIdx, setActiveIdx] = useState( 0 );
    const ref = useRef<HTMLDivElement>( null );

    useEffect( () => {
        const handler = ( e: MouseEvent ) => {
            if ( ref.current && !ref.current.contains( e.target as Node ) ) {
                setOpen( false );
            }
        };
        document.addEventListener( 'mousedown', handler );
        return () => document.removeEventListener( 'mousedown', handler );
    }, [] );

    const activeFrame = backtrace.frames[activeIdx];

    return (
        <Box>
            <Box className={styles.footer}>
                <div ref={ref} className={styles.locationWrap}>
                    <button className={styles.location} onClick={() => setOpen( o => !o )}>
                        <ListIcon size={18} />
                        <span className={styles.file}>{backtrace.sourceName}</span>
                        <span className={styles.sep}>·</span>
                        <span className={styles.fn}>{backtrace.callerFunction}</span>
                        <span className={styles.sep}>·</span>
                        <span className={styles.line}>line&nbsp;{backtrace.lineNumber}</span>
                    </button>

                    {open && (
                        <div className={styles.popover}>
                            <div className={styles.popoverHeader}>
                                <span>Call Stack</span>
                                <button className={styles.openEditor}>Open in editor</button>
                            </div>

                            <div className={styles.filePath}>
                                …/{backtrace.sourceName}
                            </div>

                            <div className={styles.frames}>
                                {backtrace.frames.map( ( frame, i ) => (
                                    <div
                                        key={i}
                                        className={`${styles.frame} ${i === activeIdx ? styles.active : ''}`}
                                        onClick={() => setActiveIdx( i )}
                                    >
                                        <span className={styles.frameIdx}>{i}</span>
                                        <div className={styles.frameBody}>
                                            <div className={styles.frameFn}>{frame.function}</div>
                                            <div className={styles.frameLoc}>{frame.file}</div>
                                        </div>
                                        <span className={styles.frameLine}>: {frame.line}</span>
                                    </div>
                                ) )}
                            </div>

                            <div className={styles.popoverFooter}>
                                <span>Line <strong>{activeFrame?.line}</strong></span>
                                <button onClick={() => navigator.clipboard.writeText( activeFrame?.file ?? '' )}>
                                    Copy path
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <span className={styles.time}>{formatTime( time )}</span>
            </Box>
        </Box>
    );
}
