$(function (){

	$('#project_private').click(function() {
	   if (this.checked) {
	   	$( '.icon-unlock' ).toggleClass('icon-unlock icon-lock');
	   } else {
	   	$( '.icon-lock' ).toggleClass('icon-lock icon-unlock');
	   }
	});
  
	if($('#project_accesskey').val()) {
	  	$( '.postfix' ).css({'background':'#c60f13'});
	};
});