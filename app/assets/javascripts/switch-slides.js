$(document).ready(function(){

	var wysiwig = $(".wysiwig");

		/*newly uploaded slides to display in #current-slide- no refresh*/

	$(".slide-organizer ol").on("click", "li.slide", function(e){
		  e.preventDefault();
	    var id = $(e.target).parent(".slide").data("id");
	  $.getJSON("/slides/" + id, function(data){
	  	console.log(data);

	  	$("#current-slide").data("slide-id", id);
	  	$("#current-slide").data("embed_code", data.embed);

	  	if(data.mimetype == "video/mp4"){
				$("#current-slide").html($("<video width='100%' height='100%' controls>").attr('src', data.filepicker_url));
				$(wysiwig).hide();
	  	}else{
	  		if (!data.filepicker_url) {
	  			$("#current-slide").html("<div class='blank-slide'>" + data.embed_code + "</div>");
					$(wysiwig).show();
	  		} else {
      		$("#current-slide").html("<img src=" + data.filepicker_url + ">");
      		$(wysiwig).hide();
    		}
    	}
    });
  });

	$(".slide-organizer ol").on("click", "li.slide img, li.slide video, li.slide div.blank", function(e){
		  $(this).parent().siblings().children().removeClass('selected');
		  $(this).addClass('selected');
	});
});