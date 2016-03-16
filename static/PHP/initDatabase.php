<?php
$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//$commands = file_get_contents('Data/cryodb.sql');
$commands = file("Data/cryodb.sql", FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
$conn->multi_query($commands);
//$conn->query("SOURCE Data/cryodb.sql");
$conn->close();


?>
