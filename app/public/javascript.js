
$("#submit").on("click", function(){


		// If all required fields are filled
		if (validateForm() == true)
		{
			// Create an object for the user's data

			var scoresArr = JSON.stringify([$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val()]);

	    	var userData = {
	    		"name" : $("#name").val(),
	    		"photo" : $("#photoUrl").val(),
	    		"scores" : scoresArr
	    	}


	    	// Grab the URL of the website
	    	var currentURL = window.location.origin;

	    	// AJAX post the data to the friends API. 
	    	$.post(currentURL + "/api/friends", userData, function(data){

	    		$("#matchName").text(data.name);
	    		$('#matchImg').attr("src", data.photo);

		    	$("#resultsModal").modal('toggle');

	    	});
		}
		else
		{
			alert("Please fill out all fields before submitting!");
		}
    	
    	return false;
});

function validateForm() {
	  var isValid = true;
	  $('.form-control').each(function() {
	    if ( $(this).val() === '' )
	        isValid = false;
	  });

	  $('.questions').each(function() {

	  	if( $(this).val() === "")
	  		isValid = false
	  })
	  return isValid;
};