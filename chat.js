// // V 2.2 - Notification Sound & Emoji Conversion
// document.addEventListener('DOMContentLoaded', function() {
//     const sendBtn = document.getElementById('send-btn');
//     const messageInput = document.getElementById('message');
//     const chatBox = document.getElementById('chat-box');
//     const notificationBtn = document.getElementById('notification-btn');

//     let messageHistory = new Set(); // Use a Set to keep track of unique messages
//     let originalTitle = document.title;
//     let flashingInterval;
//     let audioNotificationEnabled = false; // Default to off

//     sendBtn.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });

//     // Emoji map for converting emoticons to emojis
//     const emojiMap = {
//         '<3': '❤️',
//         '</3': '💔',
//         ':)': '😊',
//         ':(': '😞',
//         ';)': '😉',
//         ':D': '😃',
//         ':P': '😜',
//         ':o': '😮',
//         'B)': '😎',
//         ':|': '😐',
//         ':/': '😕',
//         ':*': '😘',
//         ':@': '😡',
//         'XD': '😆',
//         ':\'(': '😢',
//         ':-)': '🙂',
//         ':-(': '🙁',
//         ':^)': '😊',
//         '>:(': '😠',
//         ':]': '🙂',
//         ':3': '😺',
//         '>:O': '😲',
//         ':$': '😳',
//         ':#': '🤐',
//         ':-/': '😕',
//         '8)': '😎',
//         '8|': '😐',
//         'O:)': '😇',
//         '>:)': '😈',
//         ':/)': '😏',
//         '=)': '😊',
//         '=(': '😞',
//         ':-P': '😜',
//         ':-D': '😃',
//         ':-O': '😮',
//         ':-X': '🤐',
//         ':-*': '😘',
//         ':X': '🤐',
//         'T_T': '😭',
//         'T.T': '😢',
//         '-_-': '😑',
//         '._.': '😶',
//         ':L': '😞',
//         'QQ': '😭',
//         '0:)': '😇',
//         ':v': '😏',
//         ':B': '😁',
//         'D:': '😧',
//         '>:D': '😆',
//         '>:P': '😜',
//         ':-|': '😐',
//         '>.<': '😣',
//         ':rotfl:': '🤣'
//     };

//     // Function to convert emoticons to emojis
//     function convertEmoticonsToEmoji(text) {
//         const regex = new RegExp(Object.keys(emojiMap).join('|'), 'g');
//         return text.replace(regex, match => emojiMap[match] || match);
//     }

//     // Toggle Audio Notification
//     window.toggleNotification = function() {
//         if (!audioNotificationEnabled) {
//             // Ask for confirmation to enable
//             const confirmation = confirm('Do you want to enable audio notifications for new messages?');
//             if (confirmation) {
//                 audioNotificationEnabled = true;
//                 notificationBtn.textContent = 'Disable Audio Notification';
//             }
//         } else {
//             // Toggle off
//             audioNotificationEnabled = false;
//             notificationBtn.textContent = 'Enable Audio Notification';
//         }
//     };

//     function sendMessage() {
//         let message = messageInput.value.trim();

//         // Convert emoticons to emoji
//         message = convertEmoticonsToEmoji(message);

//         if (message !== '') {
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'send_message.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr.send('message=' + encodeURIComponent(message));
//             messageInput.value = '';
//         }
//     }
    
//     //Fetch
//     function fetchMessages() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'fetch_messages.php', true);
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 const messages = JSON.parse(xhr.responseText);

//                 // Append only new messages
//                 messages.forEach(function(msg) {
//                     const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
//                     if (!messageHistory.has(uniqueMessageKey)) {
//                         // Convert emoticons to emoji
//                         msg.message = convertEmoticonsToEmoji(msg.message);

//                         // Create a new message div
//                         const messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');

//                         // Add appropriate class for self and other messages
//                         if (msg.display_name === sessionStorage.getItem('display_name')) {
//                             messageDiv.classList.add('self');
//                         } else {
//                             messageDiv.classList.add('other');

//                             // Play sound if audio notifications are enabled and the message is from another user
//                             if (audioNotificationEnabled) {
//                                 playDingSound();
//                             }

//                             // Flash favicon and title only if the tab is not active
//                             if (document.hidden) {
//                                 flashFavicon();
//                                 flashTitle();
//                             }
//                         }

//                         // Parse the ISO 8601 timestamp and convert to local time
//                         const utcDate = new Date(msg.time);
//                         if (!isNaN(utcDate.getTime())) {
//                             // Format the time in hh:mm:ss AM/PM format with date
//                             const options = {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 second: '2-digit',
//                                 hour12: true,
//                                 timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use the user's local timezone
//                             };
//                             const localTimeString = utcDate.toLocaleString(undefined, options);
//                             msg.time = localTimeString;
//                         }

//                         // Convert URLs in the message to clickable links
//                         const messageWithLinks = msg.message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

//                         // Format message content with local time and links
//                         messageDiv.innerHTML = `<span class="time">[${msg.time}] </span><strong>${msg.display_name}</strong>: ${messageWithLinks}`;

//                         chatBox.appendChild(messageDiv);

//                         // Add the message key to history to prevent duplication
//                         messageHistory.add(uniqueMessageKey);
//                     }
//                 });message content with local time and 

//                 // Scroll to the bottom if a new message is appended
//                 chatBox.scrollTop = chatBox.scrollHeight;
//             }
//         };
//         xhr.onerror = function() {
//             console.error('Error fetching messages.');
//         };
//         xhr.send();
//     }

//     // Function to play ding sound
//     function playDingSound() {
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         const oscillator = audioContext.createOscillator();
//         const gainNode = audioContext.createGain();

//         oscillator.type = 'sine';
//         oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz (1000 for a ding-like sound)

//         // Connect oscillator to gain node and gain node to the audio context
//         oscillator.connect(gainNode);
//         gainNode.connect(audioContext.destination);

