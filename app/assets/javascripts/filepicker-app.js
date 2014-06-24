$(function (){
  filepicker.setKey('ALcB7Geq4Qi6nBYBnH5s2z');


  // CHECKING IF SLIDES EXIST IF THEY DO THEN DONT DO ANYTHING IF THEY DONT EXIST PROMPT UPLOAD
  var project_id = parseInt($("#current-slide").data("project-id"));

  if ($(".slide")[0]){
  }else{
    window.onload = function(){
      document.getElementById("filepicker").click();
    }
  }
  //END

  var filepicker_cb = function(InkBlobs){

    if (isPresentation(InkBlobs[0]) || InkBlobs[0].mimetype == "application/pdf"){
      updateProject(project_id, InkBlobs[0].url);
    }

    InkBlobs.forEach(function(InkBlob){
      console.log(JSON.stringify(InkBlobs));
      var project_id = parseInt($("#current-slide").data("project-id"));
      var url = InkBlob.url;
      var org = $('.slide-organizer ol');
      var mimetype = InkBlob.mimetype;

      if(InkBlob.mimetype == "video/mp4"){
        $.post("/slides", { slide: { filepicker_url: InkBlob.url, filepicker_url_thumb: InkBlob.url, mimetype: InkBlob.mimetype }, project_id: project_id}, function(data){

          $("#current-slide").html($("<video width='100%' height='100%' controls>").attr('src', url));
          $(".share").click(); //CLICKS SHARE AFTER UPLOAD TO PROMPT USER TO SHARE IMMEDIATELY OR CONTINUE EDITING

          $(org).append('<li class="slide" data-id=' + data.slide.id + ' id="slide_' + data.slide.id +'"><video src=' + InkBlob.url + ' class="vid"><ul class="slide-tools"><li><a href="/slides/' + data.slide.id + '" data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
          console.log(data);
        });

      }else if(isPresentation(InkBlob)){

        sendToCloudConvert(url, mimetype, project_id, org);

      }else if(InkBlob.mimetype == "application/pdf"){
        
        var opts = {
        lines: 13, // The number of lines to draw
        length: 1, // The length of each line
        width: 5, // The line thickness
        radius: 13, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: 'gray', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
        };
        $("#current-slide p").hide();
        var target = document.getElementById('current-slide');
        var spinner = new Spinner(opts).spin(target);

        $.post('/slides', { slide: { filepicker_url: InkBlob.url, mimetype: InkBlob.mimetype }, project_id: project_id}, function(data){  
         //to do fill in loop of images appending to DOM copy below make loop

         $(".share").click(); //CLICKS SHARE AFTER UPLOAD TO PROMPT USER TO SHARE IMMEDIATELY OR CONTINUE EDITING

        for (i=0; i<data.slides.length; i++){
          $("#current-slide").html($("<img>").attr('src', data.slides[0].filepicker_url));

          $(org).append('<li class="slide" data-id=' + data.slides[i].id + ' id="slide_' + data.slides[i].id +'"><img src=' + data.slides[i].filepicker_url_thumb + ' class=><ul class="slide-tools"><li><a href="/slides/' + data.slides[i].id + '" data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
          }
        });

      }else{

        filepicker.convert(InkBlob, {width: 234, height: 176, fit: 'scale'}, function(new_InkBlob){
          $.post("/slides", { slide: { filepicker_url: InkBlob.url, filepicker_url_thumb: new_InkBlob.url, mimetype: InkBlob.mimetype }, project_id: project_id}, function(data){
              
              $(".share").click(); //CLICKS SHARE AFTER UPLOAD TO PROMPT USER TO SHARE IMMEDIATELY OR CONTINUE EDITING
              $("#current-slide").html($("<img>").attr('src', url));

              $(org).append('<li class="slide" data-id=' + data.slide.id + ' id="slide_' + data.slide.id +'"><img src=' + new_InkBlob.url + ' class=><ul class="slide-tools"><li><a href="/slides/' + data.slide.id + '" data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
              console.log(data);
          });
        });
      }
    });
  };

  if($('#current-slide').length) {
    filepicker.makeDropPane($('#current-slide')[0], {
      multiple: true,
      dragEnter: function() {
        $("#current-slide").html("<span class='entypo-down-circled'> Drop to upload</span>").css({
          'backgroundColor': "rgb(111, 111, 111)",
          'border': "",
          'line-height': "403px"
        });
      },
      dragLeave: function() {
        $("#current-slide").html("<span class='entypo-down-circled'> Drop files here</span>").css({
          'backgroundColor': "#F6F6F6",
          'border': "",
          'line-height': "403px"
        });
      },
      onSuccess: filepicker_cb,

      onError: function(type, message) {
        $("#localDropResult").text('('+type+') '+ message);
      },
      onProgress: function(percentage) {
        // $("#current-slide").text("Uploading ("+percentage+"%)");
        $("#current-slide").html('<div class="nice secondary progress small-6"><span class="meter" style="width:'+ percentage +'%"></span>Uploading</div>').css({
           'line-height': "403px"
        });
      }
    });
  }

  
  var addslide = $('.filepicker');
  addslide.click(function(e){
    e.preventDefault();
    filepicker.pickMultiple({
      services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'BOX', 'SKYDRIVE', 'FACEBOOK', 'INSTAGRAM']
    }, filepicker_cb);
  });
});

function sendToCloudConvert(url, mimetype, project_id, org){

  $.post("/slides/cloudconvert", { slide: { filepicker_url: url, mimetype: mimetype }}, function(data){
    $('#current-slide').html('<div class="panel"><div class="row"><div class="col-sm-4"><div class="wrapperloading"><div class="loading up"></div><div class="loading down"></div></div></div><div class="col-sm-8"><h2 class="convert">Please wait while we convert your presentation</h2></div></div></div>');


    waitUntilCloudConvertDone(data.message.url, function(pdf_url){
      $.post('/slides', { slide: { filepicker_url: pdf_url, mimetype: 'application/pdf' }, project_id: project_id}, function(data){  
        
        $(".share").click(); //CLICKS SHARE AFTER UPLOAD TO PROMPT USER TO SHARE IMMEDIATELY OR CONTINUE EDITING

        for (i=0; i<data.slides.length; i++){
          $("#current-slide").html($("<img>").attr('src', data.slides[0].filepicker_url));

          $(org).append('<li class="slide" data-id=' + data.slides[i].id + ' id="slide_' + data.slides[i].id +'"><img src=' + data.slides[i].filepicker_url_thumb + ' class=><ul class="slide-tools"><li><a href="/slides/' + data.slides[i].id + '" data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
        }
      });
    });         
  });
}


function waitUntilCloudConvertDone(url, callback){
  var timesCalled = 0;
  var intervalID = setInterval(function(){
    $.ajax({ url: url, success: function(data){
      
      if (data.step == 'finished'){
        clearTimeout(intervalID);
        callback(data.output.url)
        
      }
        
    }, dataType: "json"});
  }, 500);
}

function updateProject(projectId, url){

    $.ajax({
      url: "/projects/" + projectId,
      type: "PUT",
      data: { project: {original_download_url: url} },
      dataType: "json"
    }).done(function(data){
      console.log(data);
    });
} 

function isPresentation(inkblob){
  return inkblob.mimetype == "application/vnd.ms-powerpoint" || inkblob.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || inkblob.mimetype == "application/x-iwork-keynote-sffkey" || inkblob.mimetype == "application/pgp-keys"
}