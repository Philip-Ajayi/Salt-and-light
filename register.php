<?php
// MySQL database connection parameters
$servername = "sql.freedb.tech";
$username = "freedb_freedb_Saltandlight";
$password = "&wEh7*7pEv746Q9";
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

    // Prepare the SQL query to insert data into the "saltandlight" table
    $sql = "INSERT INTO saltandlight (first_name, last_name, phone, email, location) 
            VALUES ('$firstName', '$lastName', '$phone', '$email', '$location')";

    // Execute the query and check if successful
    if ($conn->query($sql) === TRUE) {
        // Redirect to success page after successful registration
        header('Location: index.html');
        exit(); // Always call exit after a redirect to stop the script
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the connection
$conn->close();
?>
