#!/usr/bin/env bash

install_dmg() {
  [[ ! -f "$DMG_PATH" ]] && {
    warn "DMG not found at: $DMG_PATH"
    return 1
  }

  subheading "Installing macOS Application"
  indent "DMG: ${DIM}$DMG_PATH${NC}"
  indent "Destination: ${DIM}$APP_INSTALL_DIR${NC}"
  echo ""

  step "Mounting DMG"
  MOUNT_POINT=$(hdiutil attach "$DMG_PATH" -nobrowse 2>/dev/null | awk '/\/Volumes\// {print $NF; exit}')

  if [[ -z "$MOUNT_POINT" ]]; then
    error "Failed to mount DMG"
    return 1
  fi

  ok "Mounted at: $MOUNT_POINT"

  step "Finding app bundle"
  APP_PATH=$(find "$MOUNT_POINT" -maxdepth 1 -name "*.app" -print -quit)

  if [[ -z "$APP_PATH" ]]; then
    error "No .app bundle found in DMG"
    hdiutil detach "$MOUNT_POINT" >/dev/null 2>&1
    return 1
  fi

  ok "Found: $(basename "$APP_PATH")"

  step "Copying to Applications"
  if sudo cp -R "$APP_PATH" "$APP_INSTALL_DIR" 2>/dev/null; then
    ok "Copied successfully"
  else
    error "Failed to copy app to Applications"
    hdiutil detach "$MOUNT_POINT" >/dev/null 2>&1
    return 1
  fi

  step "Unmounting DMG"
  if hdiutil detach "$MOUNT_POINT" >/dev/null 2>&1; then
    ok "DMG unmounted"
  else
    warn "Failed to unmount DMG (non-critical)"
  fi

  echo ""
  ok "$APP_NAME installed to $APP_INSTALL_DIR"

  return 0
}

uninstall_dmg() {
  if [[ "$(uname)" != "Darwin" ]]; then
    return 0
  fi

  if [[ ! -d "$APP_INSTALL_DIR/$APP_NAME" ]]; then
    info "App not found at: $APP_INSTALL_DIR/$APP_NAME"
    return 0
  fi

  subheading "Removing macOS Application"
  indent "Path: ${DIM}$APP_INSTALL_DIR/$APP_NAME${NC}"
  echo ""

  if sudo rm -rf "$APP_INSTALL_DIR/$APP_NAME" 2>/dev/null; then
    ok "$APP_NAME removed successfully"
    return 0
  else
    error "Failed to remove $APP_NAME"
    return 1
  fi
}
