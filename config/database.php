<?php
$config = require_once 'config.php';

$db = new mysqli(
    $config['db']['host'],
    $config['db']['user'],
    $config['db']['pass'],
    $config['db']['name']
);

if ($db->connect_error) {
    die('Connection failed: ' . $db->connect_error);
}

$db->set_charset('utf8mb4');