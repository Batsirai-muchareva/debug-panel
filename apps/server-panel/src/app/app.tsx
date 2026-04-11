// Uncomment this line to use CSS modules
// import NxWelcome from './nx-welcome';
import { EmptyState } from '../components/empty-state';
import { LogEntry } from '../components/log-entry';
import { useDebugLogs } from '../hooks/use-debug-logs';

import styles from './app.module.scss';

/**
 * style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
 * @constructor
 */
export function App() {
    const { logs, connected } = useDebugLogs();

    const hasLogs = logs.length > 0;

    return (
        <div className={ styles.container}>
            <div className={ styles.wrapper }>
                <header style={{ padding: '12px 20px', borderBottom: '1px solid #1e2140', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: connected ? '#55e275' : '#e25555' }} />
                    <span style={{ fontSize: '13px', color: connected ? '#55e275' : '#e25555' }}>
                        { connected ? 'Server ready · listening' : 'Server offline' }
                    </span>
                </header>

                <div className={ styles.maxWidth }>
                    {
                        hasLogs
                            ? <Logs />
                            : <EmptyState />
                    }
        {
            // ? <EmptyState />
            // : logs.map( ( log ) => <LogEntry key={ log.index } item={ log } /> )
        }
      </div>
    </div>
    </div>
      //
      // <LogEntry />
//       <div style={ { display: 'flex', justifyContent: 'center'  } }>
//           {/*<EmptyState />*/}
//       <div style={ { width: '880px' } }>
//           <LogEntry
//               item={{
//                   index: 1,
//                   language: 'PHP',
//                   data: `array:3 [
//   "name" => "John"
//   "age" => "30"
//   "role" => "admin"
// ]`,
//                   file: 'my-plugin.php',
//                   method: 'handle_request',
//                   line: 42,
//                   time: '23:31:58',
//               }}
//           />
//       </div>
//       </div>

  );
}

export default App;
