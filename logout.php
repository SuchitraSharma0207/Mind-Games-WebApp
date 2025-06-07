<?php
session_start();
session_unset();
session_destroy();

// Redirect to homepage page
header("Location: http://localhost/Mind%20Games%20-1/Homepage.html");
exit();
?>
