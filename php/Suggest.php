<?php
$servername = "192.168.1.249"; // Replace with your server name
$username = "test"; // Replace with your username
$password = "test"; // Replace with your password
$dbname = "mrwuus_suggestions"; // Replace with your database name

try {
    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData);
    
    $gameTitle = isset($data->gameTitle) ? $data->gameTitle : null;
    $userName = isset($data->userName) ? $data->userName : null;
    $link = isset($data->link) ? $data->link : null;

    // Use the current date and time
    $currentDateTime = date('Y-m-d H:i:s');

    // Check if any of the fields are empty
    if ($gameTitle === null || $userName === null) {
        echo $gameTitle . "0";
        echo $userName . "1";
        echo $link . "2";
        echo "Error: Game title and user name are required!";
    }
     else {
        // Prepare the stored procedure call
        $stmt = $conn->prepare("CALL InsertSuggestion(?, ?, ?, ?)");

        // Bind parameters and execute
        $stmt->bind_param("ssss", $userName, $gameTitle, $link, $currentDateTime);
        $stmt->execute();

        // Check the result of the stored procedure
        if ($stmt->affected_rows > 0) {
            echo "Data inserted successfully.";
        } else {
            echo "Failed to insert data.";
        }

        // Close the statement
        $stmt->close();
    }

    // Close the database connection
    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
