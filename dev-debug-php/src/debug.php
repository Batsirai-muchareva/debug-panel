<?php

namespace DevDebug;

final class Debug {

		public static function send( mixed $value, array $context = [] ): void {
				$trace = debug_backtrace( DEBUG_BACKTRACE_IGNORE_ARGS, 2 )[ 1 ] ?? [];

				$file = $trace[ 'file' ] ?? 'unknown';
				$line = $trace[ 'line' ] ?? 0;
				$language = $context['type'] ?? 'PHP';
				$label = $context['label'] ?? 'PHP';

				$event = [
						'id'           => bin2hex( random_bytes( 8 ) ),
						'time'         => date( 'H:i:s' ),
						'sourceName'   => basename( $file ),
						'lineNumber'   => $line,
						'label'   => $label,
						'pathToSource' => $file,
						'payload'      => [
								'language' => $language,
								'value'    => self::normalize( $value ),
						],
				];

				Client::send( $event );
		}

		private static function normalize( mixed $value ): mixed {
				if ( is_array( $value ) ) {
						return array_map( [ self::class, 'normalize' ], $value );
				}

				if ( is_object( $value ) ) {
						$reflection = new \ReflectionClass( $value );
						$properties = [];

						foreach ( $reflection->getProperties() as $property ) {
								$property->setAccessible( true );

								$visibility = $property->isPrivate()
										? 'private'
										: ( $property->isProtected() ? 'protected' : 'public' );

								$properties[] = [
										'visibility' => $visibility,
										'name'       => $property->getName(),
										'value'      => self::normalize( $property->getValue( $value ) ),
								];
						}

						return [
								'__type'     => 'object',
								'__class'    => $reflection->getName(),
								'__id'       => spl_object_id( $value ),
								'properties' => $properties,
						];
				}

				return $value;
		}
}
//    private static function caller(): string
//    {
//        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 3);
//
//        foreach ($trace as $frame) {
//            if (!isset($frame['file'])) continue;
//
//            if (!str_contains($frame['file'], 'vendor')) {
//                return basename($frame['file']) . ':' . ($frame['line'] ?? 0);
//            }
//        }
//
//        return 'unknown';
//    }

//    private static function shouldReflect(string $className): bool
//    {
//        foreach (self::REFLECT_NAMESPACES as $ns) {
//            if (str_starts_with($className, $ns)) {
//                return true;
//            }
//        }
//        return false;
//    }

//    private static function normalize(mixed $value, array &$seen = [], int $depth = 0): mixed
//    {
//        if ($depth > 10) {
//            return ['__type' => 'depth_limit'];
//        }
//
//        if (is_array($value)) {
//            return array_map(
//                fn($item) => self::normalize($item, $seen, $depth + 1),
//                $value
//            );
//        }
//
//        if (is_object($value)) {
//            $id        = spl_object_id($value);
//            $className = get_class($value);
//
//            if (isset($seen[$id])) {
//                return [
//                    '__type'  => 'circular',
//                    '__class' => $className,
//                    '__id'    => $id,
//                ];
//            }
//
//            $seen[$id] = true;
//
//            // Third-party class (WordPress, Elementor, etc.) — stub only,
//            // no reflection so we never trigger their lazy-loading side effects
//            if (!self::shouldReflect($className)) {
//                return [
//                    '__type'  => 'object',
//                    '__class' => $className,
//                    '__id'    => $id,
//                    'properties' => [],
//                ];
//            }
//
//            // Safe to reflect — it's our own code
//            $reflection = new \ReflectionClass($value);
//            $properties = [];
//
//            foreach ($reflection->getProperties() as $property) {
//                $property->setAccessible(true);
//
//                if (!$property->isInitialized($value)) continue;
//
//                try {
//                    $propValue = $property->getValue($value);
//                } catch (\Throwable) {
//                    continue;
//                }
//
//                $visibility = match(true) {
//                    $property->isPrivate()   => 'private',
//                    $property->isProtected() => 'protected',
//                    default                  => 'public',
//                };
//
//                $properties[] = [
//                    'visibility' => $visibility,
//                    'name'       => $property->getName(),
//                    'value'      => self::normalize($propValue, $seen, $depth + 1),
//                ];
//            }
//
//            return [
//                '__type'     => 'object',
//                '__class'    => $className,
//                '__id'       => $id,
//                'properties' => $properties,
//            ];
//        }
//
//        return $value;
//    }
//}

// final class Debug
// {
//     public static function send( mixed $value, array $context = []): void {
//         $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2)[1] ?? [];

//         $file = $trace['file'] ?? 'unknown';
//         $line = $trace['line'] ?? 0;

