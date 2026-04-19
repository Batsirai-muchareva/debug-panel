<?php

namespace DevDebugTool\Debug_Logger\Payloads;

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
