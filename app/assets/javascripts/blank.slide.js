$(document).ready(function(){

	var project_id = parseInt($("#current-slide").data("project-id"));
	var main = $('#current-slide');
	var org = $('.slide-organizer ol');


	var wysiwig = $(".wysiwig");

	$(wysiwig).hide();

	$(".blank-slide").click(function(e){
	e.preventDefault();



	$.post("/slides", { project_id: project_id}, function(data){
		
			$(main).html('<div class="blank-slide"></div>');
			$("#current-slide").data("slide-id", data.status.id);
			$(org).append('<li class="slide" data-id=' + data.status.id + ' id="slide_' + data.status.id +'"><div class="blank"></div></li>');
	    //checking to see if blank-slide exist if if true
			$(wysiwig).show();
			
			
	    console.log(data);
	  });
	});
});