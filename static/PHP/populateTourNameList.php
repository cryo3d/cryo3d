<center>
<h1 class="bigHeader">Select Flight Path</h1>
<select class="flightPathDropdown" name="cryodb">


<!--$sql = mysql_query("SELECT flightpath_name FROM flightpathEntry");
while ($row = mysql_fetch_array($sql)){
echo "<option value=\"owner1\">" . $row['flightpath_name'] . "</option>";
}
?>*/-->

</select>
<button onclick="" class="flightPathModalButton" style"height:25px">OK</button>
</center>
<?php
$link = mysqli_connect("db", "user", "pass", "cryodb");

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

echo "Success: A proper connection to MySQL was made! The cryodb database is great." . PHP_EOL;
echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;

mysqli_close($link);
?>
