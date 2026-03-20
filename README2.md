give me a small php package that I can use that install globally and we can use debug() in any php project

🎯 Goals for this package

✅ Install once (Composer global or per-project)

✅ Zero framework dependency (works with plain PHP, WordPress, Laravel, etc.)

✅ Simple API: debug($data)

✅ Sends JSON over WebSocket to ws://127.0.0.1:8080

✅ Safe (won’t crash if WS server is down)

dev-debug/debug


```json
{
  "name": "dev-debug/debug",
  "description": "Send debug data from PHP to a local macOS debug app via WebSocket",
  "type": "library",
  "license": "MIT",
  "autoload": {
    "psr-4": {
      "DevDebug\\": "src/"
    },
    "files": [
      "src/helpers.php"
    ]
  },
  "require": {
    "php": ">=8.0"
  }
}
```

We use HTTP → Node → WebSocket, not PHP → WebSocket directly.
This avoids PHP WebSocket complexity and works everywhere.

📦 Install globally (recommended)

composer global require dev-debug/debug

Make sure Composer’s global bin is loaded:
export PATH="$HOME/.composer/vendor/bin:$PATH"

require 'vendor/autoload.php';

debug('Hello from PHP 🎯');
debug(['user' => 1, 'roles' => ['admin']]);


debug($_POST, 'POST');


debug($request->all(), 'Request');


🧠 Why this design is correct
Decision	Why
HTTP → Node → WS	PHP is bad at WebSockets
Fire-and-forget	Debug must never block
JSON only	Swift decoding stays simple
Global helper	Zero friction

This is exactly how Ray / Telescope-like tools work internally.


🚀 Next upgrades (easy wins)

1️⃣ debug()->dump()->die()
2️⃣ debug()->label('Auth')->send($data)
3️⃣ Request/session grouping
4️⃣ Stack trace capture
5️⃣ Auto-disable in production

If you want, next I can:

Turn this into a real Composer-published package
Add Laravel / WP auto-discovery
Add request grouping UI in SwiftUI
You’re building a legit dev tool now 👏


Best production model:

macOS app = UI + server
PHP package = client only

PHP App
↓
debug()
↓
DevDebug\Client
↓
HTTP POST (JSON)
↓
Node server (/debug)
↓
WebSocket
↓
macOS App UI


composer global config repositories.dev-debug '{"type":"path","url":"/Users/batsiraimuchareva/Local Sites/wordpress-dev/app/public/wp-content/plugins/dev-debug-tool/debug"}'


✅ Verify it worked

Run:

composer global config repositories --json


You should see something like:

{
"dev-debug": {
"type": "path",
"url": "/Users/batsiraimuchareva/Local Sites/wordpress-dev/app/public/wp-content/plugins/dev-debug-tool/debug"
}
}


If you see that → you’re good.

composer global require dev-debug/debug
composer global require dev-debug/debug:dev-main


cp -R DevDebug.app ~/Desktop/DevDebug.app
cd ~/Desktop
codesign --force --sign - DevDebug.app/Contents/Resources/devdebug-server-arm64
codesign --force --deep --sign - DevDebug.app
