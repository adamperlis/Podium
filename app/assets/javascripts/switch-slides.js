$(function (){



		/*newly uploaded slides to display in #current-slide- no refresh*/

	$(".slide-organizer ol").on("click", "li.slide", function(e){
		  e.preventDefault();
	    var id = $(e.target).parent(".slide").data("id");
	  $.getJSON("/slides/" + id, function(data){
	  	console.log(data);
      $("#current-slide").html("<img src=" + data.filepicker_url + ">");
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

	$(".slide-organizer ol").on("click", "li.slide img", function(e){
		  $(this).parent().siblings().children().removeClass('selected');
		  $(this).addClass('selected');
		});
});