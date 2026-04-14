<?php

namespace DevDebugTool\Debug_Logger;

final class Client {
		private const HOST = '127.0.0.1';
		private const PORT = 9001;
		private const PATH = '/log';
		private const TIMEOUT = 0.2;

		public static function send( array $event ): void {
				try {
						$payload = self::encodePayload($event);

						$context = stream_context_create( [
								'http' => [
										'method'  => 'POST',
										'header'  => "Content-Type: application/json\r\n",
										'content' => $payload,
										'timeout' => self::TIMEOUT,
										'ignore_errors' => true,
								]
						] );

						@file_get_contents( self::getEndpoint(), false, $context );

				} catch (\Throwable $e) {
						// Debugging must never interrupt production flow
				}
		}

		private static function encodePayload( array $event ): string {
				return json_encode( $event, JSON_THROW_ON_ERROR );
		}

		private static function getEndpoint(): string {
				return sprintf(
						'http://%s:%d%s',
						self::HOST,
						self::PORT,
						self::PATH
				);
		}
}
