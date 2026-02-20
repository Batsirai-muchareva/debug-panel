#!/usr/bin/env bash

prompt_user() {
  heading "Dev Debug Setup"

  echo "What would you like to do?"
  echo ""
  echo -e "  ${GREEN}1)${NC} ${BOLD}Install${NC}     - Install package and all components"
  echo -e "  ${RED}2)${NC} ${BOLD}Uninstall${NC}   - Remove package and all components"
  echo -e "  ${YELLOW}3)${NC} ${BOLD}Reinstall${NC}   - Uninstall and reinstall everything"
  echo -e "  ${CYAN}4)${NC} ${BOLD}MU-Plugin${NC}   - Manage Local WordPress mu-plugins"
  echo -e "  ${BLUE}5)${NC} ${BOLD}Test${NC}        - Test PHP loader functionality"
  echo -e "  ${DIM}6)${NC} ${DIM}Exit${NC}"
  echo ""

  read -rp "$(echo -e "${CYAN}?${NC} Enter your choice [1-6]: ")" choice
  echo ""

  case "$choice" in
    1) ACTION="install" ;;
    2) ACTION="uninstall" ;;
    3) ACTION="reinstall" ;;
    4)
      subheading "MU-Plugin Management"
      echo ""
      echo "  ${GREEN}1)${NC} Install mu-plugin"
      echo "  ${RED}2)${NC} Uninstall mu-plugin"
      echo "  ${DIM}3)${NC} Back"
      echo ""
      read -rp "$(echo -e "${CYAN}?${NC} Enter your choice [1-3]: ")" mu_choice
      echo ""
      case "$mu_choice" in
        1) install_mu_plugin ;;
        2) uninstall_mu_plugin ;;
        3) prompt_user ;;
        *) error "Invalid choice"; exit 1 ;;
      esac
      exit 0
      ;;
    5)
      test_php_loader
      exit 0
      ;;
    6)
      info "Goodbye!"
      exit 0
      ;;
    *)
      error "Invalid choice: $choice"
      exit 1
      ;;
  esac
}
