$(document).ready(function(){

		/*newly uploaded slides to display in #current-slide- no refresh*/

	$(".slide-organizer ol").on("click", "li.slide img, li.slide video, #empty ", function(e){
		  $(this).parent().siblings().children().removeClass('selected');
		  $(this).addClass('selected');
			displayCurrentSlide();
	});

	if ($(".slide-organizer ol").length > 0){
		$(document).keydown(function(e){
	    var current_slide = $('.slide img.selected').parent();
	    var prev_slide = current_slide.prev(".slide");
	    var next_slide = current_slide.next(".slide");
	    

	    if (e.keyCode == 38 && prev_slide.length) { 
	    
      	prev_slide.find("img").addClass("selected");

      	if(!e.shiftKey) {
      	  current_slide.children().removeClass('selected');
      	}

      	displayCurrentSlide();
      	scrollToCurrentSlide();
    	}

    	if (e.keyCode == 40 && next_slide.length) { 
    		
      	next_slide.find("img").addClass("selected");

      	if(!e.shiftKey) {
      			current_slide.children().removeClass('selected');
      	}

      	displayCurrentSlide();
      	scrollToCurrentSlide();
    	}

    	if (e.keyCode == DEL_KEY && current_slide.length) { 
    		//foreach current_slide
        	//delete stuff and next
    	}
		});
	}

	function scrollToCurrentSlide(){
		var current_slide = $('.slide img.selected').parent();
		$('.slide-organizer').scrollTo(".slide img.selected", 600, {offset: {top:-300} });
	}

	function displayCurrentSlide(){

	  var id = $(".slide img.selected").parent(".slide").data("id");
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
      		$("#current-slide").html("<img class='img-responsive' src=" + data.filepicker_url + ">");      		
    		}
    	}
    });
	}

	function deleteSlide(slide_id){
		$.ajax({
      url: "/slides/" + slide_id,
      type: "DELETE",
      dataType: "json"
    }).done(function(data){
      console.log(data);
      //remove slide here
    });
	}
});


 