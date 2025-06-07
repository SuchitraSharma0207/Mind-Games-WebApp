// Function to show the modal with the user ID after successful signup
function showModal(userId) {
    console.log('User ID received:', userId); // Debugging log
    document.getElementById('user_id').value = userId;
    document.getElementById('imageUploadModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('imageUploadModal').style.display = 'none';
}

// Handle the image upload via AJAX (without reloading the page)
document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload_picture.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // On success, show message and close modal
            document.getElementById('message').innerHTML = 'Profile picture uploaded successfully!';
            closeModal();
            window.location.href = 'http://localhost/Mind%20Games%20-1/dashboard.html'; // Redirect to dashboard
        } else {
            document.getElementById('message').innerHTML = 'Error uploading picture!';
        }
    };
    xhr.send(formData);
});

// Listen for successful form submission to show the modal after signup
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission

    let formData = new FormData(this);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'signup.php', true);  // Send data to signup.php
    xhr.onload = function () {
        if (xhr.status === 200) {
            // On success, parse the response for the user ID and open the modal
            let userId = xhr.responseText;  // The response from signup.php will be the user_id
            showModal(userId);  // Show the modal and pass user_id to it
        } else {
            alert('Error during signup');
        }
    };
    xhr.send(formData);  // Send the form data via AJAX
});