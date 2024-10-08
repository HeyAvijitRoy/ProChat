<?php
session_start();

// Ensure a display name is set; otherwise, redirect to login page
if (!isset($_SESSION['display_name'])) {
    header('Location: index.php');
    exit();
}

// File to track online users
$onlineUsersFile = 'online_users.txt';
$limit_reached = false; // Variable to determine if user limit has been reached (can be adjusted for your application)

// Check if the user limit has been reached and redirect if necessary
if ($limit_reached) {
    header('Location: index.php');
    exit();
}

// Create the online users file if it does not exist
if (!file_exists($onlineUsersFile)) {
    $file = fopen($onlineUsersFile, 'w');
    fwrite($file, 'Chat session started.');
    fclose($file);
}

// Set the display name in JavaScript for frontend use
echo "<script>sessionStorage.setItem('display_name', '" . htmlspecialchars($_SESSION['display_name']) . "');</script>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Team Troubleshooting</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="favicon.png">
</head>
<body>
    <!-- Chat Container -->
    <div id="chat-container">
        <div id="chat-header">
            <div id="header-row-1">
                <h2>Team Troubleshooting Experts</h2>
                <div id="user-welcome">
                    Welcome, <?php echo htmlspecialchars($_SESSION['display_name']); ?>
                </div>
            </div>
            <div id="header-row-2">
                <form method="POST" action="end_chat.php">
                    <button type="submit">End Troubleshooting</button>
                </form>
                <div id="notification-container">
                    <button id="notification-btn" onclick="toggleNotification()">Enable Audio Notification</button>
                </div>
            </div>
        </div>

        <div id="chat-box"></div>
        <div id="message-form">
            <!-- Emoji Button -->
            <button id="emoji-btn">😀</button>
             <!-- Emoji Picker Table (Add it here) -->
             <div id="emoji-popup" class="emoji-popup">
                <table>
                    <tbody>
                        <!-- Example emojis in a 3-column format -->
                        <!-- Happy/Positive Emotions -->
                        <tr>
                            <td>😀</td>
                            <td>😂</td>
                            <td>😅</td>
                            <td>😊</td>
                            <td>😍</td>
                            <td>😘</td>
                            <td>🥳</td>
                        </tr>
                        <!-- Cool/Confident Emotions -->
                        <tr>
                            <td>😎</td>
                            <td>😏</td>
                            <td>😁</td>
                            <td>🕶️</td>
                            <td>😆</td>
                            <td>😋</td>
                            <td>🤩</td>
                        </tr>
                        <!-- Sad/Disappointed Emotions -->
                        <tr>
                            <td>😢</td>
                            <td>😞</td>
                            <td>😔</td>
                            <td>😣</td>
                            <td>😩</td>
                            <td>😫</td>
                            <td>😭</td>
                        </tr>
                        <!-- Angry/Frustrated Emotions -->
                        <tr>
                            <td>😡</td>
                            <td>😠</td>
                            <td>🤬</td>
                            <td>😤</td>
                            <td>🙄</td>
                            <td>😒</td>
                            <td>👿</td>
                        </tr>
                        <!-- Surprised/Shocked Emotions -->
                        <tr>
                            <td>😮</td>
                            <td>😲</td>
                            <td>😳</td>
                            <td>😱</td>
                            <td>🤯</td>
                            <td>🤔</td>
                            <td>🧐</td>
                        </tr>
                        <!-- Funny/Mischievous Emotions -->
                        <tr>
                            <td>🤪</td>
                            <td>😜</td>
                            <td>🤡</td>
                            <td>👻</td>
                            <td>🤭</td>
                            <td>🤫</td>
                            <td>😈</td>
                        </tr>
                        <!-- Miscellaneous Emotions -->
                        <tr>
                            <td>👍</td>
                            <td>👏</td>
                            <td>💔</td>
                            <td>💯</td>
                            <td>🙌</td>
                            <td>✌️</td>
                            <td>👌</td>
                        </tr>
                        <!-- Additional Hand and Palm Emojis -->
                        <tr>
                            <td>🤲</td> <!-- Palms together (offering) -->
                            <td>🙏</td> <!-- Folded hands (prayer) -->
                            <td>👋</td> <!-- Waving hand -->
                            <td>🤚</td> <!-- Raised back of hand -->
                            <td>✋</td> <!-- Raised hand -->
                            <td>🖐️</td> <!-- Hand with fingers splayed -->
                            <td>🤝</td> <!-- Handshake -->
                        </tr>
                        <tr>
                            <td>🤟</td> <!-- I love you hand gesture -->
                            <td>✌️</td> <!-- Victory hand -->
                            <td>👌</td> <!-- OK hand -->
                            <td>🖖</td> <!-- Vulcan salute -->
                            <td>👊</td> <!-- Fist bump -->
                            <td>🤜</td> <!-- Right-facing fist -->
                            <td>🤛</td> <!-- Left-facing fist -->
                        </tr>
                        <!-- Love/Affectionate Emotions -->
                        <tr>
                            <td>😍</td>
                            <td>😘</td>
                            <td>🥰</td>
                            <td>😻</td>
                            <td>💖</td>
                            <td>💕</td>
                            <td>💞</td>
                        </tr>
                        <tr>
                            <td>❤️</td>
                            <td>💙</td>
                            <td>💚</td>
                            <td>💛</td>
                            <td>💜</td>
                            <td>🧡</td>
                            <td>💗</td>
                        </tr>
                        <tr>
                            <td>💓</td>
                            <td>💘</td>
                            <td>💝</td>
                            <td>💟</td>
                            <td>❣️</td>
                            <td>💌</td>
                            <td>❤️‍🔥</td>
                        </tr>
                        <tr>
                            <td>❤️‍🩹</td>
                            <td>💑</td>
                            <td>👩‍❤️‍👨</td>
                            <td>👨‍❤️‍👨</td>
                            <td>👩‍❤️‍👩</td>
                            <td>💏</td>
                            <td>🤍</td>
                        </tr>

                        <!-- Religious/Spiritual Emblems -->
                        <tr>
                            <td>🧘‍♂️</td>
                            <td>🧘‍♀️</td>
                            <td>🕉️</td> <!-- OM Emoji -->
                            <td>🔱</td>
                            <td>🛐</td>
                            <td>🕊️</td>
                            <td>✝️</td>
                        </tr>
                        <tr>
                            <td>🛕</td>
                            <td>🪔</td>
                            <td>🕯️</td>
                            <td>🥥</td>
                            <td>🌺</td> <!-- Hibiscus flower (used in offerings) -->
                            <td>🌸</td> <!-- Lotus flower -->
                            <td>💐</td> <!-- Bouquet of flowers (offering) -->
                        </tr>
                    </tbody>
                </table>
            </div>
            <input type="text" id="message" placeholder="Type your message here..." autocomplete="off">
            <button id="send-btn">Send</button>
        </div>

    </div>

    <!-- Set sessionStorage for display name -->
    <script>
        sessionStorage.setItem('display_name', "<?php echo htmlspecialchars($_SESSION['display_name']); ?>");
    </script>
    
    <!-- Main Chat JS -->
    <script src="chat.js" defer></script>
</body>
</html>