//         // Set gain node volume and play the sound
//         gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Volume
//         oscillator.start();

//         // Stop the sound after 200ms
//         setTimeout(() => {
//             oscillator.stop();
//             audioContext.close();
//         }, 200);
//     }

//     // Flash the favicon on new message
//     function flashFavicon() {
//         let isOriginalFavicon = true;
//         const originalFavicon = 'favicon.png';
//         const alertFavicon = 'favicon-alert.png';

//         if (flashingInterval) clearInterval(flashingInterval);

//         flashingInterval = setInterval(() => {
//             // Swap between the original and alert favicon
//             const link = document.querySelector("link[rel*='icon']");
//             if (link) {
//                 link.href = isOriginalFavicon ? alertFavicon : originalFavicon;
//                 isOriginalFavicon = !isOriginalFavicon;
//             }
//         }, 500); // Change icon every 500ms
//     }

//     // Flash the tab title on new message
//     function flashTitle() {
//         let isOriginalTitle = true;

//         if (flashingInterval) clearInterval(flashingInterval);

//         flashingInterval = setInterval(() => {
//             // Swap between the original and alert title
//             document.title = isOriginalTitle ? 'New Message!' : originalTitle;
//             isOriginalTitle = !isOriginalTitle;
//         }, 500); // Change title every 500ms
//     }

//     // Stop flashing the favicon and title on user interaction
//     window.addEventListener('focus', () => {
//         clearInterval(flashingInterval);
//         document.title = originalTitle;

//         // Reset favicon to original
//         const link = document.querySelector("link[rel*='icon']");
//         if (link) link.href = 'favicon.png';
//     });

//     // Check session status every 1 second
//     setInterval(checkSessionStatus, 1000);

//     function checkSessionStatus() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'online_users.txt', true);
//         xhr.onload = function() {
//             if (xhr.status === 404 || xhr.status === 0) {
//                 // Redirect to index.php if the file does not exist
//                 window.location.href = 'index.php';
//             }
//         };
//         xhr.onerror = function() {
//             // Handle network errors, redirect if file is missing or server not reachable
//             window.location.href = 'index.php';
//         };
//         xhr.send();
//     }

//     // Fetch messages every second
//     setInterval(fetchMessages, 1000);
// });

///
// document.addEventListener('DOMContentLoaded', function() {
//     const sendBtn = document.getElementById('send-btn');
//     const messageInput = document.getElementById('message');
//     const chatBox = document.getElementById('chat-box');

//     let messageHistory = new Set(); // Use a Set to keep track of unique messages

//     sendBtn.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });

//     function sendMessage() {
//         const message = messageInput.value.trim();
//         if (message !== '') {
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'send_message.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr.send('message=' + encodeURIComponent(message));
//             messageInput.value = '';
//         }
//     }

//     function fetchMessages() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'fetch_messages.php', true);
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 const messages = JSON.parse(xhr.responseText);

//                 // Append only new messages
//                 messages.forEach(function(msg) {
//                     const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
//                     if (!messageHistory.has(uniqueMessageKey)) {
//                         // Create a new message div
//                         const messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');

//                         // Add appropriate class for self and other messages
//                         if (msg.display_name === sessionStorage.getItem('display_name')) {
//                             messageDiv.classList.add('self');
//                         } else {
//                             messageDiv.classList.add('other');
//                         }

//                         // Parse the ISO 8601 timestamp and convert to local time
//                         const utcDate = new Date(msg.time);
//                         if (!isNaN(utcDate.getTime())) {
//                             // Format the time in hh:mm:ss AM/PM format with date
//                             const options = {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 second: '2-digit',
//                                 hour12: true,
//                                 timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use the user's local timezone
//                             };
//                             const localTimeString = utcDate.toLocaleString(undefined, options);
//                             msg.time = localTimeString;
//                         }

//                         // Convert URLs in the message to clickable links
//                         const messageWithLinks = msg.message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

//                         // Format message content with local time and links
//                         messageDiv.innerHTML = `<span class="time">[${msg.time}] </span><strong>${msg.display_name}</strong>: ${messageWithLinks}`;

//                         chatBox.appendChild(messageDiv);

//                         // Add the message key to history to prevent duplication
//                         messageHistory.add(uniqueMessageKey);
//                     }
//                 });

//                 // Scroll to the bottom if a new message is appended
//                 chatBox.scrollTop = chatBox.scrollHeight;
//             }
//         };
//         xhr.onerror = function() {
//             console.error('Error fetching messages.');
//         };
//         xhr.send();
//     }

//     // Fetch messages every second
//     setInterval(fetchMessages, 1000);

//     // Check session status every 1 second
//     setInterval(checkSessionStatus, 1000);

//     function checkSessionStatus() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'online_users.txt', true);
//         xhr.onload = function() {
//             if (xhr.status === 404 || xhr.status === 0) {
//                 // Redirect to index.php if the file does not exist
//                 window.location.href = 'index.php';
//             }
//         };
//         xhr.onerror = function() {
//             // Handle network errors, redirect if file is missing or server not reachable
//             window.location.href = 'index.php';
//         };
//         xhr.send();
//     }
// });

//v 2.0
// document.addEventListener('DOMContentLoaded', function() {
//     const sendBtn = document.getElementById('send-btn');
//     const messageInput = document.getElementById('message');
//     const chatBox = document.getElementById('chat-box');

//     let messageHistory = new Set(); // Use a Set to keep track of unique messages
//     let originalTitle = document.title;
//     let flashingInterval;

//     sendBtn.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });

//     function sendMessage() {
//         const message = messageInput.value.trim();
//         if (message !== '') {
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'send_message.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr.send('message=' + encodeURIComponent(message));
//             messageInput.value = '';
//         }
//     }

//     function fetchMessages() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'fetch_messages.php', true);
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 const messages = JSON.parse(xhr.responseText);

