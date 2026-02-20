<?php

namespace DevDebug;

final class Client
{
		private const ENDPOINT = 'http://127.0.0.1:3000/debug';

		public static function send( array $event ): void
		{
				try {
						$payload = json_encode( $event, JSON_THROW_ON_ERROR );

						$context = stream_context_create([
								'http' => [
										'method'  => 'POST',
										'header'  => "Content-Type: application/json\r\n",
										'content' => $payload,
										'timeout' => 0.2, // fast, non-blocking feel
								]
						]);

						// Fire and forget
						@file_get_contents(self::ENDPOINT, false, $context);

				} catch (\Throwable $e) {
						// Silently ignore — debug must never break prod
				}
		}
}
