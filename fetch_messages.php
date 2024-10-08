<?php
if (file_exists('messages.txt')) {
    $lines = file('messages.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $messages = [];
    foreach ($lines as $line) {
        $decoded = json_decode($line, true);
        if ($decoded !== null) {
            $messages[] = $decoded;
        }
    }
    header('Content-Type: application/json');
    echo json_encode($messages);
} else {
    // Handle the case where the file does not exist
    http_response_code(404);
    echo json_encode(['error' => 'Messages file not found.']);
}
?>
