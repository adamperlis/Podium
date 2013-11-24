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
			  	setupEmbed(data.slide.embed_code);
			   console.log(data)
			  }
			});
		}
	});
});

function setupEmbed(url) {
	$('#current-slide').html("<div class='blank-slide'></div>");
	if (url) {
		var contains = url;
		
		//trying to get iFrame to work.
		if (!contains.indexOf('youtube' + 'vimeo') > -1){
			$('#current-slide').html('<iframe src=' + url + '></iframe>');
		}else{
			var pop = Popcorn.smart( "#current-slide .blank-slide", url );
			var pop = Popcorn.smart( "#empty .blank", url ); //trying to get embeded videos to show up in slide organizer
		}

	}
}