//         $event = [
//             'id'           => bin2hex(random_bytes(8)),
//             'time'         => date('H:i:s'),
//             'sourceName'   => basename($file),
//             'lineNumber'   => $line,
//             'pathToSource' => $file,
//             'payload'      => [
//                 'language' => 'PHP',
//                 'value'    => self::normalize($value),
//             ],
//         ];

//         Client::send( $event );
//     }

//     private static function caller(): string
//     {
//         $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 3);

//         foreach ($trace as $frame) {
//             if (!isset($frame['file'])) {
//                 continue;
//             }

//             if ( ! str_contains( $frame['file'], 'vendor' ) ) {
//                 return basename( $frame['file'] ) . ':' . ( $frame['line'] ?? 0 );
//             }
//         }

//         return 'unknown';
//     }

//     /**
//      * Normalize a value for serialization.
//      *
//      * @param mixed $value   The value to normalize.
//      * @param array $seen    Tracks visited object IDs to prevent infinite loops
//      *                       from circular references.
//      */
//     private static function normalize(mixed $value, array &$seen = []): mixed
//     {
//         if (is_array($value)) {
//             return array_map(
//                 fn($item) => self::normalize($item, $seen),
//                 $value
//             );
//         }

//         if (is_object($value)) {
//             $id = spl_object_id($value);

//             // Circular reference — return a placeholder instead of recursing
//             if (isset($seen[$id])) {
//                 return [
//                     '__type'      => 'circular',
//                     '__class'     => get_class($value),
//                     '__id'        => $id,
//                 ];
//             }

//             // Mark this object as visited BEFORE recursing into its properties
//             $seen[$id] = true;

//             $reflection = new \ReflectionClass($value);
//             $properties = [];

//             foreach ($reflection->getProperties() as $property) {
//                 $property->setAccessible(true);

//                 // getProperties() includes inherited properties — skip ones
//                 // that aren't initialized to avoid errors on typed properties
//                 if (!$property->isInitialized($value)) {
//                     continue;
//                 }

//                 $visibility = match(true) {
//                     $property->isPrivate()   => 'private',
//                     $property->isProtected() => 'protected',
//                     default                  => 'public',
//                 };

//                 $properties[] = [
//                     'visibility' => $visibility,
//                     'name'       => $property->getName(),
//                     'value'      => self::normalize($property->getValue($value), $seen),
//                 ];
//             }

//             // Unmark after processing so sibling references to the same object
//             // still serialize (only true back-references are circular)
//             unset($seen[$id]);

//             return [
//                 '__type'     => 'object',
//                 '__class'    => $reflection->getName(),
//                 '__id'       => $id,
//                 'properties' => $properties,
//             ];
//         }

//         return $value;
//     }
// }




// // final class Debug
// // {
// // 		public static function send( mixed $value, array $context = []): void {
// // 				$trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2)[1] ?? [];

// // 				$file = $trace['file'] ?? 'unknown';
// // 				$line = $trace['line'] ?? 0;

// // 				$event = [
// // 						'id'           => bin2hex(random_bytes(8)),
// // 						'time'         => date('H:i:s'),
// // 						'sourceName'   => basename($file),
// // 						'lineNumber'   => $line,
// // 						'pathToSource' => $file,
// // 						'payload'      => [
// // 								'language' => 'PHP',
// // 								'value'    => self::normalize($value),
// // 						],
// // //						'context'      => $context,
// // 				];

// // 				Client::send( $event );
// // 		}

// // 		private static function caller(): string
// // 		{
// // 				$trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 3);

// // 				foreach ($trace as $frame) {
// // 						if (!isset($frame['file'])) {
// // 								continue;
// // 						}

// // 						if ( ! str_contains( $frame['file'], 'vendor' ) ) {
// // 								return basename( $frame['file'] ) . ':' . ( $frame['line'] ?? 0 );
// // 						}
// // 				}

// // 				return 'unknown';
// // 		}


// // 		// private static function normalize(mixed $value): mixed
// // 		// {
// // 		// 		if (is_object($value)) {
// // 		// 				return method_exists($value, '__toString')
// // 		// 						? (string) $value
// // 		// 						: json_decode(json_encode($value), true);
// // 		// 		}

// // 		// 		return $value;
// // 		// }
// // }
//    /**
//     * Namespaces/prefixes we will fully reflect into.
//     * Everything else gets a lightweight stub.
//     * Add your own plugin/theme namespace here.
//     */
//    private const REFLECT_NAMESPACES = [
//        // 'DevDebug\\',
//		'WP_',
//        'wpdb',
//        'Elementor\\Core\\Base\\',
//        'Elementor\\Core\\Files\\',
//        'Elementor\\Core\\Logger\\',
//        'Elementor\\Core\\Upgrade\\',
//        'Elementor\\Modules\\System_Info\\',
//    ];
