#!/usr/bin/env bash

REPO_NAME="dev-debug"
PACKAGE="dev-debug/debug"
PACKAGE_BRANCH="dev-main"

PACKAGE_PATH="$BASE_DIR"
COMPOSER_HOME="$(composer global config home)"
LOADER_PATH="$COMPOSER_HOME/vendor/$REPO_NAME/debug/global-dev-debug-loader.php"

DMG_PATH="$PACKAGE_PATH/app/DevDebug.dmg"
APP_INSTALL_DIR="/Applications"
APP_NAME="DevDebug.app"
