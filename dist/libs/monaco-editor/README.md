# Elementor Debug Tool

A WordPress plugin that provides real-time database and editor schema viewing within the Elementor editor interface.

## Features

- **Real-time Schema Viewing**: View both database and editor schemas in real-time as you edit
- **Popover Interface**: Clean, minimal interface that appears in the bottom-right corner of the Elementor editor
- **Two-Tab Layout**: 
  - **Database Schema**: Shows the saved WordPress database data for the current page
  - **Editor Schema**: Shows the live JSON representation of the current Elementor editor state
- **Copy to Clipboard**: Easy copying of schema data
- **Export JSON**: Download schema data as JSON files
- **Real-time Updates**: Automatically updates as you make changes to the page

## Installation

1. Upload the plugin files to `/wp-content/plugins/dev-debug-tool/` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. The debug tool will automatically appear in the Elementor editor

## Usage

1. Open any page/post in the Elementor editor
2. Look for the debug tool button (bug icon) in the bottom-right corner
3. Click the button to open the debug tool popover
4. Switch between "Database Schema" and "Editor Schema" tabs
5. Use the copy and export buttons to work with the schema data

## Technical Details

### Database Schema
The database schema shows the raw Elementor data stored in the WordPress database (`_elementor_data` meta field). This represents the saved state of the page.

### Editor Schema
The editor schema shows the current live state of the Elementor selected element using ` elementor.selection.getElements()[0].model.toJSON()`.
This updates in real-time as you make changes.

### Real-time Updates
The plugin listens for various Elementor events:
- Element changes
- Document save changes
``

## Development

### JavaScript API
The plugin uses Elementor's JavaScript API to:
- Access the current document: `elementor.selection.getElements()[0]`
- Listen for changes: `$e.commands.on( event, callback )`
- Get editor state: `element.model.toJSON()`

### PHP Hooks
- `elementor/editor/after_enqueue_scripts`: Enqueue plugin scripts
- `elementor/editor/after_enqueue_styles`: Enqueue plugin scripts
- `wp_ajax_dev_debug_tool_get_database_schema`: AJAX handler for database schema

## Changelog

### 1.0.0
- Initial release
- Real-time database and editor schema viewing
- Copy to clipboard functionality
- Export JSON functionality


** MOTO elegant
** SWEET 
