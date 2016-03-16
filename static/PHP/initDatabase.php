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

// sql to create table
$sqlWaypoints = "CREATE TABLE waypoints(
	name VARCHAR(15),
	tour VARCHAR(15),
	latitude VARCHAR(15),
	longitude VARCHAR(15),
	description TEXT,
	PRIMARY KEY (name,tour)
);";

$sqlTours = "CREATE TABLE tours(
	name VARCHAR(15),
	PRIMARY KEY (name)
);";

$sqlInserts1 = 'insert into tours values("Greenland");';
$sqlInserts2 = 'insert into tours values("Alaska");';
$sqlInserts3 = 'insert into waypoints values ("Greenland-1", "Greenland", "66.9208667", "-43.170726", "This is Greenland up close and personal... AKA totally white. Despite its name, Greenland actually means "Land of People."");';
$sqlInserts4 = 'insert into waypoints values("Greenland-2", "Greenland", "70.9208667","-40.170726","This is the 2nd location in Greenland");';
$sqlInserts5 = 'insert into waypoints values("Greenland-3", "Greenland", "75.9208667","-40.170726","Location 3");';
$sqlInserts6 = 'insert into waypoints values("Anchorage", "Alaska", "58.271403","-134.443284", "This place cold.");';
$sqlInserts7 = 'insert into waypoints values("Juneau", "Alaska", "61.195141","-149.809919","This place also cold.");';
$sqlInserts8 = 'insert into waypoints values("Fairbanks", "Alaska", "64.833965","-147.657242","This place is fair.");';

if ($conn->query($sqlWaypoints) === TRUE) {
    echo "Table waypoints created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

if ($conn->query($sqlTours) === TRUE) {
    echo "Table waypoints created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->query($sqlInserts1);
$conn->query($sqlInserts2);
$conn->query($sqlInserts3);
$conn->query($sqlInserts4);
$conn->query($sqlInserts5);
$conn->query($sqlInserts6);
$conn->query($sqlInserts7);
$conn->query($sqlInserts8);

$conn->close();
?>


