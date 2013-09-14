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

		var li = $('.slide img');
		var liSelected;
		$(window).keydown(function(e){
		    if(e.which === 40){
		    	console.log( "down pressed" );
		        if(liSelected){
		            liSelected.removeClass('selected');
		            next = liSelected.next();
		            if(next.length > 0){
		                liSelected = next.addClass('selected');
		            }else{
		                liSelected = li.eq(0).addClass('selected');
		            }
		        }else{
		            liSelected = li.eq(0).addClass('selected');
		        }
		    }else if(e.which === 38){
		    	console.log( "up pressed" );
		        if(liSelected){
		            liSelected.removeClass('selected');
		            next = liSelected.prev();
		            if(next.length > 0){
		                liSelected = next.addClass('selected');
		            }else{
		                liSelected = li.last().addClass('selected');
		            }
		        }else{
		            liSelected = li.last().addClass('selected');
		        }
		    }
		});
});