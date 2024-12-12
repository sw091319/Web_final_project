<?php
// auth.php - Authentication functions
function register_user($pdo, $username, $password) {
    try {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO user (username, password) VALUES (:username, :password)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'username' => $username,
            'password' => $hashed_password
        ]);

        $sql = "select * from user where username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        $sql = "INSERT INTO seed (user_id, wheat, beat) VALUES (:user_id, 10, 10)";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute(['user_id' => $user['id']]);
    } catch (PDOException $e) {
        return false;
    }
}

function login_user($pdo, $username, $password) {
    $sql = "SELECT * FROM user WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Start session and store user info
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        return $user;
    }
    return false;
}

function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function logout_user() {
    $_SESSION = array();
    session_destroy();
}
function get_user($pdo, $user_id) {
    $sql = "SELECT * FROM user WHERE id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $user_id]);
    return $user = $stmt->fetch();
}

function get_seedTable($pdo, $user_id) {
    $sql = "SELECT * FROM seed WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $user_id]);
    return $seed = $stmt->fetch();
}

function parseFarm($farm) {
    return "{x:".$farm['x'].",y:".$farm['y'].",type:'".$farm['seedType']."',grow:".$farm['growLevel']."}";
}

function get_farmTable($pdo, $user_id) {
    $sql = "SELECT * FROM farm WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $user_id]);
    $farm = $stmt->fetchAll();
    return "[".implode(",", array_map("parseFarm", $farm))."]";
}
?>
