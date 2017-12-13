$(window).resize(function() {
	resizeCanvas();
});

$(document).ready(function() {
	resizeCanvas();	
	initGame();
});

function resizeCanvas(){
	var size = window.innerWidth*0.6;
	if(size > 450){
		size = 450;
	}
	$("#canvas").width(size);
	$("#canvas").height(size);
}

function showForm(){
	setTimeout(function() {$('#mancha').show();}, 1000);
}

function hideForm(){
	$('#mancha').hide();
}