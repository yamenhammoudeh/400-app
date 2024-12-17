<?php
header('Content-Type: application/json');
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = trim(str_replace('/api', '', $path), '/');

try {
    switch ($path) {
        case 'games':
            switch ($method) {
                case 'GET':
                    $id = $_GET['id'] ?? null;
                    if ($id) {
                        $stmt = $db->prepare("SELECT * FROM games WHERE id = ?");
                        $stmt->bind_param("s", $id);
                        $stmt->execute();
                        $result = $stmt->get_result()->fetch_assoc();
                        echo json_encode($result);
                    }
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents('php://input'), true);
                    $stmt = $db->prepare("INSERT INTO games (id, data) VALUES (?, ?)");
                    $stmt->bind_param("ss", $data['id'], json_encode($data));
                    $stmt->execute();
                    echo json_encode(['success' => true]);
                    break;

                case 'PUT':
                    $data = json_decode(file_get_contents('php://input'), true);
                    $stmt = $db->prepare("UPDATE games SET data = ? WHERE id = ?");
                    $stmt->bind_param("ss", json_encode($data), $data['id']);
                    $stmt->execute();
                    echo json_encode(['success' => true]);
                    break;

                case 'DELETE':
                    $id = $_GET['id'] ?? null;
                    if ($id) {
                        $stmt = $db->prepare("DELETE FROM games WHERE id = ?");
                        $stmt->bind_param("s", $id);
                        $stmt->execute();
                        echo json_encode(['success' => true]);
                    }
                    break;
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}