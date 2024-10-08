<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if display_name is set in session
    if (!isset($_SESSION['display_name'])) {
        echo 'Display name is not set.';
        exit;
    }
    
    $message = htmlspecialchars($_POST['message']);
    $display_name = $_SESSION['display_name'];
    $time = gmdate('Y-m-d\TH:i:s\Z'); // Generate UTC timestamp in ISO 8601 format

    $data = [
        'time' => $time,
        'display_name' => $display_name,
        'message' => $message
    ];

    $entry = json_encode($data) . "\n";
    
    // Write to messages.txt with file lock
    file_put_contents('messages.txt', $entry, FILE_APPEND | LOCK_EX);
}
?>
