/**
 * @author Harry Stevens
 */

//When everything is loaded, this function will luanch clickHandler
$(document).ready(function() {
	pageLoaded();
	clickHandler();
	//draggable();
});

//pageLoaded function loads the Google Visualization library and calls the clickHandler
function pageLoaded() {
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : googleLoaded
	});
}

// Load the json from the fusion table and call dataLoaded function
function googleLoaded() {
	//Get request grabs the data from Google Fusion Table
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1lygsoHUDr_8FzACROCbqWSG5Lh09d2VVYaQKav2T&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8", dataLoaded, "json");
}

function dataLoaded(BIRDS) {
	var data = google.visualization.arrayToDataTable([
		["Year","Herring Gull", "American Kestrel"],
		["1990",5,2],
		["1991",7,2],
		["1992",8,2]
		]);
	var options = {
		backgroundColor : {
			//stroke : '#000',
			//strokeWidth : 1,
			fill: '#fdf9f3',
		},
		legend : {
			//position : 'top',
		},
		height : 450,
		width: 760,
		chartArea : {
			//width: '80%',
			//height: '80%'
		},
		vAxis : {
			title : 'Number',
			baselineColor : '#000',
			gridlines: {
				color: '#fdf9f3'}
		},
		hAxis : {
			title : 'Year',
		},
		colors: ['#50a6c2','#af593d']
	};
	var chart = new google.visualization.ColumnChart(document.getElementById('data'));
	chart.draw(data, options);
}

//This function explains what to do what a bird card is clicked (i.e. any element with class "bird")
function clickHandler() {
	$(".bird").on("click", function() {
		//dialog is a jQuery UI method. It launches a dialog box, and there are lots of options for it. Its CSS is controlled by classes
		//that begin with .ui-
		$(".data").dialog({
			show : {
				effect : "drop",
				duration : 500
			}
		}, {
			modal : false
		}, {
			draggable : false
		}, {
			height : 560
		}, {
			width : 794
		}, {
			position : "center"
		}, {
			hide : {
				effect : "drop",
				duration : 500
			}
		});
		//End dialog options
	});
	//end jQuery UI click

	//This will make the bird cards depress slightly when users click the mouse, and return to the original state when they release the mouse
	$(".bird").on("mousedown", function() {
		var currID = $(this).attr('id');
		$("#" + currID).addClass("depress");
	});
	$(".bird").on("mouseup", function() {
		var currID = $(this).attr('id');
		$("#" + currID).removeClass("depress");
	});
	$(".bird").on("mouseleave", function() {
		var currID = $(this).attr('id');
		$("#" + currID).removeClass("depress");
	});
}//end ClickHandler

//This is a joke function to drag all the bird cards around. It is disabled in the document ready function,
//but can be activated by removing the slahes in front of it. It's hilarious.
function draggable() {
	$(".bird").draggable();
}

/*
 //Puts the right image in place
 function imager () {
 var parentID = $(".bird-photo").parent().attr("id");
 console.log(parentID);
 $(".bird-photo").html('<img src="images/'+parentID+'.jpg" />')
 console.log('<img src="images/'+parentID+'.jpg" />');
 }
 */

