<?php

namespace DevDebugTool;

class Database_Ajax {
		const AJAX_DEV_DEBUG_KEY = 'dev_debug_tool_get_database_schema';
		const NONCE_DEV_DEBUG_KEY = 'dev_debug_tool_nonce';

		const POST_META_KEY = '_elementor_data';
		const VARIABLES_META_KEY = '_elementor_global_variables';
		const GLOBAL_CLASSES_META_KEY = '_elementor_global_classes';

		public function register_hooks(): void {
				add_action('wp_ajax_' .self::AJAX_DEV_DEBUG_KEY , [ $this, 'get_database_schema' ]);
		}

		public function get_database_schema(): void {
				$this->assert_nonce_validity();
				$this->assert_user_has_permission();

				$post_id = intval( $_POST['post_id'] );
				$meta_key = $_POST['meta_key'];

				if ( ! $post_id ) {
						wp_send_json_error( __( 'Either post ID is invalid or its empty', 'dev-debug-tool') );
				}

				if ( ! $meta_key ) {
						wp_send_json_error( __( 'Meta key is required', 'dev-debug-tool') );
				}

				$elementor_data = get_post_meta( $post_id, $meta_key, true );

				if ( empty( $elementor_data ) ) {
						wp_send_json_success( [
								'schema' => [],
								'message' => __('No Elementor data found for this page', 'dev-debug-tool')
						] );
				}

				if ( is_string( $elementor_data ) ) {
						$elementor_data = json_decode( $elementor_data, true );
				}

				wp_send_json_success( [
						'schema' => $elementor_data,
						'post_id' => $post_id,
						'timestamp' => current_time('mysql')
				] );
		}

		private function assert_nonce_validity() {
				$nonce_check = check_ajax_referer( self::NONCE_DEV_DEBUG_KEY, 'nonce', false );

				if ( ! $nonce_check ) {
						wp_send_json_error([
								'message' => __('Invalid nonce', 'dev-debug-tool')
						], 403);
				}
		}

		private function assert_user_has_permission() {
				if ( ! current_user_can('edit_posts') ) {
						wp_die(__('Insufficient permissions', 'dev-debug-tool'));
				}
		}
}
