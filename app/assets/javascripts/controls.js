$(function (){

	$(".controls").html("<div class='player'><i class='icon-chevron-left'></i><i class='icon-play'></i><i class='icon-chevron-right'></i><i class='icon-code'></i><i class='icon-share-alt'></i><i class='icon-download'></i></div>");

	$(".controls").hide();
		var i = null;
		$(document).mousemove(function() {
	    clearTimeout(i);
	    $(".controls").fadeIn('slow');
	    i = setTimeout('$(".controls").fadeOut("slow");', 2000);
		}).mouseleave(function() {
	    clearTimeout(i);
	    $(".controls").fadeOut('slow');  
		});

		if($.support.fullscreen){

    var fullScreenButton = $("<i class='icon-resize-full'></i>").appendTo('.player');

    fullScreenButton.click(function(e){
        e.preventDefault();
        $('.pt-perspective').fullScreen();
    	});
		}


});
