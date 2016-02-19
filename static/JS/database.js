define(function (require) {
	var FlightPaths = {
		"GreenlandTour":[
			{name: "Greenland1", latitude: "-40.170726", longitude: "70.9208667"},
			{name: "Greenland2", latitude: "-40.170726", longitude: "75.9208667"}
		]
	}

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 's3kreee7'
	});

	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	  if (err) throw err;
	  console.log('The solution is: ', rows[0].solution);
	});

	connection.end();
});
