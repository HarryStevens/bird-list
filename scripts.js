/**
 * @author Harry Stevens
 */
$(document).ready(function() {
	clickHandler();
});

function clickHandler() {
	$(".bird").on("click", function() {
		$(".data").dialog({

			show : {
				effect : "drop",
				duration : 500
			}
		}, {
			modal: true
		}, {
			draggable : true
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