//                 // Append only new messages
//                 messages.forEach(function(msg) {
//                     const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
//                     if (!messageHistory.has(uniqueMessageKey)) {
//                         // Create a new message div
//                         const messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');

//                         // Add appropriate class for self and other messages
//                         if (msg.display_name === sessionStorage.getItem('display_name')) {
//                             messageDiv.classList.add('self');
//                         } else {
//                             messageDiv.classList.add('other');

//                             // Flash favicon and title only if the tab is not active
//                             if (document.hidden) {
//                                 flashFavicon();
//                                 flashTitle();
//                             }
//                         }

//                         // Parse the ISO 8601 timestamp and convert to local time
//                         const utcDate = new Date(msg.time);
//                         if (!isNaN(utcDate.getTime())) {
//                             // Format the time in hh:mm:ss AM/PM format with date
//                             const options = {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 second: '2-digit',
//                                 hour12: true,
//                                 timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use the user's local timezone
//                             };
//                             const localTimeString = utcDate.toLocaleString(undefined, options);
//                             msg.time = localTimeString;
//                         }

//                         // Convert URLs in the message to clickable links
//                         const messageWithLinks = msg.message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

//                         // Format message content with local time and links
//                         messageDiv.innerHTML = `<span class="time">[${msg.time}] </span><strong>${msg.display_name}</strong>: ${messageWithLinks}`;

//                         chatBox.appendChild(messageDiv);

//                         // Add the message key to history to prevent duplication
//                         messageHistory.add(uniqueMessageKey);
//                     }
//                 });

//                 // Scroll to the bottom if a new message is appended
//                 chatBox.scrollTop = chatBox.scrollHeight;
//             }
//         };
//         xhr.onerror = function() {
//             console.error('Error fetching messages.');
//         };
//         xhr.send();
//     }

//     // Fetch messages every second
//     setInterval(fetchMessages, 1000);

//     // Flash the favicon on new message
//     function flashFavicon() {
//         let isOriginalFavicon = true;
//         const originalFavicon = 'favicon.png';
//         const alertFavicon = 'favicon-alert.png';

//         if (flashingInterval) clearInterval(flashingInterval);

//         flashingInterval = setInterval(() => {
//             // Swap between the original and alert favicon
//             const link = document.querySelector("link[rel*='icon']");
//             if (link) {
//                 link.href = isOriginalFavicon ? alertFavicon : originalFavicon;
//                 isOriginalFavicon = !isOriginalFavicon;
//             }
//         }, 500); // Change icon every 500ms
//     }

//     // Flash the tab title on new message
//     function flashTitle() {
//         let isOriginalTitle = true;

//         if (flashingInterval) clearInterval(flashingInterval);

//         flashingInterval = setInterval(() => {
//             // Swap between the original and alert title
//             document.title = isOriginalTitle ? 'New Message!' : originalTitle;
//             isOriginalTitle = !isOriginalTitle;
//         }, 500); // Change title every 500ms
//     }

//     // Stop flashing the favicon and title on user interaction
//     window.addEventListener('focus', () => {
//         clearInterval(flashingInterval);
//         document.title = originalTitle;

//         // Reset favicon to original
//         const link = document.querySelector("link[rel*='icon']");
//         if (link) link.href = 'favicon.png';
//     });

//     // Check session status every 1 second
//     setInterval(checkSessionStatus, 1000);

//     function checkSessionStatus() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'online_users.txt', true);
//         xhr.onload = function() {
//             if (xhr.status === 404 || xhr.status === 0) {
//                 // Redirect to index.php if the file does not exist
//                 window.location.href = 'index.php';
//             }
//         };
//         xhr.onerror = function() {
//             // Handle network errors, redirect if file is missing or server not reachable
//             window.location.href = 'index.php';
//         };
//         xhr.send();
//     }
// });

// V 2.1 - Notification Sound
// document.addEventListener('DOMContentLoaded', function() {
//     const sendBtn = document.getElementById('send-btn');
//     const messageInput = document.getElementById('message');
//     const chatBox = document.getElementById('chat-box');
//     const notificationBtn = document.getElementById('notification-btn');

//     let messageHistory = new Set(); // Use a Set to keep track of unique messages
//     let originalTitle = document.title;
//     let flashingInterval;
//     let audioNotificationEnabled = false; // Default to off

//     sendBtn.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });
    
//     // Emoji map for converting emoticons to emojis
//     const emojiMap = {
//         '<3': '❤️',
//         '</3': '💔',
//         ':)': '😊',
//         ':(': '😞',
//         ';)': '😉',
//         ':D': '😃',
//         ':P': '😜',
//         ':o': '😮',
//         'B)': '😎',
//         ':|': '😐',
//         ':/': '😕',
//         ':*': '😘',
//         ':@': '😡',
//         'XD': '😆',
//         ':\'(': '😢',
//         ':-)': '🙂',
//         ':-(': '🙁',
//         ':^)': '😊',
//         '>:(': '😠',
//         ':]': '🙂',
//         ':3': '😺',
//         '>:O': '😲',
//         ':$': '😳',
//         ':#': '🤐',
//         ':-/': '😕',
//         '8)': '😎',
//         '8|': '😐',
//         'O:)': '😇',
//         '>:)': '😈',
//         ':/)': '😏',
//         '=)': '😊',
//         '=(': '😞',
//         ':-P': '😜',
//         ':-D': '😃',
//         ':-O': '😮',
//         ':-X': '🤐',
//         ':-*': '😘',
//         ':X': '🤐',
//         'T_T': '😭',
//         'T.T': '😢',
//         '-_-': '😑',
//         '._.': '😶',
//         ':L': '😞',
//         'QQ': '😭',
//         '0:)': '😇',
//         ':v': '😏',
//         ':B': '😁',
//         'D:': '😧',
//         '>:D': '😆',
//         '>:P': '😜',
//         ':-|': '😐',
//         '>.<': '😣',
//         ':rotfl:': '🤣'
//     };

