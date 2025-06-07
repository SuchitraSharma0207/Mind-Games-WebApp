<?php
$conn=mysqli_connect(
    'localhost',
    'root','','userdb'

);
if($conn){
    echo "";
}else{
    echo "Not Successful Connected to Databse\n";
}
// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect data safely
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $country = $_POST['country'];
    $message = $_POST['message'];

    // Insert into your table — change 'reviw' to your actual table name
    $sql = "INSERT INTO review (name, email, number, country, message) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ssiss", $name, $email, $number, $country, $message);

    if ($stmt->execute()) {
        echo "Message sent successfully!";
    } else {
        echo "Execution failed: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
