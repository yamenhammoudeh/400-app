<?php
session_start();
require_once 'installer.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $installer = new Installer();
    $result = $installer->install($_POST);
    
    if ($result['success']) {
        header('Location: ../admin/login.php');
        exit;
    }
    
    $error = $result['message'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>400 Card Game - Installation</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-2xl font-bold text-center mb-8">400 Card Game Installation</h1>
            
            <?php if (isset($error)): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700">App Name</label>
                    <input type="text" name="app_name" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Domain Name</label>
                    <input type="text" name="domain" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Database Host</label>
                    <input type="text" name="db_host" required value="localhost"
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Database Name</label>
                    <input type="text" name="db_name" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Database Username</label>
                    <input type="text" name="db_user" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Database Password</label>
                    <input type="password" name="db_pass" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Admin Username</label>
                    <input type="text" name="admin_user" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Admin Password</label>
                    <input type="password" name="admin_pass" required 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>

                <button type="submit" 
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Install Application
                </button>
            </form>
        </div>
    </div>
</body>
</html>