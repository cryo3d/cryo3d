<?php
$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

$name = $_GET['tourName'];

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sqlTourNames = 'insert into tours values("' . $name . '");';
$result = $conn->query($sqlTourNames);

$conn->close();
?>
