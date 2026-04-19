<?php

namespace DevDebugTool\Debug_Logger;

use Exception;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;

final class Debug {
		public static function send( ...$args ): void {
//				$payload = Payload_Factory::create_payload( $args );
				$result  = Payload_Factory::create_payload($args);

				$backtrace = new Backtrace( 2 );

				$event = [
						'id' => self::generateId(),
						'time' => self::getTimestamp(),
						'label' => $result['label'],
						'payload' => $result['payload'],
						'backtrace' => $backtrace->capture(),
				];

				Client::send( $event );
		}

		private static function generateId(): string {
				return bin2hex( random_bytes( 8 ) );
		}

		/**
		 * @throws Exception
		 */
		private static function getTimestamp(): string {
				return ( new \DateTime( 'now', new \DateTimeZone( 'UTC' ) ) )->format( 'H:i:s' );
	}
}
//						...$backtrace->trace_information(),

//						'sourceName' => basename( $callSite[ 'file' ] ),
//						'lineNumber' => $callSite[ 'line' ],
//						'pathToSource' => $callSite[ 'file' ],
//						'callerFunction' => Backtrace::getCallerFunction( $trace ),
//						'backtrace' => Backtrace::normalize( $trace ),








//
//namespace DevDebugTool\Debug_Logger;
//
//use DevDebugTool\Debug_Logger\Payloads\payload;
//
///**
// * Builds and dispatches debug events.
// *
// * Single responsibility: given a Payload and the raw backtrace captured
// * inside dp(), assemble the event envelope and hand it to Client::send().
// *
// * Frame layout when dp() calls sendPayload():
// *
// *   trace[0]  Debug::sendPayload()   (this method — internal)
// *   trace[1]  dp()                   file/line = WHERE dp() was called  ← CALL SITE
// *   trace[2]  enclosing function     function name = callerFunction
// *   trace[3+] deeper stack           → backtrace[] for the Trace tab
// */
//final class Debug {
//
//    /**
//     * @param payload                                                      $payload
//     * @param array<int, array{file?:string,line?:int,function?:string}>   $trace
//     *        The raw backtrace captured at the start of dp().
//     */
//    public static function send( payload $payload, array $trace ): void {
//        $caller     = $trace[1] ?? $trace[0];
//        $callerFunc = $trace[2]['function'] ?? null;
//
//        $file = $caller['file'] ?? 'unknown';
//        $line = $caller['line'] ?? 0;
//
//        // Skip frame[0] (sendPayload) and frame[1] (dp) — user's call stack starts at [2]
//        $backtrace = array_map(
//            static fn( array $frame ) => [
//                'file'     => $frame['file']     ?? 'unknown',
//                'line'     => $frame['line']      ?? 0,
//                'function' => $frame['function'] ?? 'unknown',
//            ],
//            array_slice( $trace, 2 )
//        );
//
//        $event = [
//            'id'             => bin2hex( random_bytes( 8 ) ),
//            'time'           => date( 'H:i:s' ),
//            'sourceName'     => basename( $file ),
//            'lineNumber'     => $line,
//            'label'          => strtoupper( $payload->getType() ),
//            'pathToSource'   => $file,
//            'callerFunction' => $callerFunc,
//            'backtrace'      => $backtrace,
//            'payload'        => $payload->toArray(),
//        ];
//
//        Client::send( $event );
//    }
//}
