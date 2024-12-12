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

$user = get_user($pdo, $_SESSION['user_id']);
$seed = get_seedTable($pdo, $_SESSION['user_id']);
$farm = get_farmTable($pdo, $_SESSION['user_id']);
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
                </form>
            </ul>
        </nav>
    </header>

    <main>
        <div>      
            <span>hello! <?php echo $_SESSION['username']; ?></span>
            <span>your coin : <?php echo $user['coin']; ?></span>
            <span>your wheat seed : <?php echo $seed['wheat']; ?></span>
            <span>your beat seed : <?php echo $seed['beat']; ?></span>
        </div>

        <div>
            <span>Use Asset : <a href="https://cupnooble.itch.io/sprout-lands-asset-pack" target = "_blank">https://cupnooble.itch.io/sprout-lands-asset-pack</a></span>
        </div>
    </main>
</body>
</html>
