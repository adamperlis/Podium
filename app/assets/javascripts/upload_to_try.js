$(document).ready(function(){

	var filepicker_trial_cb = function(InkBlobs){
    var project_id;
    var project_url;

    $("#live-preview-modal").modal('show');
    $("#live-preview-modal").find(".spinner-wrapper").show();
  
  	$.post("/projects",{ project: { original_download_url: InkBlobs[0].url } }, function(data){
  		project_id = data.id;
  		project_url = data.url;

	    InkBlobs.forEach(function(InkBlob){
	      console.log(JSON.stringify(InkBlobs));
	      fetchAssetUrl(InkBlob, function(asset_url, mimetype){
		      $.post('/slides', { slide: {  filepicker_url: asset_url, mimetype: mimetype }, project_id: project_id}, function(data){  
		        displayModal($("#live-preview-modal"), project_url);
		      });
		    });
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

function fetchAssetUrl(inkblob, callback){
	
 	if(inkblob.mimetype == "application/vnd.ms-powerpoint" || inkblob.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || inkblob.mimetype == "application/x-iwork-keynote-sffkey" || inkblob.mimetype == "application/pgp-keys"){
    $.post("/slides/cloudconvert", { slide: { filepicker_url: inkblob.url, mimetype: inkblob.mimetype }}, function(data){
      waitUntilCloudConvertDone(data.message.url, function(pdf_url){
      	callback(pdf_url, "application/pdf")
      });
    });  
  }else{
		 return callback(inkblob.url, inkblob.mimetype);
  }
}