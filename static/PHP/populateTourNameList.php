<select name="cryodb">
<?php 
$sql = mysql_query("SELECT flightpath_name FROM flightpathEntry");
while ($row = mysql_fetch_array($sql)){
echo "<option value=\"owner1\">" . $row['flightpath_name'] . "</option>";
}
?>
</select>