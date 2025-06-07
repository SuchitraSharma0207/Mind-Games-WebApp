<?php
include 'db.php'; // Include the database connection file
session_start();
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['txt'];  // User's name
    $email = $_POST['email'];   // User's email
    $password = password_hash($_POST['pswd'], PASSWORD_DEFAULT); // Hash the password

    // Insert the user data into the database
    $sql = "INSERT INTO user (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
       // Retrieve the newly created user_id
       $user_id = $conn->insert_id;
       // Display the modal to upload the profile picture
      // Start a session and store the user ID for future use
      $_SESSION['user_id'] = $user_id;
      $_SESSION['username'] = $username;
      
      // Send the user ID as the response back to AJAX
       echo $user_id;  // This sends the user ID back to the AJAX request
    

    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