//     // Function to convert emoticons to emojis
//     function convertEmoticonsToEmoji(text) {
//         const regex = new RegExp(Object.keys(emojiMap).join('|'), 'g');
//         return text.replace(regex, match => emojiMap[match] || match);
//     }

//     // Toggle Audio Notification
//     window.toggleNotification = function() {
//         if (!audioNotificationEnabled) {
//             // Ask for confirmation to enable
//             const confirmation = confirm('Do you want to enable audio notifications for new messages?');
//             if (confirmation) {
//                 audioNotificationEnabled = true;
//                 notificationBtn.textContent = 'Disable Audio Notification';
//             }
//         } else {
//             // Toggle off
//             audioNotificationEnabled = false;
//             notificationBtn.textContent = 'Enable Audio Notification';
//         }
//     };

//     function sendMessage() {
//         const message = messageInput.value.trim();
//         if (message !== '') {
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'send_message.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr.send('message=' + encodeURIComponent(message));
//             messageInput.value = '';
//         }
//     }
    
//     // function sendMessage() {
// //         let message = messageInput.value.trim();

// //         // Convert emoticons to emoji
// //         message = convertEmoticonsToEmoji(message);

// //         if (message !== '') {
// //             const xhr = new XMLHttpRequest();
// //             xhr.open('POST', 'send_message.php', true);
// //             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// //             xhr.send('message=' + encodeURIComponent(message));
// //             messageInput.value = '';
// //         }
// //     }
    
//     //Fetch
//     function fetchMessages() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'fetch_messages.php', true);
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 const messages = JSON.parse(xhr.responseText);

//                 // Append only new messages
//                 messages.forEach(function(msg) {
//                     const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
//                     if (!messageHistory.has(uniqueMessageKey)) {
//                         // Create a new message div
//                         const messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');

//                         // Add appropriate class for self and other messages
//                         if (msg.display_name === sessionStorage.getItem('display_name')) {
//                             messageDiv.classList.add('self');
//                         } else {
//                             messageDiv.classList.add('other');

//                             // Play sound if audio notifications are enabled and the message is from another user
//                             if (audioNotificationEnabled) {
//                                 playDingSound();
//                             }

//                             // Flash favicon and title only if the tab is not active
//                             if (document.hidden) {
//                                 flashFavicon();
//                                 flashTitle();
//                             }
//                         }

//                         // Parse the ISO 8601 timestamp and convert to local time
//                         const utcDate = new Date(msg.time);
//                         if (!isNaN(utcDate.getTime())) {
//                             // Format the time in hh:mm:ss AM/PM format with date
//                             const options = {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 second: '2-digit',
//                                 hour12: true,
//                                 timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use the user's local timezone
//                             };
//                             const localTimeString = utcDate.toLocaleString(undefined, options);
//                             msg.time = localTimeString;
//                         }

//                         // Convert URLs in the message to clickable links
//                         const messageWithLinks = msg.message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

//                         // Format message content with local time and links
//                         messageDiv.innerHTML = `<span class="time">[${msg.time}] </span><strong>${msg.display_name}</strong>: ${messageWithLinks}`;

//                         chatBox.appendChild(messageDiv);

//                         // Add the message key to history to prevent duplication
//                         messageHistory.add(uniqueMessageKey);
//                     }
//                 });

//                 // Scroll to the bottom if a new message is appended
//                 chatBox.scrollTop = chatBox.scrollHeight;
//             }
//         };
//         xhr.onerror = function() {
//             console.error('Error fetching messages.');
//         };
//         xhr.send();
//     }

//     // Function to play ding sound
//     function playDingSound() {
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         const oscillator = audioContext.createOscillator();
//         const gainNode = audioContext.createGain();

//         oscillator.type = 'sine';
//         oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz (1000 for a ding-like sound)

//         // Connect oscillator to gain node and gain node to the audio context
//         oscillator.connect(gainNode);
//         gainNode.connect(audioContext.destination);

//         // Set gain node volume and play the sound
//         gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Volume
//         oscillator.start();

//         // Stop the sound after 200ms
//         setTimeout(() => {
//             oscillator.stop();
//             audioContext.close();
//         }, 200);
//     }

//     // Flash the favicon on new message
//     function flashFavicon() {
//         let isOriginalFavicon = true;
//         const originalFavicon = 'favicon.png';
//         const alertFavicon = 'favicon-alert.png';

//         if (flashingInterval) clearInterval(flashingInterval);

//         flashingInterval = setInterval(() => {
//             // Swap between the original and alert favicon
//             const link = document.querySelector("link[rel*='icon']");
//             if (link) {
//                 link.href = isOriginalFavicon ? alertFavicon : originalFavicon;
//                 isOriginalFavicon = !isOriginalFavicon;
//             }
//         }, 500); // Change icon every 500ms
//     }

//     // Flash the tab title on new message
//     function flashTitle() {
//         let isOriginalTitle = true;

//         if (flashingInterval) clearInterval(flashingInterval);

//         flashingInterval = setInterval(() => {
//             // Swap between the original and alert title
//             document.title = isOriginalTitle ? 'New Message!' : originalTitle;
//             isOriginalTitle = !isOriginalTitle;
//         }, 500); // Change title every 500ms
//     }

//     // Stop flashing the favicon and title on user interaction
//     window.addEventListener('focus', () => {
//         clearInterval(flashingInterval);
//         document.title = originalTitle;

//         // Reset favicon to original
//         const link = document.querySelector("link[rel*='icon']");
//         if (link) link.href = 'favicon.png';
//     });

//     // Check session status every 1 second
//     setInterval(checkSessionStatus, 1000);

//     function checkSessionStatus() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'online_users.txt', true);
//         xhr.onload = function() {
//             if (xhr.status === 404 || xhr.status === 0) {
//                 // Redirect to index.php if the file does not exist
//                 window.location.href = 'index.php';
//             }
//         };
//         xhr.onerror = function() {
//             // Handle network errors, redirect if file is missing or server not reachable
//             window.location.href = 'index.php';
//         };
//         xhr.send();
//     }

