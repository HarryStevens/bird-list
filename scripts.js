/**
 * @author Harry Stevens
 */
$(document).ready(function() {
	clickHandler();
	//draggable();
});

function draggable() {
	$(".bird").draggable();
}

function clickHandler() {
	$(".bird").on("click", function() {
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
			dialogClass : "data-alert"
		}, {
			hide : {
				effect : "drop",
				duration : 500
			}
		});
	});
}
