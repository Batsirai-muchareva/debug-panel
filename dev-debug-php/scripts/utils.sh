#!/usr/bin/env bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# Icons/Emojis
ICON_SUCCESS="✓"
ICON_ERROR="✗"
ICON_WARNING="⚠"
ICON_INFO="ℹ"
ICON_ARROW="→"
ICON_CHECK="✔"
ICON_CROSS="✘"

# Output functions with colors
ok() {
  echo -e "${GREEN}${ICON_SUCCESS}${NC} $1"
}

error() {
  echo -e "${RED}${ICON_ERROR}${NC} $1"
}

warn() {
  echo -e "${YELLOW}${ICON_WARNING}${NC} $1"
}

info() {
  echo -e "${CYAN}${ICON_INFO}${NC} $1"
}

add() {
  echo -e "${BLUE}➕${NC} $1"
}

remove() {
  echo -e "${RED}➖${NC} $1"
}

step() {
  echo -e "${BOLD}${BLUE}${ICON_ARROW}${NC} ${BOLD}$1${NC}"
}

success() {
  echo ""
  echo -e "${GREEN}${BOLD}🎉 $1${NC}"
  echo ""
}

heading() {
  echo ""
  echo -e "${BOLD}${BLUE}========================================${NC}"
  echo -e "${BOLD}${BLUE}   $1${NC}"
  echo -e "${BOLD}${BLUE}========================================${NC}"
  echo ""
}

subheading() {
  echo ""
  echo -e "${BOLD}$1${NC}"
  echo -e "${DIM}────────────────────────────────────────${NC}"
}

# Progress indicator
spinner() {
  local pid=$1
  local delay=0.1
  local spinstr='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
  while ps -p "$pid" > /dev/null 2>&1; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}

# Confirmation prompt
confirm() {
  local prompt="$1"
  local default="${2:-n}"

  if [[ "$default" == "y" ]]; then
    prompt="$prompt [Y/n]: "
  else
    prompt="$prompt [y/N]: "
  fi

  read -r -p "$(echo -e "${YELLOW}?${NC} $prompt")" response

  response=${response:-$default}

  if [[ "$response" =~ ^[Yy]$ ]]; then
    return 0
  else
    return 1
  fi
}

# Show a list of items
list_item() {
  echo -e "  ${DIM}•${NC} $1"
}

# Indented message
indent() {
  echo "     $1"
}
