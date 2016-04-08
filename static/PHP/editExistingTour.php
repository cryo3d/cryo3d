<center>
<h1 class="bigHeader">Select a Waypoint to Edit</h1>
</center>
<div class="waypointRadDiv">
<form id="editWP">


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
$sqlWaypointNames = 'SELECT name FROM waypoints WHERE tour="' . $tourname . '";';

$result = $conn->query($sqlWaypointNames);

while ($row = $result->fetch_assoc()){
	echo '<input type="radio" onclick="getWaypointFields()" name="waypoint" value="' . $row['name'] . '" checked>' . $row['name'] . '<br>';
}

$conn->close();
?>

</form>
<button onclick="addWaypoint()">ADD WAYPOINT</button><br>
</div><div class="waypointAttrsDiv" id="waypointAttrsDiv"></div>