//     // Fetch messages every second
//     setInterval(fetchMessages, 1000);
// });


// V 2.3 - Notification Sound & Emoji Conversion Fix
// document.addEventListener('DOMContentLoaded', function() {
//     const sendBtn = document.getElementById('send-btn');
//     const messageInput = document.getElementById('message');
//     const chatBox = document.getElementById('chat-box');
//     const notificationBtn = document.getElementById('notification-btn');

//     let messageHistory = new Set(); // Use a Set to keep track of unique messages
//     let originalTitle = document.title;
//     let flashingInterval;
//     let audioNotificationEnabled = false; // Default to off

//     sendBtn.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });

//     // Emoji map for converting emoticons to emojis
//     const emojiMap = {
//         '<3': '❤️',
//         '</3': '💔',
//         ':)': '😊',
//         ':(': '😞',
//         ';)': '😉',
//         ':D': '😃',
//         ':P': '😜',
//         ':o': '😮',
//         'B)': '😎',
//         ':|': '😐',
//         ':/': '😕',
//         ':*': '😘',
//         ':@': '😡',
//         'XD': '😆',
//         ':\'(': '😢',
//         ':-)': '🙂',
//         ':-(': '🙁',
//         ':^)': '😊',
//         '>:(': '😠',
//         ':]': '🙂',
//         ':3': '😺',
//         '>:O': '😲',
//         ':$': '😳',
//         ':#': '🤐',
//         ':-/': '😕',
//         '8)': '😎',
//         '8|': '😐',
//         'O:)': '😇',
//         '>:)': '😈',
//         ':/)': '😏',
//         '=)': '😊',
//         '=(': '😞',
//         ':-P': '😜',
//         ':-D': '😃',
//         ':-O': '😮',
//         ':-X': '🤐',
//         ':-*': '😘',
//         ':X': '🤐',
//         'T_T': '😭',
//         'T.T': '😢',
//         '-_-': '😑',
//         '._.': '😶',
//         ':L': '😞',
//         'QQ': '😭',
//         '0:)': '😇',
//         ':v': '😏',
//         ':B': '😁',
//         'D:': '😧',
//         '>:D': '😆',
//         '>:P': '😜',
//         ':-|': '😐',
//         '>.<': '😣',
//         ':rotfl:': '🤣'
//     };

//     // Function to convert emoticons to emojis
//     function convertEmoticonsToEmoji(text) {
//         const regex = new RegExp(Object.keys(emojiMap).join('|'), 'g');
//         return text.replace(regex, match => emojiMap[match] || match);
//     }

//     // Toggle Audio Notification
//     window.toggleNotification = function() {
//         if (!audioNotificationEnabled) {
//             // Ask for confirmation to enable
//             const confirmation = confirm('Do you want to enable audio notifications for new messages?');
//             if (confirmation) {
//                 audioNotificationEnabled = true;
//                 notificationBtn.textContent = 'Disable Audio Notification';
//             }
//         } else {
//             // Toggle off
//             audioNotificationEnabled = false;
//             notificationBtn.textContent = 'Enable Audio Notification';
//         }
//     };

//     function sendMessage() {
//         // Use let to avoid any blocking issues
//         let originalMessage = messageInput.value.trim();

//         // Ensure the input is not empty
//         if (originalMessage !== '') {
//             // Convert emoticons to emoji
//             let convertedMessage = convertEmoticonsToEmoji(originalMessage);

//             // Send the processed message
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'send_message.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr.send('message=' + encodeURIComponent(convertedMessage));
//             messageInput.value = '';
//         }
//     }

//     // Fetch and append messages to chatBox
//     function fetchMessages() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'fetch_messages.php', true);
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 const messages = JSON.parse(xhr.responseText);

//                 // Append only new messages
//                 messages.forEach(function(msg) {
//                     const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
//                     if (!messageHistory.has(uniqueMessageKey)) {
//                         // Convert emoticons to emoji
//                         let processedMessage = convertEmoticonsToEmoji(msg.message);

//                         // Create a new message div
//                         const messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');

//                         // Add appropriate class for self and other messages
//                         if (msg.display_name === sessionStorage.getItem('display_name')) {
//                             messageDiv.classList.add('self');
//                         } else {
//                             messageDiv.classList.add('other');
//                         }

//                         // Format message content
//                         messageDiv.innerHTML = `<strong>${msg.display_name}</strong>: ${processedMessage}`;

//                         // Append the message to chatBox
//                         chatBox.appendChild(messageDiv);

//                         // Add the message key to prevent duplication
//                         messageHistory.add(uniqueMessageKey);
//                     }
//                 });

//                 // Scroll to the bottom of chatBox for new messages
//                 chatBox.scrollTop = chatBox.scrollHeight;
//             }
//         };
//         xhr.onerror = function() {
//             console.error('Error fetching messages.');
//         };
//         xhr.send();
//     }

//     // Fetch messages every 1 second
//     setInterval(fetchMessages, 1000);
// });

// // V 2.4 - Fixing Emoji Conversion
// document.addEventListener('DOMContentLoaded', function() {
//     const sendBtn = document.getElementById('send-btn');
//     const messageInput = document.getElementById('message');
//     const chatBox = document.getElementById('chat-box');
//     const notificationBtn = document.getElementById('notification-btn');
//     const emojiBtn = document.getElementById('emoji-btn');
//     const emojiTable = document.getElementById('emoji-table');
//     const emojiPopup = document.getElementById('emoji-popup');


//     let messageHistory = new Set(); // Use a Set to keep track of unique messages
//     let originalTitle = document.title;
//     let flashingInterval;
//     let audioNotificationEnabled = false; // Default to off

//     sendBtn.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });
    
