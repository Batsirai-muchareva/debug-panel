<?php

namespace DevDebugTool\Debug_Logger;

use Exception;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;

final class Debug {
		public static function send( ...$args ): void {
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
