$(function (){

	var project_id = parseInt($("#current-slide").data("project-id"));
	var main = $('#current-slide');
	var org = $('.slide-organizer ol');

	//checking to see if blank-slide exist if if true
	if ($('.blank-slide').length > 0) {
	    $(".wysiwig").html("<ul class='button-group'><li><a href='#' class='editor large button divide'><i class='icon-bold'></i></a></li><li><a href='#' class='editor large button'><i class='icon-italic'></i></a></li><li><a href='#' class='editor large button'><i class='icon-underline'></i></a></li><li><a href='#' class='editor large button'><i class='icon-align-left'></i></a></li><li><a href='#' class='editor large button'><i class='icon-align-center'></i></a></li><li><a href='#' class='editor large button'><i class='icon-align-right'></i></a></li><li><a href='#' class='editor large button'><i class='icon-paperclip'></i></a></li><li><a href='#' class='editor large button'><i class='icon-link'></i></a></li><li><a href='#' class='editor large button'><i class='icon-code'></i></a></li></ul>");
			};

	$(".blank-slide").click(function(e){
	e.preventDefault();

	$.post("/slides", { project_id: project_id}, function(data){
		
			$(main).html('<div class="blank-slide"></div>');
			$(org).append('<li class="slide" data-id=' + data.status.id + ' id="slide_' + data.status.id +'"><div class="blank"></div></li>');
	    
			
	    console.log(data);
	  });
	});
});