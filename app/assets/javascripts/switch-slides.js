$(document).ready(function(){

	 /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        }
    });

  var slideSorter = $('#slide-sorter');

  slideSorter.mousedown(function(e)
    {
        //Enable multiselect with shift key
        if(e.shiftKey)
        {
            var oTarget = jQuery(e.target);
            if(!oTarget.is('.ui-selectee')) oTarget = oTarget.parents('.ui-selectee');

            var iNew = jQuery(e.currentTarget).find('.ui-selectee').index(oTarget);
            var iCurrent = jQuery(e.currentTarget).find('.ui-selectee').index(jQuery(e.currentTarget).find('.ui-selected'));

            var selectedIds = $.map(jQuery(e.currentTarget).find('.ui-selectee'), function(el, index) { 
              if($(el).hasClass('ui-selected')) {
                return index; 
              }
            }).sort();

            if (iNew < selectedIds[0]){
              iCurrent = selectedIds[0];
              for(; iCurrent > iNew; iCurrent--){
                selectedIds.push(iCurrent-1);
              }
            } else if (iNew > selectedIds[selectedIds.length - 1]) {
              iCurrent = selectedIds[selectedIds.length - 1];
              for(; iCurrent < iNew; iCurrent++){
                selectedIds.push(iCurrent+1);
              }
            } else {
              selectedIds.push(iNew);
            }

            if(iNew != '-1')
            {
                jQuery(e.currentTarget).find('.ui-selected').removeClass('ui-selected');
                selectedIds.forEach(function(i) {
                    jQuery(e.currentTarget).find('.ui-selectee').eq(i).addClass('ui-selected');
                });
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }
  }).selectable({
    filter: 'img',
    cancel: ".handle",
    selected: function(event, ui){
      displayCurrentSlide();
    }
  }).sortable({
    delay: 100,
    axis: 'y',
    handle: ".handle",
    placeholder: "slide-drag",
    update: function(){
      $.post($(this).data('update-url'), $(this).sortable('serialize'))
    }

  });


	if ($(".slide-organizer ol").length > 0){
		$(document).keydown(function(e){
	    var current_slide = $('.slide img.ui-selected').parents('li');
	    var prev_slide = current_slide.prev(".slide");
	    var next_slide = current_slide.next(".slide");
	   
	    if (e.keyCode == 38 && prev_slide.length) { 
	    
      	prev_slide.find("img").addClass("ui-selected");

      	if(!e.shiftKey) {
      	  current_slide.find('.ui-selected').removeClass('ui-selected');
      	}

      	displayCurrentSlide();
      	scrollToCurrentSlide();
    	}

    	if (e.keyCode == 40 && next_slide.length) { 
    		
      	next_slide.find("img").addClass("ui-selected");

      	if(!e.shiftKey) {
      			current_slide.find('.ui-selected').removeClass('ui-selected');
      	}

      	displayCurrentSlide();
      	scrollToCurrentSlide();
    	}

    	if (e.keyCode == 8 && current_slide.length && confirm("Are you sure you want to delete this slide?")) { 
    		    
  					e.preventDefault();
            next_slide = next_slide.toArray().diff(current_slide.toArray());

            if(next_slide.length == 0) {
              next_slide = prev_slide.toArray().diff(current_slide.toArray());
            }

            next_slide = $(next_slide.sort(function(a, b){
              return parseInt($(a).data("id")) > parseInt($(b).data("id"));
            }));

            $.each(current_slide, function(index, slide) {

          		deleteSlide($(slide).data("id"), function(){
                next_slide.find("img").addClass("ui-selected");
                displayCurrentSlide();
              });
            });
            
    	}
		});
	}

	function scrollToCurrentSlide(){
		var current_slide = $('.slide img.ui-selected').parents('li');
		$('.slide-organizer').scrollTo(".slide img.ui-selected", 600, {offset: {top:-300} });
	}

	function displayCurrentSlide(){
	  var id = $('.slide img.ui-selected').parents('li').data("id");
	  $.getJSON("/slides/" + id, function(data){
	  	console.log(data);

	  	$("#current-slide").data("slide-id", id);
	  	$("#current-slide").data("embed_code", data.embed);

	  	if(data.mimetype == "video/mp4"){
				$("#current-slide").html($("<video width='100%' height='100%' controls>").attr('src', data.filepicker_url));
	  	}else{
	  		if (!data.filepicker_url) { 
	  				setupEmbed(data.embed_code);
	  		} else {
      		$("#current-slide").html("<img class='img-responsive' src=" + data.filepicker_url + ">");      		
    		}
    	}
    });
	}

  $('.delete').click(function(e) {
     // Get ID
    var result = confirm("Are you sure you want to delete this slide?");

    if (result==true) {
      //Logic to delete the item
      deleteSlide($(this).parents('li').data("id")); 
    }
     
  });

	function deleteSlide(slide_id, callback){
		$.ajax({
      url: "/slides/" + slide_id,
      type: "DELETE",
      dataType: "json"
    }).done(function(data){
      console.log(data);
      //remove slide here
      var selector = ".slide[data-id=" + this.url.split("/")[2] + "]"
      $(selector).remove();
     
      if (callback) {
        callback();
      }
    });
	}
});


 