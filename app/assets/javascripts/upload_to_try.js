$(document).ready(function(){

	var filepicker_trial_cb = function(InkBlobs){
    InkBlobs.forEach(function(InkBlob){
      console.log(JSON.stringify(InkBlobs));
      $.post("/projects", { pdf_url: InkBlob.url }, function(data){
        alert("Success")
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
});