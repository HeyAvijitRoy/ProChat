<?php
session_start(); // Start the session to store authentication status

// Define the preset password for admin access
define('ADMIN_PASSWORD', 'YourSeceuredPassword');

// Initialize the error message and success message variables
$errorMessage = '';
$successMessage = '';
$authenticated = false;
$filesDeleted = false; // Track if files are deleted

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // If a password was submitted and it's not yet authenticated
    if (isset($_POST['password']) && !isset($_SESSION['authenticated'])) {
        $password = $_POST['password'];

        // Verify if the password matches the preset password
        if ($password === ADMIN_PASSWORD) {
            $_SESSION['authenticated'] = true; // Set session to authenticated
        } else {
            // If password is incorrect, set the error message
            $errorMessage = "Incorrect password. Please try again.";
        }
    }

    // If delete button was clicked and authenticated
    if (isset($_POST['delete_files']) && isset($_SESSION['authenticated'])) {
        // Path to your user and message files
        $userFile = 'online_users.txt';
        $messageFile = 'messages.txt';

        // Delete user and message files if they exist and create success messages
        $successMessage = '<div style="margin-bottom: 15px;">';
        if (file_exists($userFile)) {
            unlink($userFile);
            $successMessage .= "<p>User file deleted successfully.</p>";
        } else {
            $successMessage .= "<p>User file not found.</p>";
        }

        if (file_exists($messageFile)) {
            unlink($messageFile);
            $successMessage .= "<p>Message file deleted successfully.</p>";
        } else {
            $successMessage .= "<p>Message file not found.</p>";
        }
        $successMessage .= '</div>';

        $filesDeleted = true; // Mark files as deleted
    }
}

// Check if session is authenticated
$authenticated = isset($_SESSION['authenticated']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Chat Cleanup</title>
    <link rel="stylesheet" href="style.css">
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.png">
    <style>
        /* Additional inline styles for admin page */
        .login-box input[type="password"] {
            width: 80%; /* Adjust the width to align well */
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1em;
        }

        .login-box button {
            width: 80%; /* Ensure the button matches the input width */
            margin: 0 auto; /* Center the button */
            display: block; /* Align the button centrally */
        }

        .delete-btn {
            background-color: #28a745; /* Green button for deletion */
            color: #fff;
        }

        .delete-btn:hover {
            background-color: #218838;
        }

        .error-message {
            color: red;
            margin-bottom: 15px;
        }

        .success-message {
            color: green;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div id="login-container">
        <div class="login-box">
            <h2>Enter Admin Password</h2>

            <?php
            // Display the appropriate content based on authentication status and deletion state
            if ($authenticated) {
                // If files are deleted, show success message only
                if ($filesDeleted) {
                    echo "<div class='success-message'>$successMessage</div>";
                } else {
                    // If not yet deleted, show the delete button
                    echo '
                    <form method="post">
                        <button type="submit" name="delete_files" class="delete-btn">Delete User and Message Files</button>
                    </form>';
                }
            } else {
                // If not authenticated, show the password form and any error message
                if (!empty($errorMessage)) {
                    echo "<p class='error-message'>$errorMessage</p>";
                }
                echo '
                <form method="post">
                    <input type="password" name="password" placeholder="Enter Password" required>
                    <button type="submit">Submit</button>
                </form>';
            }
            ?>
        </div>
    </div>
</body>
</html>
