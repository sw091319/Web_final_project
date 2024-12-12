<?php
session_start();
require_once 'config.php';
require_once 'auth.php';

// Check if user is logged in
if (!is_logged_in()) {
    header('Location: login.php');
    exit;
}

//Logout user
if (isset($_POST['logout'])) {
    logout_user();
    header('Location: login.php');
    exit;
}

function getSeed($pdo, $userid) {
    $sql = "SELECT * FROM seed WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $userid]);
    return $stmt->fetch();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="mypagestyles.css">
    <title>Growing a farm</title>
</head>
<body>
    <header>
        <h1>Growing a farm</h1>
        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="mypage.php">Mypage</a></li>
                <form method="POST">
                    <button id ="logout" type="submit" name="logout">Logout</button>
            </ul>
        </nav>
    </header>

    <main>
        <span>hello! <?php echo $_SESSION['username']; ?></span>
        <span>your seed : <?php echo getSeed($pdo, $_SESSION['user_id']); ?>
    </main>
</body>
</html>
