<?php
class Installer {
    private $config_template = <<<EOT
<?php
return [
    'app_name' => '%s',
    'domain' => '%s',
    'db' => [
        'host' => '%s',
        'name' => '%s',
        'user' => '%s',
        'pass' => '%s'
    ]
];
EOT;

    private $sql_template = <<<EOT
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
    id VARCHAR(10) PRIMARY KEY,
    data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rounds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id VARCHAR(10),
    round_number INT NOT NULL,
    data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);
EOT;

    public function install($data) {
        try {
            // Validate input
            $required = ['app_name', 'domain', 'db_host', 'db_name', 'db_user', 'db_pass', 'admin_user', 'admin_pass'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    return ['success' => false, 'message' => "Missing required field: $field"];
                }
            }

            // Test database connection
            $conn = new mysqli(
                $data['db_host'],
                $data['db_user'],
                $data['db_pass'],
                $data['db_name']
            );

            if ($conn->connect_error) {
                return ['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error];
            }

            // Create tables
            $queries = explode(';', $this->sql_template);
            foreach ($queries as $query) {
                if (trim($query)) {
                    if (!$conn->query($query)) {
                        return ['success' => false, 'message' => 'Failed to create tables: ' . $conn->error];
                    }
                }
            }

            // Create admin user
            $hashed_password = password_hash($data['admin_pass'], PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $stmt->bind_param("ss", $data['admin_user'], $hashed_password);
            
            if (!$stmt->execute()) {
                return ['success' => false, 'message' => 'Failed to create admin user: ' . $stmt->error];
            }

            // Create config file
            $config = sprintf(
                $this->config_template,
                $data['app_name'],
                $data['domain'],
                $data['db_host'],
                $data['db_name'],
                $data['db_user'],
                $data['db_pass']
            );

            if (!file_put_contents('../config/config.php', $config)) {
                return ['success' => false, 'message' => 'Failed to create config file'];
            }

            // Create .htaccess file
            $htaccess = "RewriteEngine On\nRewriteRule ^api/ api/index.php [QSA,L]";
            if (!file_put_contents('../.htaccess', $htaccess)) {
                return ['success' => false, 'message' => 'Failed to create .htaccess file'];
            }

            return ['success' => true];
        } catch (Exception $e) {
            return ['success' => false, 'message' => 'Installation failed: ' . $e->getMessage()];
        }
    }
}