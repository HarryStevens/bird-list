/**
 * @author Harry Stevens
 */



//When everything is loaded, this function will luanch clickHandler
$(document).ready(function() {
	pageLoaded();
	clickHandler();
	//draggable();
});

//This function explains what to do what a bird card is clicked (i.e. any element with class "bird")
function clickHandler() {
	$(".bird").on("click", function() {
		//dialog is a jQuery UI method. It launches a dialog box, and there are lots of options for it. Its CSS is controlled by classes
		//that begin with .ui-
		$(".data").dialog({
			show : {
				effect : "slideDown",
				duration : 333
			}
		}, {
			modal : true
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
				effect : "slideUp",
				duration : 333
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

//pageLoaded function loads the Google Visualization library and calls the clickHandler
function pageLoaded() {
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : googleLoaded
	});
}

// Load the json from the fusion table and call dataLoaded function
function googleLoaded() {

	$('.bird').on('click',function() {
		var jsonID = $(this).attr('id');
		$.get("data/"+jsonID+"--yrs.json", dataLoaded, "json");		
	});
	//Get request grabs the data from Google Fusion Table
}

// Display the Google Visualization in the data popup
function dataLoaded(BIRDS) {

	//Turning json object into array of arrays
	var birdData = BIRDS.Data;
	var birdName = birdData[0].Name;
	console.log(birdName);
	var dataArray = [];
	var dataHeaders = ["Year","Bird strikes"];
	dataArray.push(dataHeaders);
	for(var i=1;i<birdData.length;i++){
		var currObj = birdData[i];
		var currArray = [currObj.Year,currObj.Value];
		dataArray.push(currArray);
	}
	
	$('.data-title').html(birdName);
	
	var data = google.visualization.arrayToDataTable(dataArray);
	var options = {
		//title: birdName,
		titleTextStyle : {
			fontName: 'Georgia',
			fontSize: 22,
		},
		backgroundColor : {
			//stroke : '#000',
			//strokeWidth : 1,
			fill : '#fdf9f3',
		},
		legend : {
			position : 'none',
		},
		height : 400,
		width : 960,
		chartArea : {
			left: 30
		},
		vAxis : {
			title : 'Number',
			baselineColor : '#000',
			gridlines : {
				color : '#fdf9f3'
			}
		},
		hAxis : {
			title : 'Year',
		},
		colors : ['#50a6c2', '#af593d']
	};
	var chart = new google.visualization.ColumnChart(document.getElementById('data'));
	chart.draw(data, options);
}

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

