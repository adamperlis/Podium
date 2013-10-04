$(function (){
  filepicker.setKey('ALcB7Geq4Qi6nBYBnH5s2z');

  var filepicker_cb = function(InkBlobs){
    InkBlobs.forEach(function(InkBlob){
      console.log(JSON.stringify(InkBlobs));
      var project_id = parseInt($("#current-slide").data("project-id"));
      var url = InkBlob.url;
      var org = $('.slide-organizer ol');
      filepicker.convert(InkBlob, {width: 234, height: 176, fit: 'scale'}, function(new_InkBlob){
        $.post("/slides", { slide: { filepicker_url: InkBlob.url, filepicker_url_thumb: new_InkBlob.url}, project_id: project_id}, function(data){
          $("#current-slide").html($("<img>").attr('src', url));

          $(org).append('<li class="slide" data-id=' + data.status.id + ' id="slide_' + data.status.id +'"><img src=' + new_InkBlob.url + ' class=><ul class="slide-tools"><li><a href="/slides/' + data.status.id + '" data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
          console.log(data);

        });
      });
    });
  };

  if($('#current-slide').length) {
    filepicker.makeDropPane($('#current-slide')[0], {
      multiple: true,
      dragEnter: function() {
        $("#current-slide").html("Drop to upload").css({
          'backgroundColor': "rgb(111, 111, 111)",
          'border': "",
          'line-height': "403px"
        });
      },
      dragLeave: function() {
        $("#current-slide").html("Drop files here").css({
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

  var addslide = $('.dropzone2');
  addslide.click(function(e){
    e.preventDefault();
    filepicker.pickMultiple({
      services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'URL', 'FACEBOOK', 'INSTAGRAM']
    }, filepicker_cb);
  });
});
