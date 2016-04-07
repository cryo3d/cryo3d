<?php

$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$waypoint = $_GET['name'];
$sqlWaypointAttrs = 'SELECT tour, latitude, longitude, description, num FROM waypoints WHERE name="' . $waypoint . '";';

$result = $conn->query($sqlWaypointAttrs);

$pointInfo = array();

while ($row = $result->fetch_assoc()){
	$latitude = $row['latitude'];
	$longitude = $row['longitude'];
	$description = $row['description'];	
	$pointNum = $row['num'];
	$tour = $row['tour'];
	array_push($pointInfo, $waypoint);
	array_push($pointInfo, $tour);
	array_push($pointInfo, $latitude);
	array_push($pointInfo, $longitude);
	array_push($pointInfo, $description);
	array_push($pointInfo, $num);
}

echo json_encode($pointInfo);

$conn->close();
?>