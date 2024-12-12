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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script type="module">
        import { setInitialValues, getValues } from './game.js';

        //setInitialValues(<?php echo "1111,[111,111],[{x:3453,y:123,type:'wheat',grow:0},...]"; ?>);
    </script>
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
        <canvas id="game"></canvas>
    </main>
</body>
</html>