//     // Emoji map for converting emoticons to emojis
//     const emojiMap = {
//         '<3': '❤️️',
//         '</3': '💔',
//         ':)': '😊',
//         ':(': '😞',
//         ';)': '😉',
//         ':D': '😃',
//         ':P': '😜',
//         ':o': '😮',
//         'B)': '😎',
//         ':|': '😐',
//         ':/': '😕',
//         ':*': '😘',
//         ':@': '😡',
//         'XD': '😆',
//         ':\'(': '😢',
//         ':-)': '🙂',
//         ':-(': '🙁',
//         ':^)': '😊',
//         '>:(': '😠',
//         ':]': '🙂',
//         ':3': '😺',
//         '>:O': '😲',
//         ':$': '😳',
//         ':#': '🤐',
//         ':-/': '😕',
//         '8)': '😎',
//         '8|': '😐',
//         'O:)': '😇',
//         '>:)': '😈',
//         ':/)': '😏',
//         '=)': '😊',
//         '=(': '😞',
//         ':-P': '😜',
//         ':-D': '😃',
//         ':-O': '😮',
//         ':-X': '🤐',
//         ':-*': '😘',
//         ':X': '🤐',
//         'T_T': '😭',
//         'T.T': '😢',
//         '-_-': '😑',
//         '._.': '😶',
//         ':L': '😞',
//         'QQ': '😭',
//         '0:)': '😇',
//         ':v': '😏',
//         ':B': '😁',
//         'D:': '😧',
//         '>:D': '😆',
//         '>:P': '😜',
//         ':-|': '😐',
//         '>.<': '😣',
//         ':rotfl:': '🤣'
//     };

//     // Function to convert emoticons to emojis
//     function convertEmoticonsToEmoji(text) {
//         // Use word boundaries to ensure accurate replacement
//         return text.replace(/\S+/g, (match) => emojiMap[match] || match);
//     }

//   // Toggle popup visibility on emoji button click
//     emojiBtn.addEventListener('click', function(e) {
//         e.stopPropagation(); // Prevent the event from bubbling up
    
//         // Get the chat box's position and size
//         const rect = chatBox.getBoundingClientRect();
//         const viewportHeight = window.innerHeight;
//         const popupHeight = emojiPopup.offsetHeight;
//         const popupWidth = emojiPopup.offsetWidth;
    
//         // Calculate the bottom and left position relative to the viewport
//         const bottomPosition = viewportHeight - rect.bottom + 10; // 10px space from the bottom of the chat box
//         let leftPosition = rect.left + 10; // 10px space from the left of the chat box
    
//         // Position the popup to appear above the chat box
//         emojiPopup.style.bottom = `${bottomPosition}px`;
//         emojiPopup.style.left = `${leftPosition}px`;
    
//         // Ensure the popup remains within the viewport horizontally
//         if (leftPosition + popupWidth > window.innerWidth) {
//             leftPosition = window.innerWidth - popupWidth - 10; // Adjust if overflowing
//             emojiPopup.style.left = `${leftPosition}px`;
//         }
    
//         // Display the popup
//         emojiPopup.style.display = 'block';
//     });
    
//     // Close the popup if clicking outside
//     document.addEventListener('click', function(e) {
//         if (!emojiPopup.contains(e.target) && e.target !== emojiBtn) {
//             emojiPopup.style.display = 'none';
//         }
//     });

//     // Add an event listener to handle emoji selection
//     document.querySelectorAll('.emoji-popup td').forEach(emojiCell => {
//         emojiCell.addEventListener('click', function() {
//             // Insert the selected emoji into the text box
//             messageInput.value += this.textContent;
    
//             // Set focus back to the text box
//             messageInput.focus();
    
//             // Hide the emoji popup after selection
//             emojiPopup.style.display = 'none';
//         });
//     });

//     // Toggle Audio Notification
//     window.toggleNotification = function() {
//         if (!audioNotificationEnabled) {
//             // Ask for confirmation to enable
//             const confirmation = confirm('Do you want to enable audio notifications for new messages?');
//             if (confirmation) {
//                 audioNotificationEnabled = true;
//                 notificationBtn.textContent = 'Disable Audio Notification';
//             }
//         } else {
//             // Toggle off
//             audioNotificationEnabled = false;
//             notificationBtn.textContent = 'Enable Audio Notification';
//         }
//     };

//     function sendMessage() {
//         // Use let to avoid any blocking issues
//         let originalMessage = messageInput.value.trim();

//         // Ensure the input is not empty
//         if (originalMessage !== '') {
//             // Convert emoticons to emoji
//             let convertedMessage = convertEmoticonsToEmoji(originalMessage);

//             // Send the processed message
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'send_message.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//             xhr.send('message=' + encodeURIComponent(convertedMessage));
//             messageInput.value = '';
//         }
//     }

//     // Fetch and append messages to chatBox
//     function fetchMessages() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'fetch_messages.php', true);
        
//         // Set timeout to avoid hanging
//         xhr.timeout = 5000; // 5 seconds timeout
        
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 const messages = JSON.parse(xhr.responseText);

//                 // Append only new messages
//                 messages.forEach(function(msg) {
//                     const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
//                     if (!messageHistory.has(uniqueMessageKey)) {
//                         // Convert emoticons to emoji
//                         let processedMessage = convertEmoticonsToEmoji(msg.message);

//                         // Create a new message div
//                         const messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');

//                         // Add appropriate class for self and other messages
//                         if (msg.display_name === sessionStorage.getItem('display_name')) {
//                             messageDiv.classList.add('self');
//                         } else {
//                             messageDiv.classList.add('other');
//                         }

//                         // Format message content
//                         messageDiv.innerHTML = `<strong>${msg.display_name}</strong>: ${processedMessage}`;

//                         // Append the message to chatBox
//                         chatBox.appendChild(messageDiv);

//                         // Add the message key to prevent duplication
//                         messageHistory.add(uniqueMessageKey);
//                     }
//                 });

//                 // Scroll to the bottom of chatBox for new messages
//                 chatBox.scrollTop = chatBox.scrollHeight;
//             }
//         };
        
