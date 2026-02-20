<?php
declare(strict_types=1);

// Prevent double execution
if (defined('DEV_DEBUG_LOADED')) {
    return;
}
define('DEV_DEBUG_LOADED', true);

/**
 * Load Composer global autoload
 * Use absolute path to work from any location
 */
$home = getenv('HOME') ?: (getenv('USERPROFILE') ?: '/Users/batsiraimuchareva');
$autoload = $home . '/.composer/vendor/autoload.php';

if (!is_file($autoload)) {
    return;
}

require_once $autoload;

/**
 * Gate behavior AFTER autoload
 * (functions are already defined at this point)
 */
if (PHP_SAPI !== 'cli' && !getenv('DEV_DEBUG_ENABLED')) {
    return;
}
