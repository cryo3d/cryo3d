<?php
	//$data[] = $_POST['data'];

	//$inp = file_get_contents('Data/FlightPaths.jsonp');
	//$tempArray = json_decode($inp);
	//array_push($tempArray, $data);
	//$jsonData = json_encode($tempArray);
	//file_put_contents('results.json', $jsonData);
	$myfile = fopen("test.txt", "w") or die("Unable to open file!");
	$txt = "John Doe\n";
	fwrite($myfile, $txt);
	$txt = "Jane Doe\n";
	fwrite($myfile, $txt);
	fclose($myfile);
?>