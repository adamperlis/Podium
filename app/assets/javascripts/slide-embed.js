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
			
		var pop = Popcorn.smart( "#current-slide .blank-slide", url );
	
	}
}

function generateThumb(url, slide_id) {

		var res = url.match(/(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@?&%=+\/\$_.-]*/);
		
		if (res) {

			var img_url = "http://img.youtube.com/vi/" + res[1] + "/0.jpg";
			$("#slide_" + slide_id + " .blank").html("<img src='" + img_url + "'/>");
		}
}