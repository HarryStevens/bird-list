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
				effect : "drop",
				duration : 333
			}
		}, {
			modal : true
		}, {
			title : $(this).attr("name")
		},	{
			draggable : false
		}, {
			height : 500
		}, {
			open: function (event, ui) {
    $('.data').css('overflow', 'hidden');} //this line does the actual hiding
		}, {
			width : 794
		}, {
			position : "center"
		}, {
			hide : {
				effect : "drop",
				duration : 333
			}
		});//End dialog options
		
		/*NOT QUITE WORKING YET!
		//This puts the right image into the dialog box		
		var currID = $(this).attr("id");
		$(".dialog-photo").append('<img src="images/'+currID+'.jpg" />');
		*/
		
 	});//end jQuery UI click

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
		//Get request grabs the data from Google Fusion Table
		$.get("data/"+jsonID+"--yrs.json", dataLoaded, "json");		
	});

}

// Display the Google Visualization in the data popup
function dataLoaded(BIRDS) {

	//Turning json object into array of arrays
	var birdData = BIRDS.Data;
	var birdName = birdData[0].Name;
	var dataArray = [];
	var dataHeaders = ["Year","Number Struck"];
	dataArray.push(dataHeaders);
	for(var i=1;i<birdData.length;i++){
		var currObj = birdData[i];
		
		//Something strange is happening with date formatting, so the formatted date is not being passed to the array
		//for now
		var currDate = new Date(currObj.Year);
		console.log(currDate);
		
		var currArray = [currObj.Year,currObj.Value];
		dataArray.push(currArray);
	}
	
	var data = google.visualization.arrayToDataTable(dataArray);
	var options = {
		titleTextStyle : {
			fontName: 'Georgia',
			fontSize: 22,
		},
		backgroundColor : {
			fill : '#fdf9f3',
		},
		legend : {
			position : 'none',
		},	
		height : 400,
		width : 820,
		//chartArea : {
		//	left: 30
		//},
		vAxis : {
			title : 'Number',
			baselineColor : '#000',
			//gridlines : {
			//	color : '#fdf9f3'
			//}
		},
		hAxis : {
			title : 'Year',
			ticks: ['1990','1995','2000','2005','2010']
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
 

