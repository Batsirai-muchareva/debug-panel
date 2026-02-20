#!/usr/bin/env bash

# Global arrays
LOCAL_SITE_PATHS=()
LOCAL_SITE_NAMES=()

find_local_sites() {
  local primary_dir="$HOME/Local Sites"

  LOCAL_SITE_PATHS=()
  LOCAL_SITE_NAMES=()

  if [[ -d "$primary_dir" ]]; then
    while IFS= read -r site_dir; do
      local site_name=$(basename "$site_dir")
      local wp_content="$site_dir/app/public/wp-content"

      if [[ -d "$wp_content" ]]; then
        LOCAL_SITE_PATHS+=("$wp_content")
        LOCAL_SITE_NAMES+=("$site_name")
      fi
    done < <(find "$primary_dir" -maxdepth 1 -type d 2>/dev/null | tail -n +2)
  fi

  [[ ${#LOCAL_SITE_NAMES[@]} -gt 0 ]]
}

is_mu_plugin_installed() {
  local wp_content="$1"
  [[ -f "$wp_content/mu-plugins/load-dev-debug.php" ]]
}

display_local_sites() {
  subheading "Local WordPress Sites"

  for i in "${!LOCAL_SITE_NAMES[@]}"; do
    local status=""
    local status_color=""

    if is_mu_plugin_installed "${LOCAL_SITE_PATHS[$i]}"; then
      status="INSTALLED"
      status_color="${GREEN}"
    else
      status="NOT INSTALLED"
      status_color="${DIM}"
    fi

    printf "  %2d. %-30s ${status_color}[%s]${NC}\n" "$((i+1))" "${LOCAL_SITE_NAMES[$i]}" "$status"
  done

  echo ""
}

install_mu_plugin() {
  if ! find_local_sites; then
    info "No Local WordPress sites found in ~/Local Sites/"
    return 0
  fi

  display_local_sites

  echo -e "${CYAN}?${NC} Select sites to install (comma-separated, 'all', or press Enter to skip):"
  echo -e "${DIM}  Examples: 1,3,5  or  all  or  2${NC}"
  read -r -p "  Your choice: " choice

  [[ -z "$choice" ]] && {
    info "Skipping mu-plugin installation"
    return 0
  }

  # Parse selections
  local -a selected_indices=()

  if [[ "$choice" == "all" ]]; then
    for i in "${!LOCAL_SITE_NAMES[@]}"; do
      selected_indices+=("$i")
    done
  else
    IFS=',' read -ra choices <<< "$choice"
    for c in "${choices[@]}"; do
      c=$(echo "$c" | xargs)
      if [[ "$c" =~ ^[0-9]+$ ]] && [[ $c -ge 1 ]] && [[ $c -le ${#LOCAL_SITE_NAMES[@]} ]]; then
        selected_indices+=($((c - 1)))
      else
        warn "Invalid choice: $c"
      fi
    done
  fi

  [[ ${#selected_indices[@]} -eq 0 ]] && {
    info "No sites selected"
    return 0
  }

  echo ""
  step "Installing mu-plugin to ${#selected_indices[@]} site(s)"
  echo ""

  # Create mu-plugin content
  local mu_plugin_content
  read -r -d '' mu_plugin_content << 'PLUGIN' || true
<?php
/**
 * Plugin Name: Load Dev Debug
 * Description: Loads dev_debug() functions for development
 * Version: 1.0.0
 * Author: Dev Debug Tool
 */

// Prevent double execution
if (defined('DEV_DEBUG_LOADED')) {
    return;
}
define('DEV_DEBUG_LOADED', true);

/**
 * Load Composer global autoload
 * Use absolute path to work from any location
 */
$home = getenv('HOME') ?: (getenv('USERPROFILE') ?: '/Users/' . get_current_user());
$autoload = $home . '/.composer/vendor/autoload.php';

if (!is_file($autoload)) {
    return;
}

require_once $autoload;

// dev_debug() is now available globally
PLUGIN

  # Install to each selected site
  local success_count=0
  local failed_count=0

  for idx in "${selected_indices[@]}"; do
    local site_name="${LOCAL_SITE_NAMES[$idx]}"
    local wp_content="${LOCAL_SITE_PATHS[$idx]}"
    local mu_plugins_dir="$wp_content/mu-plugins"
    local mu_plugin_file="$mu_plugins_dir/load-dev-debug.php"

    # Create mu-plugins directory if needed
    [[ ! -d "$mu_plugins_dir" ]] && mkdir -p "$mu_plugins_dir"

    # Write plugin file
    echo "$mu_plugin_content" > "$mu_plugin_file"

    if [[ -f "$mu_plugin_file" ]]; then
      ok "$site_name"
      ((success_count++))
    else
      error "$site_name"
      ((failed_count++))
    fi
  done

  echo ""

  if [[ $failed_count -eq 0 ]]; then
    success "Installed mu-plugin to $success_count site(s)"
  else
    warn "Installed to $success_count site(s), failed: $failed_count"
  fi

  info "Restart your Local site(s) if needed"
  echo ""
}

uninstall_mu_plugin() {
  if ! find_local_sites; then
    info "No Local WordPress sites found"
    return 0
  fi

  # Filter to only sites with the plugin
  local -a installed_indices=()
  local -a installed_names=()

  for i in "${!LOCAL_SITE_NAMES[@]}"; do
    if is_mu_plugin_installed "${LOCAL_SITE_PATHS[$i]}"; then
      installed_indices+=("$i")
      installed_names+=("${LOCAL_SITE_NAMES[$i]}")
    fi
  done

  [[ ${#installed_names[@]} -eq 0 ]] && {
    ok "No mu-plugin installations found"
    return 0
  }

  subheading "Removing mu-plugin from all sites"

  for i in "${!installed_names[@]}"; do
    echo "  • ${installed_names[$i]}"
  done

  echo ""
  step "Removing mu-plugin from ${#installed_names[@]} site(s)"
  echo ""

  local success_count=0
  local failed_count=0

  for idx in "${installed_indices[@]}"; do
    local site_name="${LOCAL_SITE_NAMES[$idx]}"
    local mu_plugin="${LOCAL_SITE_PATHS[$idx]}/mu-plugins/load-dev-debug.php"

    rm -f "$mu_plugin"

    if [[ ! -f "$mu_plugin" ]]; then
      ok "$site_name"
      ((success_count++))
    else
      error "$site_name"
      ((failed_count++))
    fi
  done

  echo ""

  if [[ $failed_count -eq 0 ]]; then
    ok "Removed mu-plugin from all $success_count site(s)"
  else
    warn "Removed from $success_count site(s), failed: $failed_count"
  fi

  echo ""
}
