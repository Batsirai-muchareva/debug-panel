#!/usr/bin/env bash
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LINK_NAME="/usr/local/bin/dev-debug"

show_banner() {
  echo ""
  echo -e "${BOLD}${BLUE}╔════════════════════════════════════════╗${NC}"
  echo -e "${BOLD}${BLUE}║                                        ║${NC}"
  echo -e "${BOLD}${BLUE}║     Dev Debug CLI Manager              ║${NC}"
  echo -e "${BOLD}${BLUE}║                                        ║${NC}"
  echo -e "${BOLD}${BLUE}╚════════════════════════════════════════╝${NC}"
  echo ""
}

check_status() {
  if command -v dev-debug >/dev/null 2>&1; then
    if [ -L "$LINK_NAME" ]; then
      local target=$(readlink "$LINK_NAME")
      echo -e "${GREEN}✓${NC} Status: ${BOLD}${GREEN}INSTALLED${NC}"
      echo -e "${DIM}  Command:  $LINK_NAME${NC}"
      echo -e "${DIM}  Links to: $target${NC}"
      return 0
    else
      echo -e "${YELLOW}⚠${NC} Status: ${BOLD}${YELLOW}FOUND${NC} (but not our symlink)"
      return 1
    fi
  else
    echo -e "${RED}✗${NC} Status: ${BOLD}${RED}NOT INSTALLED${NC}"
#    return 1
  fi
}

show_menu() {
  show_banner
  echo ""
  echo -e "${BOLD}What would you like to do?${NC}"
  echo ""
  echo -e "  ${GREEN}1)${NC} ${BOLD}Install${NC}     - Install dev-debug command"
  echo -e "  ${RED}2)${NC} ${BOLD}Uninstall${NC}   - Remove dev-debug command"
  echo -e "  ${CYAN}3)${NC} ${BOLD}Reinstall${NC}   - Reinstall dev-debug command"
  echo -e "  ${BLUE}4)${NC} ${BOLD}Status${NC}      - Check installation status"
  echo -e "  ${DIM}5)${NC} ${DIM}Exit${NC}"
  echo ""

  check_status
  echo ""

  read -rp "$(echo -e "${CYAN}?${NC} Enter your choice [1-5]: ")" choice
  echo ""

  case "$choice" in
    1) install ;;
    2) uninstall ;;
    3) reinstall ;;
    4) check_status; echo ""; read -p "Press Enter to continue..."; show_menu ;;
    5) echo -e "${BLUE}ℹ${NC} Goodbye!"; exit 0 ;;
    *) echo -e "${RED}✗${NC} Invalid choice"; sleep 1; show_menu ;;
  esac
}

