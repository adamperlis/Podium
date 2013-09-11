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
});