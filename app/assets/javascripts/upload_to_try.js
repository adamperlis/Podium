$(document).ready(function(){

	var filepicker_trial_cb = function(InkBlobs){
    InkBlobs.forEach(function(InkBlob){
      console.log(JSON.stringify(InkBlobs));
    });
  };

  $(".upload").click(function(e){
    e.preventDefault();
    filepicker.pickMultiple({
      services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'BOX', 'SKYDRIVE', 'FACEBOOK', 'INSTAGRAM']
    }, filepicker_trial_cb);
  });
});