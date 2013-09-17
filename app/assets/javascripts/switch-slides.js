$(function (){
	
	/*trying to get newly uploaded slides to display in #current-slide*/

  // var newSlides = $('li.slide');
  // newSlides.click(function(e){
  //   e.preventDefault();

  //   var id = $(e.target).parent("li").data("id");
  //   $.getJSON("/slides/" + id, function(data){
  //       $("#current-slide").html("<img src='" + data.status.url + "'/>")
  //       console.log(data)
  //   });
  // });

  var slides = $('li.slide');
  slides.click(function(e){
    e.preventDefault();

    var id = $(e.target).parent("li").data("id");
    $.getJSON("/slides/" + id, function(data){
        $("#current-slide").html("<img src='" + data.filepicker_url + "'/>")
        console.log(data)
    });
  });

	$('.slide img').click(function() {
	  $(this).parent().siblings().children().removeClass('active');
	  $(this).toggleClass('active');
	});

	$('.slide img').keydown(function(e) {
	  if(e.keyCode === 40) {
	      if($('.active').next().length) {
	          $('.active').removeClass('active')
	          .next().addClass('active');
	      }
	      else {
	          $('.active').removeClass('active');
	          var d = $('.slide img');
	          d.length = 1;
	          d.addClass('active');
	      }
	  }
	  if(e.keyCode === 38) {
	      if($('.active').prev().length) {
	          $('.active').removeClass('active')
	          .prev().addClass('active');
	      }
	      else {
	          $('.active').removeClass('active');
	          var d = $('.slide img');
	          d = $(d[d.length - 1]);
	          d.addClass('active');
	      }
	  }
	});
});