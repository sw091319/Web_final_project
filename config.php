<?php
// config.php - Database configuration
$host = 'localhost'; 
$dbname = 'farmgame'; 
$user = 'root'; 
$pass = 'mysql';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}

// Create users table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    coin INT DEFAULT 10
)";
$pdo->exec($sql);

// Create seed table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS seed (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    wheat INT DEFAULT 10,
    beat INT DEFAULT 10,
    FOREIGN KEY (user_id) REFERENCES user(id)
)";
$pdo->exec($sql);

// Create farm if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS farm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    x INT,
    y INT,
    seedType VARCHAR(50),
    growLevel INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
)";
$pdo->exec($sql);
