$(function (){



		/*newly uploaded slides to display in #current-slide- no refresh*/

	$(".slide-organizer ol").on("click", "li.slide", function(e){
		  e.preventDefault();
	    var id = $(e.target).parent(".slide").data("id");
	  $.getJSON("/slides/" + id, function(data){
	  	console.log(data);

	  	if(data.mimetype == "video/mp4"){
				$("#current-slide").html($("<video width='100%' height='100%' controls>").attr('src', data.filepicker_url));
	  	}else{
	  		if (!data.filepicker_url) {
	  			$("#current-slide").html("<div class='blank'></div>");
	  		} else {
      		$("#current-slide").html("<img src=" + data.filepicker_url + ">");
    		}
    	}
    });
  });

	  var slides = $('li.slide');
	  slides.click(function(e){
	    e.preventDefault();

	    var id = $(e.target).parent("li").data("id");
	    $.getJSON("/slides/" + id, function(data){
	        $("#current-slide").html("<img src=" + data.filepicker_url + ">");
	        console.log(data);
	    });
	  });

	$(".slide-organizer ol").on("click", "li.slide img, li.slide video, li.slide div.blank", function(e){
		  $(this).parent().siblings().children().removeClass('selected');
		  $(this).addClass('selected');
	});
});