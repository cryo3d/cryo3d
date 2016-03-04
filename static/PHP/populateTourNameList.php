<center>
<h1 class="bigHeader">Select Flight Path</h1>
<select class="flightPathDropdown" name="cryodb">
<?php 
$sql = mysql_query("SELECT flightpath_name FROM flightpathEntry");
while ($row = mysql_fetch_array($sql)){
echo "<option value=\"owner1\">" . $row['flightpath_name'] . "</option>";
}
?>
</select>
<button onclick="" class="flightPathModalButton" style"height:25px">OK</button>
</center>