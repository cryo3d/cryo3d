<?php
$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$tourname = $_GET['name'];
$points = array();
$sqlWaypointNames = 'SELECT name, latitude, longitude, description FROM waypoints WHERE tour="' . $tourname . '";';
$result = $conn->query($sqlWaypointNames);

while ($row = $result->fetch_assoc()){
	$pointName = $row['name'];
	$latitude = $row['latitude'];
	$longitude = $row['longitude'];
	$description = $row['description'];
  $pointInfo = array();
  array_push($pointInfo, $pointName);
  array_push($pointInfo, $latitude);
  array_push($pointInfo, $longitude);
  array_push($pointInfo, $description);
  array_push($points, $pointInfo);
}
	echo json_encode($points);

$conn->close();
?>