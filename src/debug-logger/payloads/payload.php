<?php

namespace DevDebugTool\Debug_Logger\Payloads;

/**
 * Base class for all debug payload types.
 *
 * Every payload knows:
 *  - its `type` identifier  (e.g. "php", "json")
 *  - how to produce its `content` (the data the React renderer will display)
 *
 * The React server-panel reads `payload.type` to decide which interface
 * (PHP dump / JSON viewer / …) to activate by default.
 */
abstract class Payload {

    /**
     * Short string identifier consumed by the React renderer.
     * Examples: "php", "json"
     */
    abstract protected function get_type(): string;

    /**
     * The serialisable content that goes into the `payload.content` field.
     * Can be a typed tree (array), a plain string, or any JSON-encodable value.
     *
     * @return mixed
     */
    abstract protected function get_content(): mixed;

    /**
     * Serialise to the array shape sent inside the event's `payload` key.
     *
     * @return array{ type: string, content: mixed }
     */
    final public function to_array(): array {
        return [
            'type'    => $this->get_type(),
            'content' => $this->get_content(),
        ];
    }
}
