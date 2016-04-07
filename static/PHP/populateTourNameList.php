<center>
<h1 class="bigHeader">Select Flight Path</h1>
<select class="flightPathDropdown" id="editFP">

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

echo "</select>";
echo '<button onclick="editExistingFlightPathUI()" class="flightPathModalButton" style"height:25px">OK</button>';

$conn->close();
?>

</center>

