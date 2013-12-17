$(document).ready(function() {

				

	$("#scroller ul").on("click", "li.slide-nav img, li.slide-nav video, #empty ", function(e){
			  $(this).parent().siblings().children().removeClass('selected');
			  $(this).addClass('selected');
		
	});
});