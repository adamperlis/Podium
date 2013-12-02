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


					function getVimeoId( url ) {
				  // look for a string with 'vimeo', then whatever, then a 
				  // forward slash and a group of digits.
				  var match = /vimeo.*\/(\d+)/i.exec( url );

				  // if the match isn't null (i.e. it matched)
				  if ( match ) {
				    // the grouped/matched digits from the regex
				    return match[1];
				  }
				}

					var vimeo_id = getVimeoId( url );

				$.ajax({
					url: 'http://www.vimeo.com/api/v2/video/' + vimeo_id + '.json',
					dataType: 'jsonp',
					success: function(data)
					{
						vimeo_url = data[0].thumbnail_medium;
						$("#slide_" + slide_id + " .blank").css('background-image', 'url(' + vimeo_url + ')');
					}
				});

		

			var res = url.match(/(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@?&%=+\/\$_.-]*/);
			
			if (res) {

				var img_url = "http://img.youtube.com/vi/" + res[1] + "/0.jpg";
				$("#slide_" + slide_id + " .blank").css('background-image', 'url(' + img_url + ')');
			}
	
}