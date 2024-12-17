<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Load configuration
require_once 'config/config.php';

// Check if this is an API request
if (strpos($_SERVER['REQUEST_URI'], '/api/') === 0) {
    require_once 'api/index.php';
    exit;
}

// Check if this is an admin request
if (strpos($_SERVER['REQUEST_URI'], '/admin/') === 0) {
    require_once 'admin/index.php';
    exit;
}

// For all other routes, serve the React application
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $config['app_name']; ?></title>
    <!-- Preload audio files -->
    <link rel="preload" as="audio" href="/sounds/click.mp3" />
    <link rel="preload" as="audio" href="/sounds/confirm.mp3" />
    <link rel="preload" as="audio" href="/sounds/success.mp3" />
    <link rel="preload" as="audio" href="/sounds/fail.mp3" />
    <link rel="preload" as="audio" href="/sounds/round-complete.mp3" />
    <link rel="preload" as="audio" href="/sounds/victory.mp3" />
    <!-- Include built React assets -->
    <script type="module" crossorigin src="/dist/assets/index.js"></script>
    <link rel="stylesheet" href="/dist/assets/index.css">
</head>
<body>
    <div id="root"></div>
</body>
</html>