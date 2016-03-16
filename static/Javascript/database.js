function initDatabase(){
		    $.ajax({
			    url: 'PHP/initDatabase.php',
			    error: function (xhr, status, error) {
			        // executed if something went wrong during call
			        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
			    },
			    success: function() {
               		 //alert("No errors");
               	}
			});			
		}
			

//initDatabase(); //makes ajax call to php script that initializes the database