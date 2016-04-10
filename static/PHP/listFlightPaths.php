<center>
<h1 class="bigHeader">Select Flight Path</h1>
<select class="flightPathDropdown" id="cryodb">

<?php
$servername = "db";
$username = "user";
$password = "pass";
$dbname = "cryodb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sqlTourNames = "SELECT name FROM tours";
$result = $conn->query($sqlTourNames);

while ($row = $result->fetch_assoc()){
echo "<option value=\"owner1\">" . $row['name'] . "</option>";
}

$conn->close();
?>

</select>
<button onclick="autopilot()" class="flightPathModalButton" style"height:25px">Autopilot</button>
<button onclick="takeTour()" class="flightPathModalButton" style"height:25px">Manual</button>
</center>

