<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// MySQL database connection parameters
$servername = "sql.freedb.tech";
$username = "freedb_Saltandlight";
$password = "EvQRP!QmG$S9Hrc";
$dbname = "freedb_Saltandlight";
$port = 3306;

// Create a new MySQL connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $location = $_POST['location'];

    // Prepare and execute the SQL query to insert data into the "saltandlight" table
    $stmt = $conn->prepare("INSERT INTO saltandlight (first_name, last_name, phone, email, location) 
                            VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstName, $lastName, $phone, $email, $location);

    if ($stmt->execute()) {
        // Redirect to success page after successful registration
        header('Location: index.html');
        exit(); // Always call exit after a redirect
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
