$(function (){



		/*newly uploaded slides to display in #current-slide- no refresh*/

	$(".slide-organizer ol").on("click", "li.slide", function(e){
		  e.preventDefault();
	    var id = $(e.target).parent(".slide").data("id");
	  $.getJSON("/slides/" + id, function(data){
	  	console.log(data);
      $("#current-slide").html("<img src='" + data.filepicker_url + "'/>");
    });
  });

	  var slides = $('li.slide');
	  slides.click(function(e){
	    e.preventDefault();

	    var id = $(e.target).parent("li").data("id");
	    $.getJSON("/slides/" + id, function(data){
	        $("#current-slide").html("<img src='" + data.filepicker_url + "'/>");
	        console.log(data);
	    });
	  });

		$('.slide img').click(function() {
		  $(this).parent().siblings().children().removeClass('selected');
		  $(this).toggleClass('selected');
		});
	});


	// $('.slide img').keydown(function(e) {
	//   if(e.keyCode === 40) {
	//       if($('.active').next().length) {
	//           $('.active').removeClass('active')
	//           .next().addClass('active');
	//       }
	//       else {
	//           $('.active').removeClass('active');
	//           var d = $('.slide img');
	//           d.length = 1;
	//           d.addClass('active');
	//       }
	//   }
	//   if(e.keyCode === 38) {
	//       if($('.active').prev().length) {
	//           $('.active').removeClass('active')
	//           .prev().addClass('active');
	//       }
	//       else {
	//           $('.active').removeClass('active');
	//           var d = $('.slide img');
	//           d = $(d[d.length - 1]);
	//           d.addClass('active');
	//       }
	//   }
	// });
