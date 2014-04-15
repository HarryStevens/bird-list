/**
 * @author Harry Stevens
 */
$(document).ready(function() {
	clickHandler();
});

function clickHandler() {
	$(".bird").on("click", function() {
		console.log("clickeroo!");
		$(".data").dialog({
			show : {
				effect : "fold",
				duration : 1000
			}
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
				effect : "fold",
				duration : 1000
			}
		});
	});
}
