<?php
// Include your DB connection file
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if file was uploaded
    if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
        // Get the file data
        $fileTmpName = $_FILES['profile_picture']['tmp_name'];
        $fileName = $_FILES['profile_picture']['name'];
        $fileSize = $_FILES['profile_picture']['size'];
        $fileType = $_FILES['profile_picture']['type'];

        // Read the file content and store as binary data
        $fileData = file_get_contents($fileTmpName);

        // Get user ID from hidden field (you need to pass this from the modal)
        $userId = $_POST['user_id'];

        // Prepare the SQL query to insert the image into the database
        $stmt = $conn->prepare("UPDATE user SET image = ? WHERE user_id = ?");
        $stmt->bind_param('bi', $null, $userId); // 'bi' means BLOB and INTEGER

        // Insert the image data into the database (as BLOB)
        $stmt->send_long_data(0, $fileData);  // Send the file content as BLOB
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $_SESSION['image'] = $imageData;
            // Respond with a success message or base64 image for immediate display
            $imageBase64 = base64_encode($imageData);  // Convert image to base64
            $imageSrc = 'data:image/jpeg;base64,' . $imageBase64;

            echo "Image uploaded and stored successfully!";
        } else {
            echo "Failed to upload image!";
        }
        
        $stmt->close();
    } else {
        echo "No file uploaded or there was an error uploading the file.";
    }
}
?>
