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

if (isset($_POST['coin'])) {
    $stmt = $pdo->prepare("UPDATE user SET coin = :coin WHERE id = :user_id");
    $stmt->execute(['coin' => $_POST['coin'], 'user_id' => $_SESSION['user_id']]);
    $stmt = $pdo->prepare("UPDATE seed SET wheat = :wheat, beat = :beat WHERE user_id = :user_id");
    $stmt->execute(['wheat' => $_POST['wheat'], 'beat' => $_POST['beat'], 'user_id' => $_SESSION['user_id']]);
    $stmt = $pdo->prepare("DELETE FROM farm WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $_SESSION['user_id']]);
    $stmt = $pdo->prepare("INSERT INTO farm (user_id, x, y, seedType, growLevel) VALUES (:user_id, :x, :y, :type, :grow)");
    foreach ($_POST['farm'] as $farm) {
        $farm = explode(',', $farm);
        $stmt->execute(['user_id' => $_SESSION['user_id'], 'x' => $farm[0], 'y' => $farm[1], 'type' => $farm[2], 'grow' => $farm[3]]);
    }
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
    <link rel="stylesheet" href="styles.css">
    <script type="module">
        import { setInitialValues, getValues } from './game.js';
        setInitialValues(<?php echo $user['coin'].",[".$seed['wheat'].",".$seed['beat']."],".$farm; ?>);

        document.getElementById('form').addEventListener('submit', (e) => {
            const values = getValues();
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'coin';
            input.value = values[0];
            e.target.appendChild(input);
            const input2 = document.createElement('input');
            input2.type = 'hidden';
            input2.name = 'wheat';
            input2.value = values[1][0];
            e.target.appendChild(input2);
            const input3 = document.createElement('input');
            input3.type = 'hidden';
            input3.name = 'beat';
            input3.value = values[1][1];
            e.target.appendChild(input3);
            values[2].forEach((element, index) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'farm[]';
                input.value = `${element.x},${element.y},${element.type},${element.grow}`;
                e.target.appendChild(input);
            });
        });
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
                </form>
                <form id="form" method="POST">
                    <button id ="save" type="submit">Save</button>
                </form>
            </ul>
        </nav>
    </header>

    <main>
        <canvas id="game"></canvas>
    </main>
</body>
</html>
