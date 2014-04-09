$(document).ready(function(){

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
	  	}else{
	  		if (!data.filepicker_url) { 
	  				setupEmbed(data.embed_code);
	  		} else {
      		$("#current-slide").html("<img src=" + data.filepicker_url + ">");      		
    		}
    	}
    });
  });

	$(".slide-organizer ol").on("click", "li.slide img, li.slide video, #empty ", function(e){
		  $(this).parent().siblings().children().removeClass('selected');
		  $(this).addClass('selected');
		
	});
});

 