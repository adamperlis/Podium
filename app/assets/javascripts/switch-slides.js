$(function (){
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

	// $(document).keyup(function(e) {
	//     var $slide = $('.slide img'), $img = $('img');
	//     if (e.keyCode == 40) {
	//     	console.log("down")
	//         $slide.removeClass('active').next().addClass('active');
	//         if ($slide.next().length == 0) {
	//             $img.eq(0).addClass('active')
	//         }
	//     } else if (e.keyCode === 38) {
	//     		console.log("up")
	//         $slide.removeClass('active').prev().addClass('active');
	//         if ($slide.prev().length == 0) {
	//             $img.eq(-1).addClass('active')
	//         }
	//     }
	// });
});