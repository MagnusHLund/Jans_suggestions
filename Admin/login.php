<?php
session_start(); // Start a PHP session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Replace "your_hashed_password" with the actual hashed password from your database
    $hashedPassword = "your_hashed_password";

    // Verify the hashed password
    if (password_verify($password, $hashedPassword)) {
        // Password is correct, set a session variable to mark the user as logged in
        $_SESSION["loggedin"] = true;

        // Redirect to db.php
        header('Location: db.php');
        exit;
    } else {
        $error = "Invalid username or password.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MrWuus login</title>
    <link rel="icon" href="../Images/Favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="CSS/Login.css">
</head>

<body>
    <div class="middle">
        <div class="header">
            <img src="../Images/MrWuus.png" class="MrWuusImg">
        </div>
        <div class="main">
            <h1>Login to see the database!</h1>
            <form class="text-container" method="POST" action="login.php">
                <input type="text" id="username" name="username" placeholder="username" class="userInput" required>
                <input type="password" id="password" name="password" placeholder="password" class="userInput" required>
                <button type="submit" placeholder="Submit" class="button">Login</button>
            </form>
            <div class="error"><?php if (isset($error)) echo $error; ?></div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-container">
            <ul>
                <label><a href="https://mrwuus.magnuslund.com" class="user">user page</a></label>
            </ul>
        </div>
    </div>
</body>

</html>
