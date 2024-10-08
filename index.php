<?php
session_start();

// Clear chat history at the start of any session to ensure a clean slate
$chat_history_file = 'messages.txt';  // Assuming the file is named message.txt
//if (file_exists($chat_history_file)) {
//    file_put_contents($chat_history_file, ''); // Clear the chat history file
//}

// Read the online users file to determine how many users are online
$file = 'online_users.txt';
$online_users = file($file, FILE_IGNORE_NEW_LINES);
$limit_reached = count($online_users) >= 2;

if ($_SERVER['REQUEST_METHOD'] == 'POST' && !$limit_reached) {
    $display_name = htmlspecialchars($_POST['display_name']);
    $_SESSION['display_name'] = $display_name;

    // Add the user's name to the text file if limit is not reached
    if (!in_array($display_name, $online_users)) {
        file_put_contents($file, $display_name . PHP_EOL, FILE_APPEND | LOCK_EX);
    }

    header('Location: hello_world.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Team Troubleshooting Login</title>
    <link rel="icon" type="image/x-icon" href="favicon.png">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="login-container">
        <div class="login-box">
            <h2>Enter Troubleshooting</h2>
            <?php if ($limit_reached): ?>
                <p class="limit-reached">Limit Reached, Try Later</p>
            <?php else: ?>
                <form method="POST" action="">
                    <input type="text" name="display_name" placeholder="Enter your display name" required>
                    <button type="submit">Join Team</button>
                </form>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
