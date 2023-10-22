<?php
$servername = "192.168.1.249"; 
$username = "test"; 
$password = "test"; 
$dbname = "mrwuus_suggestions";

// Get the row_id from the request (POST).
$row_id = $_POST['row_id'];

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Call the stored procedure to delete the row.
    $sql = "CALL DeleteSuggestion($row_id)";
    $result = $conn->query($sql);

    // Handle the result or provide appropriate feedback to the user.
    if ($result) {
        echo "success"; // Indicate success with a response.
    } else {
        echo "Error deleting row: " . $conn->error;
    }

    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