install() {
  echo -e "${BOLD}${BLUE}Installing dev-debug command...${NC}"
  echo ""

  TARGET_SCRIPT="$SCRIPT_DIR/dev-debug.sh"

# Check if target script exists
echo -e "${CYAN}→${NC} Checking for dev-debug.sh..."
if [ ! -f "$TARGET_SCRIPT" ]; then
  echo -e "${RED}✗${NC} Error: dev-debug.sh not found in ${BOLD}$SCRIPT_DIR${NC}"
  echo -e "${DIM}  Expected location: $TARGET_SCRIPT${NC}"
  exit 1
fi
echo -e "${GREEN}✓${NC} Found dev-debug.sh"
echo ""

# Make the target script executable
echo -e "${CYAN}→${NC} Making dev-debug.sh executable..."
chmod +x "$TARGET_SCRIPT"
echo -e "${GREEN}✓${NC} Permissions set"
echo ""


# Check if /usr/local/bin exists
if [ ! -d "/usr/local/bin" ]; then
  echo -e "${YELLOW}⚠${NC} /usr/local/bin doesn't exist, creating it..."
  sudo mkdir -p /usr/local/bin
  echo -e "${GREEN}✓${NC} Created /usr/local/bin"
fi
echo ""

# Remove existing symlink if it exists
if [ -L "$LINK_NAME" ] || [ -f "$LINK_NAME" ]; then
  echo -e "${CYAN}→${NC} Removing existing installation..."
  sudo rm -f "$LINK_NAME"
  echo -e "${GREEN}✓${NC} Removed old installation"
fi
echo ""

# Create symlink
echo -e "${CYAN}→${NC} Creating symlink..."
if sudo ln -s "$TARGET_SCRIPT" "$LINK_NAME"; then
  echo -e "${GREEN}✓${NC} Symlink created: ${BOLD}$LINK_NAME${NC} → ${DIM}$TARGET_SCRIPT${NC}"
else
  echo -e "${RED}✗${NC} Failed to create symlink"
  exit 1
fi


echo ""
echo -e "${CYAN}→${NC} Verifying installation..."
if command -v dev-debug >/dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Command verified: ${BOLD}dev-debug${NC} is available"
else
  echo -e "${YELLOW}⚠${NC} Command not found in PATH"
  echo -e "${DIM}  You may need to restart your terminal${NC}"
fi

# Success message
echo ""
echo -e "${BOLD}${GREEN}┌────────────────────────────────────────┐${NC}"
echo -e "${BOLD}${GREEN}│                                        │${NC}"
echo -e "${BOLD}${GREEN}│  ✓ Installation Successful!            │${NC}"
echo -e "${BOLD}${GREEN}│                                        │${NC}"
echo -e "${BOLD}${GREEN}└────────────────────────────────────────┘${NC}"
echo ""


# Usage examples
echo -e "${BOLD}${BLUE}Quick Start:${NC}"
echo ""
echo -e "  ${GREEN}►${NC} Show help:           ${BOLD}dev-debug --help${NC}"
echo -e "  ${GREEN}►${NC} Install package:     ${BOLD}dev-debug -i${NC}"
echo -e "  ${GREEN}►${NC} Check status:        ${BOLD}dev-debug --status${NC}"
echo -e "  ${GREEN}►${NC} Interactive mode:    ${BOLD}dev-debug${NC}"
echo ""
}

uninstall() {
  echo -e "${BOLD}${RED}Uninstalling dev-debug command...${NC}"
  echo ""

  if [ ! -L "$LINK_NAME" ] && [ ! -f "$LINK_NAME" ]; then
    echo -e "${YELLOW}⚠${NC} dev-debug not installed"
    read -p "Press Enter to continue..."
    show_menu
    return
  fi

  echo -e "${YELLOW}⚠${NC} This will remove the ${BOLD}dev-debug command from your system"
  read -rp "$(echo -e "${CYAN}?${NC} Continue? [y/N]: ")" confirm

  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}ℹ${NC} Cancelled"
    sleep 1
    show_menu
    return
  fi

  echo ""

  if sudo rm -f "$LINK_NAME"; then
    echo -e "${GREEN}✓${NC} Removed dev-debug command"
    echo ""
    echo -e "${BOLD}${GREEN}✓ Uninstallation Complete!${NC}"
    echo ""
    read -p "Press Enter to continue..."
    show_menu
  else
    echo -e "${RED}✗${NC} Failed to remove"
    exit 1
  fi
}

reinstall() {
  echo -e "${BOLD}${YELLOW}Reinstalling dev-debug command...${NC}"
  echo ""

  # Uninstall quietly
  if [ -L "$LINK_NAME" ] || [ -f "$LINK_NAME" ]; then
    sudo rm -f "$LINK_NAME"
    echo -e "${GREEN}✓${NC} Removed old installation"
  fi

  # Install
  TARGET_SCRIPT="$SCRIPT_DIR/setup.sh"

  if [ ! -f "$TARGET_SCRIPT" ]; then
    echo -e "${RED}✗${NC} Error: setup.sh not found"
    exit 1
  fi

  chmod +x "$TARGET_SCRIPT"

  if [ ! -d "/usr/local/bin" ]; then
    sudo mkdir -p /usr/local/bin
  fi

  if sudo ln -s "$TARGET_SCRIPT" "$LINK_NAME"; then
    echo -e "${GREEN}✓${NC} Reinstalled successfully"
    echo ""
    echo -e "${BOLD}${GREEN}✓ Reinstallation Complete!${NC}"
    echo ""
    read -p "Press Enter to continue..."
    show_menu
  else
    echo -e "${RED}✗${NC} Failed to reinstall"
    exit 1
  fi
}

# Main
case "${1:-}" in
  install)   install ;;
  uninstall) uninstall ;;
  reinstall) reinstall ;;
  *)         show_menu ;;
esac

