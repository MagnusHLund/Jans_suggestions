<?php
$servername = "192.168.1.249"; 
$username = "test"; 
$password = "test"; 
$dbname = "mrwuus_suggestions"; 

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "CALL GetSuggestions()"; 

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo '<table class="table table-striped" id="myTable">';
        echo '<thead>
                <tr>
                    <th>ID</th>
                    <th>Date (YMDHMS)</th>
                    <th>Username</th>
                    <th>Game Title</th>
                    <th>Link</th>
                    <th>Action</th>
                </tr>
              </thead>';
        echo '<tbody>';
        while ($row = $result->fetch_assoc()) {
            echo '<tr>';
            echo '<td>' . $row["id"] . '</td>';
            echo '<td>' . $row["Date"] . '</td>';
            echo '<td>' . $row["Username"] . '</td>';
            echo '<td>' . $row["GameTitle"] . '</td>';
            echo '<td><a href="' . $row["Link"] . '">' . $row["Link"] . ' </a></td>';
            echo '<td><button class="btn btn-danger" onclick="deleteRow(this, ' . $row['id'] . ')">Delete</button></td>';
    
            echo '</tr>';
        }
        echo '</tbody>';
        echo '</table>';
    } else {
        echo "0 results";
    }

    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
