$(function (){

	$(".controls").hide();
	var i = null;
	$(document).mousemove(function() {
		clearTimeout(i);
		$(".controls").fadeIn('slow');
		i = setTimeout(function() { $(".controls").fadeOut("slow"); }, 2000);
	}).mouseleave(function() {
		clearTimeout(i);
		$(".controls").fadeOut('slow');  
	});


	if($.support.fullscreen){

		var fullScreenButton = $("<i class='icon-resize-full'></i>").appendTo('.expand');

		fullScreenButton.click(function(e){
			e.preventDefault();
			$('.pt-perspective').fullScreen();
		});
	}
});
