<?php
session_start();
require_once '../config/auth.php';
require_once '../config/database.php';

// Fetch games with pagination
$page = $_GET['page'] ?? 1;
$limit = 20;
$offset = ($page - 1) * $limit;

$result = $db->query("SELECT COUNT(*) as total FROM games");
$total = $result->fetch_assoc()['total'];
$total_pages = ceil($total / $limit);

$games = $db->query("
    SELECT id, data, created_at, updated_at 
    FROM games 
    ORDER BY created_at DESC 
    LIMIT $offset, $limit
");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - 400 Card Game</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="min-h-screen">
        <nav class="bg-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <h1 class="text-xl font-bold">400 Card Game Admin</h1>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <a href="logout.php" 
                           class="text-gray-500 hover:text-gray-700">Logout</a>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="bg-white shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <h2 class="text-lg font-medium mb-4">Game History</h2>
                        
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Game ID
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Players
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <?php while ($game = $games->fetch_assoc()): 
                                        $data = json_decode($game['data'], true);
                                    ?>
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <?php echo htmlspecialchars($game['id']); ?>
                                        </td>
                                        <td class="px-6 py-4">
                                            <?php 
                                            $players = array_map(function($p) {
                                                return htmlspecialchars($p['name']);
                                            }, $data['players']);
                                            echo implode(', ', $players);
                                            ?>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <?php echo date('Y-m-d H:i', strtotime($game['created_at'])); ?>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <?php echo $data['isGameOver'] ? 'Completed' : 'In Progress'; ?>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <a href="view_game.php?id=<?php echo $game['id']; ?>" 
                                               class="text-blue-600 hover:text-blue-900">View</a>
                                            <a href="delete_game.php?id=<?php echo $game['id']; ?>" 
                                               class="ml-4 text-red-600 hover:text-red-900"
                                               onclick="return confirm('Are you sure you want to delete this game?')">Delete</a>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>

                        <?php if ($total_pages > 1): ?>
                        <div class="mt-4 flex justify-center">
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                                <a href="?page=<?php echo $i; ?>" 
                                   class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
                                          <?php echo $i === $page ? 'bg-blue-50' : ''; ?>">
                                    <?php echo $i; ?>
                                </a>
                                <?php endfor; ?>
                            </nav>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>