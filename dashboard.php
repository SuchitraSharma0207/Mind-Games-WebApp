<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    // Redirect to login page if not logged in
    header("Location: login.php");
    exit();
}

// Get the username and profile image data from the session
$username = $_SESSION['username'];
$imageData = $_SESSION['image']; // The BLOB data

// If no image is set, you could have a fallback image (default profile picture)
if (isset($_SESSION['image'])) {
    $imageData = $_SESSION['image'];
} else {
    // Handle the case when 'image' is not set (fallback image)
    $imageData = file_get_contents('default_profile.png'); // Default image
}
// Convert the binary image data to base64 for inline display in HTML
$imageBase64 = base64_encode($imageData);
$imageSrc = 'data:image/png;base64,' . $imageBase64; // Assuming the image is JPEG. You may need to adjust the MIME type if it's PNG or another format.
?>





<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gaming Website - Dashboard</title>
    <!--CSS FILE LINK-->
    <link rel="stylesheet" href="homepage.css">
</head>

<body>
    <!--header section start-->
    <header class="header">
        <section class="flex">
            <a href="" class="logo"><i class="fa fa-trophy"></i> COG</a>
            <nav class="navbar">
                <a href="#home">HOME</a>
                <a href="#about">ABOUT</a>
                <a href="#contact">CONTACT</a>
            </nav>

            <div style=" display: flex;justify-content: flex-start;align-items: center; gap: 15px;" >
            <div style="display: flex;flex-direction: column; align-items: center; gap: 10px;">
             <!-- Display Profile Picture if Logged In, and replace Login/Signup with Logout -->
               <img src="<?php echo $imageSrc; ?>" alt="Profile Picture" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 15px;">
                    <span style="color: white; font-size: 18px; font-weight: bold; text-align: center;">
                    <?php echo htmlspecialchars($username); ?></span> <!-- Display dynamic username -->
            </div>
                <button class="btn logout-btn" onclick="window.location.href='logout.php';">Logout</button>
            </div>
        </section>
    </header>
    <!--header section end-->

    <div id="menu-btn" class="fa fa-bars-staggered"></div>

    <!--home section start-->
    <div class="home" id="home">
        <section class="flex">
            <div class="content">
                <h3>Welcome, <br><span><?php echo htmlspecialchars($username); ?></span> <!-- Display dynamic username -->
                </span></h3> <!-- Replace with dynamic username -->
                <p>Enjoy your personalized experience with our cognitive development games!</p>
                <a href="#play" class="btn">Play now</a>
            </div>
            
        </section>
    </div>
    <!--home section end-->

    <!--features section starts-->
    <section class="features">
        <h1 class="heading">our <span>features</span></h1>
        <div class="box-container">
            <div class="box" style="background: url(pictures/home-bg.jpeg) no-repeat;">
                <img src="pictures/st1.jpg" alt="">
                <h3>new events everyday</h3>
                <p>Experience fresh, daily challenges with new events every day to sharpen your skills and thinking!</p>
            </div>
            <div class="box" style="background: url(pictures/home-bg.jpeg) no-repeat;">
                <img src="pictures/st2.jpg" alt="">
                <h3>compatible with any devices</h3>
                <p>Enjoy seamless gameplay on any device, ensuring accessibility and fun wherever you are!</p>
            </div>
            <div class="box" style="background: url(pictures/home-bg.jpeg) no-repeat;">
                <img src="pictures/st3.jpg" alt="">
                <h3>online and offline modes</h3>
                <p>Play anytime with online and offline modes, allowing you to enjoy the game anywhere!</p>
            </div>
        </div>
    </section>
    <!--features section ends-->

    <!--about section starts-->
    <div class="about" id="about">
        <section class="flex">
            <div class="image">
                <img src="pictures/stt1.jpg" alt="">
            </div>
            <div class="content">
                <h3>about us</h3>
                <p>At our core, we are passionate about developing innovative games that challenge and enhance cognitive
                    skills. Our mission is to provide engaging experiences that promote learning, fun, and personal
                    growth for players of all ages.</p>
                <a href="#" class="btn">read more</a>
            </div>
            <div class="image">
                <img src="pictures/stt2.jpg" alt="">
            </div>
        </section>
    </div>
    <!--about section ends-->

    <!--play section starts-->
    <div class="play" id="play">
        <section class="top-games">
            <h1 class="heading"><span>top</span> games</h1>
            <div class="box-container">
                <a href="sudoku/sudoku.html" class="box">
                    <img src="pictures/sudoku.jpg.avif" alt="">
                </a>
                <a href="tictactoe/tictactoe.html" class="box">
                    <img src="pictures/tictoctoe.jpg.avif" alt="">
                </a>
                <a href="matchingcard/matchingcard.html" class="box">
                    <img src="pictures/match.jpg.avif" alt="">
                </a>
                <a href="memory game/memory.html" class="box">
                    <img src="pictures/ball.avif" alt="">
                </a>
                <a href="sliding puzzle/puzzle.html" class="box">
                    <img src="pictures/sliding_puzzle.jpg" alt="">
                </a>
                <a href="math puzzle/mathpuzzle.html" class="box">
                    <img src="pictures/mathpuzzle.jpg" alt="">
                </a>
            </div>
        </section>
    </div>
    <!--play section ends-->

    <!--contact section start-->
    <section class="contact" id="contact">
        <h1 class="heading"><span>contact</span> us</h1>
        <div class="box-container">
            <div class="box">
                <img src="pictures/email.jpg.webp" alt="">
                <h3>email</h3>
                <a href="mailto:example@gmail.com">example@gmail.com</a>
                <a href="mailto:info@gmail.com">info@gmail.com</a>
            </div>
            <div class="box">
                <img src="pictures/phone.jpg" alt="">
                <h3>phone</h3>
                <a href="tel:1112223333">111-222-3333</a>
                <a href="tel:1234567890">123-456-7890</a>
            </div>
            <div class="box">
                <img src="pictures/location.jpg.webp" alt="">
                <h3>address</h3>
                <a href="#">Vidush Somani Institute of Technology & Research</a>
            </div>
        </div>
        <form id="contactForm" class="form" >
            <h1 class="heading"><span>get</span> in touch</h1>
            <div class="flex">
                <input type="text" id="name" name="name" placeholder="your name" class="input">
                <input type="email" id="email" name="email"placeholder="your email" class="input">
                <input type="number" id="number" placeholder="your number"  name="number" class="input">
                <input type="text" name="country" id="country" placeholder="your country" class="input">
            </div>
            <textarea id="message" class="input" placeholder="your message" name="message"></textarea>

            <input type="submit" value="send message" class="btn">

        </form>
    </section>
    <!--contact section end-->

    <footer>
        <p>Thanks for visiting our website!</p>
    </footer>

    <!--JS FILE LINK-->
    <script src="C:\xampp\htdocs\Mind Games -1\homepage.js"></script>

    <script>
            document.getElementById("contactForm").addEventListener("submit", function(e) {
                e.preventDefault(); // prevent default form submission
            
                const formData = new FormData(this);
            
                fetch("review.php", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.text())
                .then(response => {
                    if (response.includes("success")) {
                        alert("Message sent successfully!");
                        document.getElementById("contactForm").reset();
                    } else {
                        alert("Error sending message. Please try again.");
                        console.log(response);
                    }
                })
                .catch(err => {
                    alert("Something went wrong.");
                    console.error(err);
                });
            });
            </script>
</body>

</html>