//         xhr.ontimeout = function() {
//             console.error('Request timed out.');
//         };
//         xhr.onerror = function() {
//             console.error('Error fetching messages.');
//         };
//         xhr.send();
//     }
    
//     //Fetch messages every second
//     setInterval(fetchMessages, 1000);

//     // Flash the favicon on new message
//     function flashFavicon() {
//         let isOriginalFavicon = true;
//         const originalFavicon = 'favicon.png';
//         const alertFavicon = 'favicon-alert.png';
    
//         if (flashingInterval) clearInterval(flashingInterval);
    
//         flashingInterval = setInterval(() => {
//             const link = document.querySelector("link[rel*='icon']");
//             if (link) {
//                 link.href = isOriginalFavicon ? alertFavicon : originalFavicon;
//                 isOriginalFavicon = !isOriginalFavicon;
//             }
//         }, 500); // Change icon every 500ms
//     }


//     // Flash the tab title on new message
//     function flashTitle() {
//         let isOriginalTitle = true;
    
//         if (flashingInterval) clearInterval(flashingInterval);
    
//         flashingInterval = setInterval(() => {
//             document.title = isOriginalTitle ? 'New Message!' : originalTitle;
//             isOriginalTitle = !isOriginalTitle;
//         }, 500); // Change title every 500ms
//     }


//     // Stop flashing the favicon and title on user interaction
//     window.addEventListener('focus', () => {
//         clearInterval(flashingInterval);
//         document.title = originalTitle;

//         // Reset favicon to original
//         const link = document.querySelector("link[rel*='icon']");
//         if (link) link.href = 'favicon.png';
//     });
    
//     //check session status
//     function checkSessionStatus() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'online_users.txt', true);
//         xhr.onload = function() {
//             if (xhr.status === 404 || xhr.status === 0) {
//                 // Redirect to index.php if the file does not exist
//                 window.location.href = 'index.php';
//             }
//         };
//         xhr.onerror = function() {
//             // Handle network errors, redirect if file is missing or server not reachable
//             window.location.href = 'index.php';
//         };
//         xhr.send();
//     }
// });

// V 2.6 - Ding Sound Enabled via Button Click, Flashing Title and Notification Always Enabled

