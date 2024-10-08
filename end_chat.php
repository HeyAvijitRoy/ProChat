<?php
session_start();

if (isset($_SESSION['display_name'])) {
    $file_online_users = 'online_users.txt';
    $file_chat_history = 'messages.txt';

    // Destroy session
    session_destroy();

    // Delete the online users file
    if (file_exists($file_online_users)) {
        unlink($file_online_users); // Delete the online_users.txt file
    }

    // Delete the chat history file
    if (file_exists($file_chat_history)) {
        unlink($file_chat_history); // Delete the message.txt file
    }
}

header('Location: index.php');
exit();
?>
