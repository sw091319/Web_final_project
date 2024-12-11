<?php
session_start();
require_once 'config.php';
require_once 'auth.php';

// Check if user is logged in
// if (!is_logged_in()) {
//     header('Location: login.php');
//     exit;
// }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="game.js" type="module">
        
    </script>
    <title>Final project</title>
</head>
<body>
    <header>
        <!-- <img src="./img/logo.webp" alt="logo" weight="55px" height="55px"> -->
        <h1>Growing a farm</h1>
        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="login.php">Logout</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <canvas id="game"></canvas>
    </main>
</body>
</html>
