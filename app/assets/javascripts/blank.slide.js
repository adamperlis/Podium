$(function (){

	var project_id = parseInt($("#current-slide").data("project-id"));
	var main = $('#current-slide');
	var org = $('.slide-organizer ol');

	$(".blank-slide").click(function(e){
	e.preventDefault();

	$.post("/slides", { project_id: project_id}, function(data){
		
			$(main).html('<div class="blank"></div>');
			$(org).append('<li class="slide" data-id=' + data.status.id + ' id="slide_' + data.status.id +'"><div class="blank"></div></li>');
	    console.log(data);
	  });
	});
});