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
$lat = $_GET['latitude'];
$long = $_GET['longitude'];
$desc = $_GET['desc'];

$sqlWaypointUpdate = 'UPDATE waypoints SET latitude=' . $lat . ', longitude=' . $long . ', description="' . $desc . '" WHERE tour="' . $tourname . '" and name="' . $name . '";';

$result = $conn->query($sqlWaypointUpdate);
$conn->close();
?>