document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message');
    const chatBox = document.getElementById('chat-box');
    const notificationBtn = document.getElementById('notification-btn');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiTable = document.getElementById('emoji-table');
    const emojiPopup = document.getElementById('emoji-popup');

    let messageHistory = new Set(); // Use a Set to keep track of unique messages
    let originalTitle = document.title;
    let titleFlashingInterval;
    let faviconFlashingInterval;
    let audioNotificationEnabled = false; // Default to off

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Emoji map for converting emoticons to emojis
    const emojiMap = {
        '<3': '❤️️',
        '</3': '💔',
        ':)': '😊',
        ':(': '😞',
        ';)': '😉',
        ':D': '😃',
        ':P': '😜',
        ':o': '😮',
        'B)': '😎',
        ':|': '😐',
        ':/': '😕',
        ':*': '😘',
        ':@': '😡',
        'XD': '😆',
        ':\'(': '😢',
        ':-)': '🙂',
        ':-(': '🙁',
        ':^)': '😊',
        '>:(': '😠',
        ':]': '🙂',
        ':3': '😺',
        '>:O': '😲',
        ':$': '😳',
        ':#': '🤐',
        ':-/': '😕',
        '8)': '😎',
        '8|': '😐',
        'O:)': '😇',
        '>:)': '😈',
        ':/)': '😏',
        '=)': '😊',
        '=(': '😞',
        ':-P': '😜',
        ':-D': '😃',
        ':-O': '😮',
        ':-X': '🤐',
        ':-*': '😘',
        ':X': '🤐',
        'T_T': '😭',
        'T.T': '😢',
        '-_-': '😑',
        '._.': '😶',
        ':L': '😞',
        'QQ': '😭',
        '0:)': '😇',
        ':v': '😏',
        ':B': '😁',
        'D:': '😧',
        '>:D': '😆',
        '>:P': '😜',
        ':-|': '😐',
        '>.<': '😣',
        ':rotfl:': '🤣'
    };

    // Function to convert emoticons to emojis
    function convertEmoticonsToEmoji(text) {
        return text.replace(/\S+/g, (match) => emojiMap[match] || match);
    }

    // Toggle popup visibility on emoji button click
    emojiBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the event from bubbling up
    
        // Get the chat box's position and size
        const rect = chatBox.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const popupHeight = emojiPopup.offsetHeight;
        const popupWidth = emojiPopup.offsetWidth;
    
        // Calculate the bottom and left position relative to the viewport
        const bottomPosition = viewportHeight - rect.bottom + 10; // 10px space from the bottom of the chat box
        let leftPosition = rect.left + 10; // 10px space from the left of the chat box
    
        // Position the popup to appear above the chat box
        emojiPopup.style.bottom = `${bottomPosition}px`;
        emojiPopup.style.left = `${leftPosition}px`;
    
        // Ensure the popup remains within the viewport horizontally
        if (leftPosition + popupWidth > window.innerWidth) {
            leftPosition = window.innerWidth - popupWidth - 10; // Adjust if overflowing
            emojiPopup.style.left = `${leftPosition}px`;
        }
    
        // Display the popup
        emojiPopup.style.display = 'block';
    });
    
    // Close the popup if clicking outside
    document.addEventListener('click', function(e) {
        if (!emojiPopup.contains(e.target) && e.target !== emojiBtn) {
            emojiPopup.style.display = 'none';
        }
    });

    // Add an event listener to handle emoji selection
    document.querySelectorAll('.emoji-popup td').forEach(emojiCell => {
        emojiCell.addEventListener('click', function() {
            messageInput.value += this.textContent;
            messageInput.focus();
            emojiPopup.style.display = 'none';
        });
    });

    // Toggle Audio Notification
    window.toggleNotification = function() {
        if (!audioNotificationEnabled) {
            const confirmation = confirm('Do you want to enable audio notifications for new messages?');
            if (confirmation) {
                audioNotificationEnabled = true;
                notificationBtn.textContent = 'Disable Audio Notification';
            }
        } else {
            audioNotificationEnabled = false;
            notificationBtn.textContent = 'Enable Audio Notification';
        }
    };

    // Function to play a "ding" sound using the Web Audio API
    function playDingSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Check if the audio context is in a suspended state, and try resuming it if necessary
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    initiateOscillator(audioContext);
                }).catch(error => {
                    console.error("Failed to resume AudioContext:", error);
                });
            } else {
                initiateOscillator(audioContext);
            }
        } catch (error) {
            console.error("Error initializing the AudioContext:", error);
        }
    }
    // Function to run Oscillator to produce sound
    function initiateOscillator(audioContext) {
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
    
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Set frequency for a "ding" sound
    
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
    
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Adjust the volume
            oscillator.start();
    
            // Stop the oscillator after 200ms, then close the audio context after an additional delay
            setTimeout(() => {
                oscillator.stop();
                setTimeout(() => {
                    if (audioContext.state !== 'closed') {
                        audioContext.close().catch(error => {
                            console.error("Failed to close AudioContext:", error);
                        });
                    }
                }, 100); // Delay closure to ensure proper playback
            }, 200);
        } catch (error) {
            console.error("Error playing the sound with oscillator:", error);
        }
    }

    // Flash Favicon if Chat window is inactive on new message
    function flashFavicon() {
        let isOriginalFavicon = true;
        const originalFavicon = 'favicon.png';
        const alertFavicon = 'favicon-alert.png';

        if (faviconFlashingInterval) clearInterval(faviconFlashingInterval);

        faviconFlashingInterval = setInterval(() => {
            const link = document.querySelector("link[rel*='icon']");
            if (link) {
                link.href = isOriginalFavicon ? alertFavicon : originalFavicon;
                isOriginalFavicon = !isOriginalFavicon;
            }
        }, 500);
    }
    // Flash Tab title if Chat window is inactive on new message
    function flashTitle() {
        let isOriginalTitle = true;

        if (titleFlashingInterval) clearInterval(titleFlashingInterval);

        titleFlashingInterval = setInterval(() => {
            document.title = isOriginalTitle ? 'New Message!' : originalTitle;
            isOriginalTitle = !isOriginalTitle;
        }, 500);
    }

    // Function to send message
    function sendMessage() {
        let originalMessage = messageInput.value.trim();

        if (originalMessage !== '') {
            let convertedMessage = convertEmoticonsToEmoji(originalMessage);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'send_message.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send('message=' + encodeURIComponent(convertedMessage));
            messageInput.value = '';
        }
    }

    // Function to format date and time in MM/DD/YYYY hh:mm:ss AM/PM format
    function formatToLocalDateTime(isoString) {
        const date = new Date(isoString);
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
        const secondsFormatted = seconds < 10 ? '0' + seconds : seconds;
        return `[${month}/${day}/${year} ${hours}:${minutesFormatted}:${secondsFormatted} ${ampm}]`;
    }
    
   // Fetch and append messages to chatBox
    function fetchMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch_messages.php', true);
        xhr.timeout = 5000;
    
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const messages = JSON.parse(xhr.responseText);
                    messages.forEach(function(msg) {
                        const uniqueMessageKey = `${msg.display_name}_${msg.time}_${msg.message}`;
                        if (!messageHistory.has(uniqueMessageKey)) {
                            let processedMessage = convertEmoticonsToEmoji(msg.message);
    
                            // Convert URLs in the message to clickable links
                            const messageWithLinks = processedMessage.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    
                            const messageDiv = document.createElement('div');
                            messageDiv.classList.add('message');
    
                            // Add appropriate class for self and other messages
                            if (msg.display_name === sessionStorage.getItem('display_name')) {
                                messageDiv.classList.add('self');
                            } else {
                                messageDiv.classList.add('other');
                                if (!document.hasFocus()) {
                                    if (audioNotificationEnabled) {
                                        playDingSound();
                                    }
                                    flashFavicon();
                                    flashTitle();
                                }
                            }
    
                            // Format message content with date and time in local format
                            const localDateTime = formatToLocalDateTime(msg.time);
    
                            // Set message content including the formatted time, display name, and the processed message with links
                            messageDiv.innerHTML = `<span class="time">${localDateTime}</span><br/><strong>${msg.display_name}</strong>: ${messageWithLinks}`;
    
                            // Append the message to chatBox
                            chatBox.appendChild(messageDiv);
                            messageHistory.add(uniqueMessageKey);
                        }
                    });
                    chatBox.scrollTop = chatBox.scrollHeight;
                } catch (e) {
                    console.error("Error parsing response: ", e);
                }
            } else {
                console.error(`Failed to load messages. Status: ${xhr.status}`);
            }
        };
    
        xhr.ontimeout = function() {
            console.error('Request timed out.');
        };
        xhr.onerror = function() {
            console.error('Error fetching messages. The server may be unavailable.');
        };
        xhr.send();
    }


    
    setInterval(fetchMessages, 1000);

    // Stop flashing notifications when window is focused
    window.addEventListener('focus', () => {
        clearInterval(titleFlashingInterval);
        clearInterval(faviconFlashingInterval);
        document.title = originalTitle;

        const link = document.querySelector("link[rel*='icon']");
        if (link) link.href = 'favicon.png';
    });

    // Check session status every second
    setInterval(checkSessionStatus, 1000);

    function checkSessionStatus() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'online_users.txt', true);
        xhr.onload = function() {
            if (xhr.status === 404 || xhr.status === 0) {
                window.location.href = 'index.php';
            }
        };
        xhr.onerror = function() {
            window.location.href = 'index.php';
        };
        xhr.send();
    }
});