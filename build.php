<?php
// Script to build React application and move assets to correct location

// Configuration
$buildCommand = 'npm run build';
$sourceDir = 'dist';
$targetDir = 'public';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Starting build process...\n";

// Run npm build
echo "Running npm build...\n";
exec($buildCommand, $output, $returnVar);

if ($returnVar !== 0) {
    echo "Build failed!\n";
    echo implode("\n", $output);
    exit(1);
}

echo "Build completed successfully.\n";

// Create target directory if it doesn't exist
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

// Copy build files to public directory
echo "Copying build files to public directory...\n";
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($sourceDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

foreach ($iterator as $item) {
    $target = $targetDir . DIRECTORY_SEPARATOR . $iterator->getSubPathName();
    
    if ($item->isDir()) {
        if (!file_exists($target)) {
            mkdir($target, 0755, true);
        }
    } else {
        copy($item, $target);
    }
}

echo "Build files copied successfully.\n";

// Set proper permissions
echo "Setting permissions...\n";
exec("chmod -R 755 $targetDir");

echo "Build process completed!\n";