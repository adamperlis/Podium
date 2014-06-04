// $(document).ready(function(){

// 	var filepicker_trial_cb = function(InkBlobs){
//     $("#live-preview-modal").modal('show');
//      $("#live-preview-modal").find(".spinner-wrapper").show();
  
//     InkBlobs.forEach(function(InkBlob){
//       console.log(JSON.stringify(InkBlobs));

//       if(InkBlob.mimetype == "video/mp4"){
//         $.post("/projects", { slide: { filepicker_url: InkBlob.url, filepicker_url_thumb: InkBlob.url, mimetype: InkBlob.mimetype }, project_id: project_id}, function(data){
//          displayModal($("#live-preview-modal"),data.url);
//         });

//       }else if(InkBlob.mimetype == "application/vnd.ms-powerpoint" || InkBlob.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || InkBlob.mimetype == "application/x-iwork-keynote-sffkey" || InkBlob.mimetype == "application/pgp-keys"){

//         sendToCloudConvert(url, mimetype, project_id, org);

//       }else if(InkBlob.mimetype == "application/pdf"){
        
//       $.post("/projects", { pdf_url: InkBlob.url }, function(data){
//         displayModal($("#live-preview-modal"),data.url);
//         });

//       }else{

//         filepicker.convert(InkBlob, {width: 234, height: 176, fit: 'scale'}, function(new_InkBlob){
//           $.post("/slides", { slide: { filepicker_url: InkBlob.url, filepicker_url_thumb: new_InkBlob.url, mimetype: InkBlob.mimetype }, project_id: project_id}, function(data){
//             displayModal($("#live-preview-modal"),data.url);
//           });
//         });
//       }
//     });
//   };  




//   $(".upload").click(function(e){
//     e.preventDefault();
//     filepicker.pickMultiple({
//       services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'BOX', 'SKYDRIVE', 'FACEBOOK', 'INSTAGRAM'],
//       openTo:"welcome"
//     }, filepicker_trial_cb);
//   });

//   $(".modal-trigger").click(function(e) {
//     e.preventDefault();

//     var url = $(this).data("url");
//     var target = $($(this).data("target"));
    
//     displayModal(target,url);
//   });

// });



// function displayModal(target, url){
//   var iframe = "<iframe id='live-preview-iframe' title='preview' width='100%' height='100%' src='" +  url + "'></iframe>"
//   target.find(".browser-content .iframe-wrapper").html(iframe);
//    $("#live-preview-modal").find(".spinner-wrapper").show();

//   target.modal('show');
//   $("#live-preview-iframe").load(function(){
//     $("#live-preview-modal").find(".spinner-wrapper").hide();
//     $(this).show();
//   })
// }

// function sendToCloudConvert(url, mimetype, project_id, org){

//   $.post("/slides/cloudconvert", { slide: { filepicker_url: url, mimetype: mimetype }, project_id: project_id}, function(data){
//     $('#current-slide').html('<div class="container panel"><div class="row"><div class="col-sm-4"><div class="wrapperloading"><div class="loading up"></div><div class="loading down"></div></div></div><div class="col-sm-8 columns"><h2 class="convert">Please wait while we convert your presentation</h2></div></div></div>');


//     waitUntilCloudConvertDone(data.message.url, function(pdf_url){
//       $.post('/slides/convert', {  pdf_url: pdf_url, mimetype: 'application/pdf', project_id: project_id}, function(data){  
        
//         $(".share").click(); //CLICKS SHARE AFTER UPLOAD TO PROMPT USER TO SHARE IMMEDIATELY OR CONTINUE EDITING

//         for (i=0; i<data.slides.length; i++){
//           $("#current-slide").html($("<img>").attr('src', data.slides[0].filepicker_url));

//           $(org).append('<li class="slide" data-id=' + data.slides[i].id + ' id="slide_' + data.slides[i].id +'"><img src=' + data.slides[i].filepicker_url_thumb + ' class=><ul class="slide-tools"><li><a href="/slides/' + data.slides[i].id + '" data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
//         }
//       });
//     });         
//   });
// }


// function waitUntilCloudConvertDone(url, callback){
//   var timesCalled = 0;
//   var intervalID = setInterval(function(){
//     $.ajax({ url: url, success: function(data){
      
//       if (data.step == 'finished'){
//         clearTimeout(intervalID);
//         callback(data.output.url)
        
//       }
        
//     }, dataType: "json"});
//   }, 500);
// }
