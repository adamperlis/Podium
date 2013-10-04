$(function (){


	var id = parseInt($("???").data("id"));
	var slides = parseInt($("???").data("slides[]"));

	$.ajax({
        url: '/projects/' + id +'/' + slides,
        type: 'PUT',
        data: { slides: { Slides: Slides }},
        success: function(data) {
          var url = avatar_InkBlob.url;

          $(".slideshow").html($("<div>").attr('data-id', #));
          console.log(data);
        }
 	});
});