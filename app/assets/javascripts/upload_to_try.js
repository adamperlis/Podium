$(document).ready(function(){

	var filepicker_trial_cb = function(InkBlobs){
    $("#live-preview-modal").modal('show');
     $("#live-preview-modal").find(".spinner-wrapper").show();
  
    InkBlobs.forEach(function(InkBlob){
      console.log(JSON.stringify(InkBlobs));
      $.post("/projects", { pdf_url: InkBlob.url }, function(data){
        displayModal($("#live-preview-modal"),data.url);
      });
    });
  };

  $(".upload").click(function(e){
    e.preventDefault();
    filepicker.pickMultiple({
      services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'BOX', 'SKYDRIVE', 'FACEBOOK', 'INSTAGRAM'],
      openTo:"welcome"
    }, filepicker_trial_cb);
  });

  $(".modal-trigger").click(function(e) {
    e.preventDefault();

    var url = $(this).data("url");
    var target = $($(this).data("target"));
    
    displayModal(target,url);
  });


});

function displayModal(target, url){
  var iframe = "<iframe id='live-preview-iframe' title='preview' width='100%' height='100%' src='" +  url + "'></iframe>"
  target.find(".browser-content .iframe-wrapper").html(iframe);
   $("#live-preview-modal").find(".spinner-wrapper").show();

  target.modal('show');
  $("#live-preview-iframe").load(function(){
    $("#live-preview-modal").find(".spinner-wrapper").hide();
    $(this).show();
  })
}
