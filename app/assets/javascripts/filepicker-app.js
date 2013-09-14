$(function (){
  filepicker.setKey('ALcB7Geq4Qi6nBYBnH5s2z');
  
  filepicker.makeDropPane($('#current-slide')[0], {
    multiple: true,
    dragEnter: function() {
        $("#current-slide").html("Drop to upload").css({
            'backgroundColor': "#E0E0E0",
            'border': "1px dashed gray"
        });
    },
    dragLeave: function() {
        $("#current-slide").html("Drop files here").css({
            'backgroundColor': "#F6F6F6",
            'border': "1px dashed #666"
        });
    },
    onSuccess: function(InkBlobs) {
        
        InkBlobs.forEach(function(InkBlob){
            var project_id = parseInt($("#current-slide").data("project-id"));
            var url = InkBlob.url;
            var org = $('.slide-organizer ol');
            $.post("/slides", { slide: { filepicker_url: InkBlob.url}, project_id: project_id}, function(data){      
              $("#current-slide").html($("<img>").attr('src', url));
              $(org).append('<li class="slide" data-id=' + data.status.id +'><img src=' + url + '><ul class="slide-tools"><li><a href="/slides/' + data.status.id + 'data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
            console.log(data)
            });
        });

    },
    onError: function(type, message) {
        $("#localDropResult").text('('+type+') '+ message);
    },
    onProgress: function(percentage) {
        $("#current-slide").text("Uploading ("+percentage+"%)");
    }
  });

    var addslide = $('.dropzone2');
    addslide.click(function(e){
        e.preventDefault();
        filepicker.pickMultiple({
          services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'URL', 'FACEBOOK', 'INSTAGRAM'],
          },
          function(InkBlobs){
            var project_id = parseInt($("#current-slide").data("project-id"));
            var url = InkBlob.url;
            var org = $('.slide-organizer ol');
            $.post("/slides", { slide: { filepicker_url: InkBlob.url}, project_id: project_id}, function(data){
              $("#current-slide").html($("<img>").attr('src', url));
                 $(org).append('<li class="slide" data-id=' + data.status.id +'><img src=' + url + '><ul class="slide-tools"><li><a href="/slides/' + data.status.id + 'data-confirm="Are you sure?" data-method="delete" rel="nofollow"><span class="delete"><i class="icon-remove"></i></span></a></li></ul></li>');
            console.log(data)
            });
        });
    });
});