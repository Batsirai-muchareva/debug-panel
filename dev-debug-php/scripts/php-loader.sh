#!/usr/bin/env bash

PHP_BIN="$(command -v php)"
PHP_INI_PATH="$("$PHP_BIN" --ini 2>/dev/null | awk -F': ' '/Loaded Configuration File/ {print $2}' | xargs)"
PHP_INI_DIR="$(dirname "$PHP_INI_PATH")/conf.d"
PHP_INI_FILE="$PHP_INI_DIR/zzzz-dev-debug.ini"

install_php_loader() {
  # Validation
  if [[ -z "$PHP_INI_DIR" ]]; then
    error "PHP_INI_DIR not set"
    return 1
  fi

  if [[ ! -d "$PHP_INI_DIR" ]]; then
    error "PHP config directory not found: $PHP_INI_DIR"
    return 1
  fi

  if [[ ! -f "$LOADER_PATH" ]]; then
    error "Loader not found at: $LOADER_PATH"
    return 1
  fi

  subheading "PHP Loader Configuration"
  indent "PHP Binary: ${DIM}$PHP_BIN${NC}"
  indent "Config Dir: ${DIM}$PHP_INI_DIR${NC}"
  indent "INI File:   ${DIM}$PHP_INI_FILE${NC}"
  indent "Loader:     ${DIM}$LOADER_PATH${NC}"
  echo ""

  # Install
  echo "auto_prepend_file=\"$LOADER_PATH\"" | sudo tee "$PHP_INI_FILE" >/dev/null

  # Verify
  if php -r "exit(function_exists('dev_debug') ? 0 : 1);" 2>/dev/null; then
    ok "Loader is working - dev_debug() available"
    return 0
  else
    warn "Loader installed but dev_debug() not detected"
    info "Try: ${BOLD}php -i | grep auto_prepend_file${NC}"
    return 1
  fi
}

uninstall_php_loader() {
  if [[ -z "$PHP_INI_DIR" ]]; then
    error "PHP_INI_DIR not set"
    return 1
  fi

  if [[ ! -f "$PHP_INI_FILE" ]]; then
    info "No loader config found at: $PHP_INI_FILE"
    return 0
  fi

  subheading "Removing PHP Loader"
  indent "Config: ${DIM}$PHP_INI_FILE${NC}"
  echo ""

  sudo rm -f "$PHP_INI_FILE"

  # Verify removal
  if php -r "exit(function_exists('dev_debug') ? 1 : 0);" 2>/dev/null; then
    ok "Loader removed successfully"
    return 0
  else
    warn "dev_debug() still available - check for other configs"
    indent "Check: ${BOLD}grep -r auto_prepend_file '$PHP_INI_DIR'${NC}"
    return 1
  fi
}
