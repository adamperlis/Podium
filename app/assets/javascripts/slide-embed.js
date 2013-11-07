$(document).ready(function(){
	$(".editor").on("click", ".icon-code", function(e){
		e.preventDefault();
			var code = prompt("Enter the code you would like to embed:", "");
			console.log(code);

			var slide_id = parseInt($("#current-slide").data("project-id"));

			$.ajax({
			  url: '/echo/html/',
			  type: 'PUT',
			  data: "name=John&location=Boston",
			  success: function(data) {
			    alert('Load was performed.');
			  }
			});
	});
});