<?php

namespace DevDebugTool\Debug_Logger\Payloads;

/**
 * JSON payload — renders in the server-panel as a syntax-highlighted
 * JSON viewer (no PHP dump tree, no Trace tab).
 *
 * Accepts any value that can be JSON-encoded, or a raw JSON string.
 *
 * Usage (via helper):
 *   dp()->json( $array );            // array / object → encoded then displayed
 *   dp()->json( '{"foo":"bar"}' );   // raw JSON string → validated then displayed
 *   dp()->json( $wp_post );          // any object works
 *
 * What gets sent to the React renderer:
 *
 *   {
 *     type:    "json",
 *     content: {
 *       raw:    '{"foo":"bar"}',   // the pretty-printed JSON string
 *       valid:  true,              // whether it parsed cleanly
 *     }
 *   }
 *
 * The React JsonView component receives `content.raw` and highlights it.
 * If `content.valid` is false the raw string is shown as-is with a
 * warning so the user can see what arrived.
 */
final class Json_Payload extends payload {

    private string $raw;
    private bool $valid;

    public function __construct( mixed $value ) {
        if ( is_string( $value ) ) {
            // Validate — re-encode if it's a valid JSON string so we get
            // pretty-printing even when the caller passes a minified string.
            $decoded = json_decode( $value );

            if ( json_last_error() === JSON_ERROR_NONE ) {
                $this->raw   = (string) json_encode( $decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
                $this->valid = true;
            } else {
                // Not valid JSON — surface it anyway so the user can debug it.
                $this->raw   = $value;
                $this->valid = false;
            }
        } else {
            // Array, object, scalar → encode directly.
            $encoded = json_encode( $value, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );

            $this->raw   = $encoded !== false ? $encoded : '(json_encode failed)';
            $this->valid = $encoded !== false;
        }
    }

    public function get_type(): string {
        return 'json';
    }

    /**
     * @return array{ raw: string, valid: bool }
     */
    public function get_content(): array {
        return [
            'raw'   => $this->raw,
            'valid' => $this->valid,
        ];
    }
}
