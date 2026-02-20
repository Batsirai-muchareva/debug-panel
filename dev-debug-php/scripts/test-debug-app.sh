#!/usr/bin/env bash

# Create temp file in /tmp
PHP_FILE=$(mktemp /tmp/dev_debug.XXXX.php)

# Ensure cleanup always happens (even on crash/CTRL+C)
trap 'echo "🧹 Deleting temp file: $PHP_FILE"; rm -f "$PHP_FILE"' EXIT

echo "📄 Temp file created at: $PHP_FILE"

# Write PHP code into temp file
cat <<'PHP' > "$PHP_FILE"
<?php

// ---- PHP DATASETS ----
$phpData1 = ["name" => "Alice", "age" => 30];
$phpData2 = ["status" => true, "score" => 99.5];

// ---- JSON DATASETS ----
$jsonData1 = '{"product":"Laptop","price":1200}';
$jsonData2 = '{"active":false,"roles":["admin","user"]}';

// Decode JSON
$decodedJson1 = json_decode($jsonData1, true);
$decodedJson2 = json_decode($jsonData2, true);

// ---- LOOP THROUGH ALL DATA ----
$datasets = [
    ["value" => $phpData1, "context" => ["type" => "PHP", "label" => "PHP Data 1"]],
    ["value" => $phpData2, "context" => ["type" => "PHP", "label" => "PHP Data 2"]],
    ["value" => $decodedJson1, "context" => ["type" => "JSON", "label" => "JSON Data 1"]],
    ["value" => $decodedJson2, "context" => ["type" => "JSON", "label" => "JSON Data 2"]],
];

foreach ($datasets as $data) {
    dev_debug($data["value"], $data["context"]);
}
PHP

echo "🚀 Running PHP script..."
php "$PHP_FILE"

echo "✅ Done."
