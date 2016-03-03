<?php
$sql = mysqli_connect('localhost', 'user', 'pass', '');
mysqli_query($sql, "USE cryodb");
$sqlSource = file_get_contents('../Data/cryodb.sql');
mysqli_multi_query($sql,$sqlSource);
mysqli_close($sql);
?>