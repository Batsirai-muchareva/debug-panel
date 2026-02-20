#!/usr/bin/env bash

set -e
SOURCE="${BASH_SOURCE[0]}"

while [ -h "$SOURCE" ]; do
  DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done

BASE_DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"

# Load modules
source "$BASE_DIR/scripts/config.sh"
source "$BASE_DIR/scripts/utils.sh"
source "$BASE_DIR/scripts/php-loader.sh"
source "$BASE_DIR/scripts/mu-plugin.sh"
source "$BASE_DIR/scripts/composer.sh"
source "$BASE_DIR/scripts/dmg.sh"
source "$BASE_DIR/scripts/status.sh"
source "$BASE_DIR/scripts/prompt.sh"

# Show usage
show_usage() {
  echo ""
  echo -e "${BOLD}Usage:${NC} $(basename "$0") [OPTION]"
  echo ""
  echo -e "${BOLD}Options:${NC}"
  echo -e "  ${GREEN}-i, --install${NC}         Install the package and all components"
  echo -e "  ${RED}-u, --uninstall${NC}       Uninstall the package and all components"
  echo -e "  ${YELLOW}-r, --reinstall${NC}      Reinstall everything (uninstall + install)"
  echo -e "  ${CYAN}--mu-install${NC}          Install mu-plugin to Local WordPress sites"
  echo -e "  ${CYAN}--mu-uninstall${NC}        Remove mu-plugin from Local WordPress sites"
  echo -e "  ${BLUE}--test${NC}                Test PHP loader functionality"
  echo -e "  ${MAGENTA}--status${NC}              Show installation status"
  echo -e "  ${DIM}-h, --help${NC}            Show this help message"
  echo ""
  echo -e "${BOLD}Examples:${NC}"
  echo -e "  ${DIM}# Interactive installation${NC}"
  echo -e "  $(basename "$0")"
  echo ""
  echo -e "  ${DIM}# Quick install${NC}"
  echo -e "  $(basename "$0") -i"
  echo ""
  echo -e "  ${DIM}# Check status${NC}"
  echo -e "  $(basename "$0") --status"
  echo ""
  echo -e "  ${DIM}# Just manage mu-plugins${NC}"
  echo -e "  $(basename "$0") --mu-install"
  echo ""
}

ACTION=""

case "$1" in
  -i|--install)      ACTION="install" ;;
  -u|--uninstall)    ACTION="uninstall" ;;
  -r|--reinstall)    ACTION="reinstall" ;;
  --mu-install)      install_mu_plugin; exit 0 ;;
  --mu-uninstall)    uninstall_mu_plugin; exit 0 ;;
  --status)          show_status; exit 0 ;;
  -h|--help)         show_usage; exit 0 ;;
  "")                prompt_user ;;
  *)
    error "Unknown option: $1"
    show_usage
    exit 1
    ;;
esac

case "$ACTION" in
  install)   install ;;
  uninstall) uninstall ;;
  reinstall) reinstall ;;
esac
