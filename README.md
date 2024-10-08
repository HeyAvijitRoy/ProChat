
# **Lightweight Self-Hosted Instant Messenger**  
**Container Name:** `prochat`

This project is a lightweight, self-hosted instant messaging app designed for real-time communication between users. It’s fully scalable, flexible, and ideal for professional environments, with a hidden perk of being perfect for casual chats with friends and family during work. 😉

---

## **Features**

- **Real-Time Messaging**  
  Instantly send and receive messages with precise timestamps in local time.

- **Customizable User Limit**  
  Scale the number of users based on your requirements. Whether it’s for one-on-one chats or group communication, the chat can adapt.

- **No External Dependencies**  
  All emojis and features are hard-coded—no need for third-party libraries or external dependencies.

- **Emoticon to Emoji Conversion**  
  Automatically converts common emoticons (e.g., `:)`, `:(`) into emojis, enhancing expressiveness in communication.

- **Notifications**  
  - **Audio Alerts**: Enable or disable sound alerts for new messages.
  - **Visual Alerts**: Flashing tab title and favicon to indicate new messages when the chat window is inactive.

- **Message History**  
  Messages are tracked and stored in simple text files, allowing for persistent storage and retrieval without the need for a database.

- **Message Formatting**  
  - Sent and received messages are styled differently for easy distinction.
  - URLs within messages are automatically converted into clickable links.

- **Emoji Picker**  
  A built-in emoji picker allows users to insert emojis into messages easily (hard-coded, no external services).

- **Mobile-Friendly Design**  
  Responsive and optimized for mobile use, ensuring the chat works seamlessly across devices.

- **Work-Friendly**  
  Perfect for professional settings, but with the hidden benefit of being a casual chat tool for friends and family, without raising suspicion! 😏

---

## **How It Works (Technical Overview)**

### **1. Message Storage**

Messages are stored as text data in the server’s file system. Each message, along with its metadata (sender, timestamp, content), is written to a text file, which acts as a simple storage mechanism. This avoids the need for a full database, making the system lightweight and easy to deploy.

- **send_message.php**: When a user sends a message, it is written to a text file on the server.
- **fetch_messages.php**: Retrieves the messages from the text file and sends them to the client.

### **2. User Tracking**

The system tracks online users using a simple text file, `online_users.txt`. This file maintains a list of active users to determine who is currently logged in and interacting with the chat.

- **Session Checking**: The system periodically checks the user’s session status to ensure the user is still active.
- **Inactive Users**: If a user becomes inactive or their session expires, they are removed from the `online_users.txt` file.

### **3. Handling User Limits**

The application can be configured with a maximum user limit, restricting how many users can be logged in simultaneously.

- **When the Limit is Met or Crossed**: If the number of users exceeds the predefined limit, new users attempting to log in will be denied access until the number of active users drops below the threshold. This ensures smooth performance by limiting overloading.
  
### **4. Real-Time Messaging**

Messages are sent and received in real-time using **AJAX polling**. Here’s how the process works:

1. **Sending a Message**:
   - When a user sends a message, it’s captured by JavaScript and sent to the server via **send_message.php**.
   - The server stores the message in the text file.

2. **Fetching Messages**:
   - The client polls the server at regular intervals (e.g., every second) using **fetch_messages.php**.
   - The server responds with new messages, which are appended to the chat box in real-time.

### **5. Notifications**

The application supports both **visual** and **audio notifications** for new messages:

1. **Visual Alerts**:
   - If a new message is received while the browser tab is inactive, the tab’s title and favicon will flash to alert the user.
   
2. **Audio Alerts**:
   - If enabled, the app plays a notification sound when a new message arrives.

### **6. Emoji Conversion**

The chat application uses a **hard-coded emoji map** to convert common emoticons into their corresponding emoji equivalents. This conversion happens both when users send messages and when messages are received and displayed.

### **7. Admin Functionality (admin.php)**

The system includes an administrative script (`admin.php`) to manage and clean up the chat’s storage:

- **Deleting Messages and User Data**:  
  `admin.php` provides functionality to delete the message and user tracking text files. This can be used to reset the chat or clean up old data.

- **Admin Control**:  
  This functionality is only accessible by the admin to ensure data privacy and prevent unauthorized deletions.

### **8. Session Management**

The system ensures that users are properly authenticated and tracks their session activity. If a session becomes inactive or the user logs out, they are automatically removed from the list of online users.

---

## **How to Install**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/prochat.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd prochat
   ```

3. **Set Up Your Server**  
   Since this is a PHP-based project, ensure you have a web server (like Apache) installed. Place the project files in your web server directory (e.g., `/var/www/html`).

4. **Configure Permissions**  
   Make sure your web server has the necessary permissions to read and write to the message files.

5. **Run the Application**  
   Open your browser and navigate to your local server (e.g., `http://localhost/prochat/`).

6. **Enjoy Real-Time Messaging!**  
   Start messaging, enabling notifications, and enjoy a professional or casual chat experience.

---

## **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue to discuss improvements or bug fixes.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
