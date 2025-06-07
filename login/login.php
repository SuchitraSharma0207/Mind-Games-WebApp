<?php
include 'db.php'; // Include the database connection file

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['txt'];  // User's username (from the login form)
    $password = $_POST['pswd'];      // User's password (from the login form)

    // Prepare and execute SQL query to fetch the user from the database
    $sql = "SELECT * FROM user WHERE username = '$username'";
    $result = $conn->query($sql);

    // Check if user exists
    if ($result->num_rows > 0) {
        // Fetch user data
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Password is correct, start a session
            session_start();
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $user['username'];
            $_SESSION['image'] = $user['image']; // Assuming 'image' contains the path to the profile picture


            // Redirect to a dashboard or home page
            header("Location: http://localhost/Mind%20Games%20-1/dashboard.php");        
            exit();
        } else {
                 // Incorrect password, show an alert
            echo "<script type='text/javascript'>alert('Invalid password.');</script>";
        }
    } else {
        // User not found, show an alert
        echo "<script type='text/javascript'>alert('User not found.');</script>";
    
    }
}
?>