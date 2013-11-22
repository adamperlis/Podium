$(document).ready(function(){
	$(".button-group").on("click", ".code", function(e){
		e.preventDefault();
		var code = prompt("Add a YouTube or Vimeo link to your presentation:", $("#current-slide").data("embed_code"));
		console.log(code);

		var slide_id = parseInt($("#current-slide").data("slide-id"));

		if (code != null){

			$.ajax({
			  url: '/slides/' + slide_id,
			  type: 'PUT',
			  data: { slide: { embed_code: code }},
			  success: function(data) {
			  	$("#current-slide .blank-slide").html( data.slide.embed_code );
			   console.log(data)
			  }
			});
		}
	});
});