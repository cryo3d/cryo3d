<?php
$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$names = array();
$sqlTourNames = "SELECT name FROM tours";
$result = $conn->query($sqlTourNames);

while ($row = $result->fetch_assoc()){
	$tourName = $row['name'];
  array_push($names, $tourName);
}
  echo json_encode($names);
  $conn->close();
?>