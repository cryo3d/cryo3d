<?php

$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$tourname = $_GET['tour'];
$name = $_GET['name'];

$sqlWaypointDelete = "DELETE FROM waypoints WHERE tour='" . $tourname . "' and name='" . $name . "';";

$result = $conn->query($sqlWaypointDelete);
$conn->close();
?>
