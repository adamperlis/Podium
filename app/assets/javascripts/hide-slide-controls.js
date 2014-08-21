$(document).ready(function(){
		
	var j = setTimeout( function(){
    $('.controls-column-center').fadeOut("slow");
  }, 2000);

	$(document).mousemove(function() {
	  clearTimeout(j);
	  $('.controls-column-center').fadeIn("slow");
	  j = setTimeout( function(){
	    $('.controls-column-center').fadeOut("slow");
	  }, 2000);
	});
});